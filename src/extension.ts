// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import ViewLoader from "./view/ViewLoader";
import * as path from "path";
import { Variable } from "./view/types";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "replcode" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  let webview = vscode.commands.registerCommand("extension.replscooper", () => {
    const view = new ViewLoader(context.extensionPath);
  });

  context.subscriptions.push(webview);
}

function getPaths(
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
) {
  const stylePath = vscode.Uri.file(
    path.join(context.extensionPath, `src`, `webview`, `media`, `styles.css`)
  );
  const scriptPath = vscode.Uri.file(
    path.join(context.extensionPath, `src`, `webview`, `media`, `script.js`)
  );

  const styles = panel.webview.asWebviewUri(stylePath);
  const script = panel.webview.asWebviewUri(scriptPath);

  return { styles, script };
}

// this method is called when your extension is deactivated
export function deactivate() {}
