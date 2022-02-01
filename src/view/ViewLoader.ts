import * as acorn from 'acorn';
import * as path from 'path';
import * as vscode from 'vscode';

import { exec } from 'child_process';
import { getRange } from '../utils';
import { join } from 'path';
import { constants } from 'fs';
import { writeFile, unlink, access } from 'fs/promises';
import { build } from 'esbuild';

export default class ViewLoader {
  private readonly _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionPath: string;
  private readonly _activeFolder: string;
  private readonly activeDecorationType =
    vscode.window.createTextEditorDecorationType({
      backgroundColor: 'green',
    });

  constructor(
    extensionPath: string,
    code: any,
    globalVariables: acorn.Node[],
    globalScope: acorn.Node[],
    requires: any[],
    code_string: string,
    editor: vscode.TextEditor,
    active_folder: string
  ) {
    this._extensionPath = extensionPath;

    this._activeFolder = active_folder ?? undefined;

    const ranges: vscode.Range[] = [getRange(code)];
    this.decorateTextEditor(editor, ranges, this.activeDecorationType);

    this._panel = vscode.window.createWebviewPanel(
      'replWebview',
      'REPL Window',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,

        localResourceRoots: [
          vscode.Uri.file(path.join(extensionPath, 'configViewer')),
        ],
      }
    );

    this._panel.webview.html = this.getWebviewContent(
      code,
      globalVariables,
      globalScope,
      requires,
      code_string
    );

    this._panel.webview.onDidReceiveMessage(({ command, value }) => {
      switch (command) {
        case 'SaveIt':
          this.executeContent(value);
          return;
        default:
          throw new Error(`REPL Scooper: There is no command named ${command}`);
      }
    });

    // remove the text decoration on the selected function / code segment
    this._panel.onDidDispose(() => {
      this.activeDecorationType.dispose();
    });
  }

  updateWebviewContent(
    code: any,
    global_variables: any[],
    code_string: string
  ) {
    // send new message to the webview with the updated values
    if (this._panel) {
      this._panel.webview.postMessage({
        command: 'update',
        code,
        global_variables,
        code_string,
      });
    }
  }

  private async executeContent(data: string) {
    const escaped = this.escapeQuotes(data);

    const child = exec(`node -e "${escaped}"`, async (error, stdout, stderr) => {
      const parts = stdout.split('\n');
      // console.log(`stdout: ${stdout}`);
      // console.log(`stderr: ${stderr}`);
      // console.log(`output: ${parts[parts.length > 1 ? parts.length - 2 : 0]}`);
      if (error) {
        vscode.window.showErrorMessage(
          `Code could not be executed.\n${error}`
        );
      }
      if (this._panel && !error) {
        this._panel.webview.postMessage({
          command: 'output',
          output: parts[parts.length > 1 ? parts.length - 2 : 0],
        });
      }
    });
  }

  private escapeQuotes(data: string) : string {
    return data.replace(/"/g, '\\"');
  }

  private getWebviewContent(
    code: any,
    globalVariables: acorn.Node[],
    globalScope: acorn.Node[],
    requires: any[],
    code_string: string
  ): string {
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, 'configViewer', 'configViewer.js')
    );
    const reactAppUri = reactAppPathOnDisk.with({
      scheme: 'vscode-resource',
    });

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Config View</title>
				
				<meta http-equiv="Content-Security-Policy"
              content="default-src 'none';
                      img-src https:;
                      script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
											style-src vscode-resource: 'unsafe-inline';">
				<script>
          const tsvscode = acquireVsCodeApi();
          window.code = ${JSON.stringify(code)};
          window.global_variables = ${JSON.stringify(globalVariables)};
          window.globalScope = ${JSON.stringify(globalScope)};
          window.requires = ${JSON.stringify(requires)};
          window.code_string = ${JSON.stringify(code_string)};
				</script>
    </head>
    <body>
        <div id="root"></div>

        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
  }

  private decorateTextEditor(
    editor: vscode.TextEditor,
    range: vscode.Range[],
    decoration: vscode.TextEditorDecorationType
  ) {
    editor.setDecorations(decoration, range);
  }
}
