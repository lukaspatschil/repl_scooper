import * as vscode from "vscode";
import * as path from "path";
//@ts-ignore
import { ProgramStatment } from "@typescript-eslint/eslint-plugin";
import { getRange } from "../utils";

export default class ViewLoader {
  private readonly _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionPath: string;
  private readonly activeDecorationType = vscode.window.createTextEditorDecorationType(
    {
      backgroundColor: "green",
    }
  );

  constructor(
    extensionPath: string,
    code: ProgramStatment,
    global_variables: ProgramStatment[],
    code_string: string,
    editor: vscode.TextEditor
  ) {
    this._extensionPath = extensionPath;

    const ranges: vscode.Range[] = [getRange(code)];
    this.decorate(editor, ranges, this.activeDecorationType);

    this._panel = vscode.window.createWebviewPanel(
      "replWebview",
      "REPL Window",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,

        localResourceRoots: [
          vscode.Uri.file(path.join(extensionPath, "configViewer")),
        ],
      }
    );

    this._panel.webview.html = this.getWebviewContent(
      code,
      global_variables,
      code_string
    );

    this._panel.onDidDispose(() => {
      this.activeDecorationType.dispose();
    });
  }

  updateWebviewContent(
    code: ProgramStatment,
    global_variables: ProgramStatment[],
    code_string: string
  ) {
    if (this._panel) {
      // this._panel.webview.html = this.getWebviewContent(
      //   code,
      //   global_variables,
      //   code_string
      // );
      this._panel.webview.postMessage({ code: code, code_string: code_string });
    }
  }

  private getWebviewContent(
    code: ProgramStatment,
    global_variables: ProgramStatment[],
    code_string: string
  ): string {
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "configViewer", "configViewer.js")
    );
    const reactAppUri = reactAppPathOnDisk.with({
      scheme: "vscode-resource",
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
          window.global_variables = ${JSON.stringify(global_variables)};
          window.code_string = ${JSON.stringify(code_string)};
				</script>
    </head>
    <body>
        <div id="root"></div>

        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
  }

  private decorate(
    editor: vscode.TextEditor,
    range: vscode.Range[],
    decoration: vscode.TextEditorDecorationType
  ) {
    editor.setDecorations(decoration, range);
  }
}
