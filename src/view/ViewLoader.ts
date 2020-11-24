import * as vscode from "vscode";
import * as path from "path";

export default class ViewLoader {
  private readonly _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionPath: string;

  constructor(extensionPath: string, code: ProgramStatment) {
    this._extensionPath = extensionPath;

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

    this._panel.webview.html = this.getWebviewContent(code);
  }

  private getWebviewContent(code: string): string {
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "configViewer", "configViewer.js")
    );
    const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });

    const string_code = JSON.stringify(code);

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
          window.acquireVsCodeApi = acquireVsCodeApi;
          window.code = ${string_code};
				</script>
    </head>
    <body>
        <div id="root"></div>

        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
  }
}
