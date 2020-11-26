// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import ViewLoader from "./view/ViewLoader";
import * as path from "path";
import { parse, TSESTreeOptions } from "@typescript-eslint/typescript-estree";
// global parsing options
const PARSE_OPTIONS: TSESTreeOptions = {
  comment: false,
  loc: true,
  jsx: false,
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  let webview = vscode.commands.registerCommand("extension.replscooper", () => {
    const editor = vscode.window.activeTextEditor;

    // getting the cursor position from the user
    const position = editor?.selection?.active;

    // reading the whole file as a string
    // TODO add validation and only allow js and ts
    const source = editor?.document.getText();

    // parse the source code
    // TODO only if the input is valid (try catch?)
    const program = parse(source ? source : "", PARSE_OPTIONS);

    // fix position, as vscode begins at 0, 0 and eslint alt 1,0
    const user_line = position?.line ? position.line + 1 : -1;

    let active_function;
    for (let statment of program.body) {
      if (
        user_line >= statment.loc.start.line &&
        user_line <= statment.loc.end.line
      ) {
        active_function = statment;
      }
    }

    let range: vscode.Range;
    let source_string: string | undefined;
    if (active_function) {
      range = new vscode.Range(
        new vscode.Position(
          active_function.loc.start.line - 1,
          active_function.loc.start.column
        ),
        new vscode.Position(
          active_function.loc.end.line - 1,
          active_function.loc.end.column
        )
      );
      source_string = editor?.document.getText(range);
      console.info(source_string);

      if (editor) {
        decorate(editor, range);
      }
    }

    active_function
      ? console.log(active_function)
      : console.error("No code detected");

    // TODO: undefined checks?
    const view = new ViewLoader(
      context.extensionPath,
      active_function,
      source_string ? source_string : ""
    );
  });

  context.subscriptions.push(webview);
}

const decorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: "green",
});

function decorate(editor: vscode.TextEditor, range: vscode.Range) {
  editor.setDecorations(decorationType, [range]);
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

function parsing() {}

// this method is called when your extension is deactivated
export function deactivate() {}
