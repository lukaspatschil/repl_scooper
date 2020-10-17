// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getWebviewContnet } from "./webview/screen";
import * as path from "path";
import { Variable } from "./webview/types";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "replcode" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "replcode.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from REPLCode!");
    }
  );

  let webview = vscode.commands.registerCommand("replcode.window", () => {
    const panel = vscode.window.createWebviewPanel(
      "replWebview",
      "REPL Window",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
      }
    );

    const paths = getPaths(panel, context);
    const testVariables: Variable[] = [];

    const var1: Variable = {
      name: "x",
      value: 10,
    };
    const var2: Variable = {
      name: "y",
      value: "This is a string",
    };

    testVariables.push(var1, var2);
    console.log(testVariables);

    panel.webview.html = getWebviewContnet(testVariables, paths[0], paths[1]);
  });

  context.subscriptions.push(disposable, webview);
}

function getPaths(
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
) {
  const stylePath = vscode.Uri.file(
    path.join(context.extensionPath, `src`, `webview`, `vendor`, `styles.css`)
  );
  const scriptPath = vscode.Uri.file(
    path.join(context.extensionPath, `src`, `webview`, `vendor`, `script.js`)
  );

  const styles = panel.webview.asWebviewUri(stylePath);
  const script = panel.webview.asWebviewUri(scriptPath);

  return [styles, script];
}

// this method is called when your extension is deactivated
export function deactivate() {}
