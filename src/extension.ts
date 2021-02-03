// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { parse } from "acorn";
import * as vscode from "vscode";
import {
  getRange,
  globalVariables,
  parserCommands,
  parserFunction,
  requiresVariables,
} from "./utils";
import ViewLoader from "./view/ViewLoader";

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
    const acorn_prog = parse(source ? source : "", {
      ecmaVersion: "latest",
      allowImportExportEverywhere: true,
      allowAwaitOutsideFunction: true,
      locations: true,
    });

    // fix position, as vscode begins at 0, 0 and eslint alt 1, 0
    const user_line = position?.line ? position.line + 1 : -1;
    const user_pos = new vscode.Range(
      new vscode.Position(
        (position?.line ?? -2) + 1,
        (position?.character ?? -2) + 1
      ),
      new vscode.Position(
        (position?.line ?? -2) + 1,
        (position?.character ?? -2) + 1
      )
    );

    // iterate over all the functions
    //@ts-ignore
    const active_function = parserFunction(acorn_prog.body, user_pos);
    //@ts-ignore
    const global_variables = globalVariables(acorn_prog.body, user_line);

    //@ts-ignore
    const requires = requiresVariables(acorn_prog.body, user_line);

    const active_folder = vscode.workspace.workspaceFolders;

    // get the whole function
    let range: vscode.Range;
    let source_string: string | undefined;
    if (active_function && editor) {
      range = getRange(active_function);
      source_string = editor?.document.getText(range);

      // TODO: undefined checks?
      const view = new ViewLoader(
        context.extensionPath,
        active_function,
        global_variables,
        requires,
        source_string ? source_string : "",
        editor,
        active_folder
      );

      vscode.workspace.onDidSaveTextDocument((e) => {
        const new_source = editor?.document.getText();
        const new_program = parse(new_source ? new_source : "", {
          ecmaVersion: "latest",
          allowImportExportEverywhere: true,
          allowAwaitOutsideFunction: true,
          locations: true,
        });

        //@ts-ignore
        const new_active_function = parserFunction(new_program.body, user_line);
        const new_global_variables = globalVariables(
          //@ts-ignore
          new_program.body,
          user_line
        );
        const new_range = getRange(new_active_function);
        const new_source_string = editor?.document.getText(new_range);
        view.updateWebviewContent(
          new_active_function,
          new_global_variables,
          new_source_string ? new_source_string : ""
        );
      });
    } else {
      vscode.window.showErrorMessage(
        "There was nothing selected or your selection is not a function"
      );
    }
  });

  let commandview = vscode.commands.registerCommand(
    "extension.replcommand",
    () => {
      const editor = vscode.window.activeTextEditor;

      // getting the cursor position from the user
      const position = editor?.selection;

      // reading the whole file as a string
      // TODO add validation and only allow js and ts
      const source = editor?.document.getText();

      // parse the source code
      // TODO only if the input is valid (try catch?)
      const program = parse(source ? source : "", {
        ecmaVersion: "latest",
        allowImportExportEverywhere: true,
        allowAwaitOutsideFunction: true,
        locations: true,
      });

      // fix position, as vscode begins at 0, 0 and eslint alt 1,0
      const user_loc = new vscode.Range(
        new vscode.Position(
          (position?.start?.line ?? -2) + 1,
          (position?.start?.character ?? -2) + 1
        ),
        new vscode.Position(
          (position?.end?.line ?? -2) + 1,
          (position?.end?.character ?? -2) + 1
        )
      );

      //@ts-ignore
      const active_command = parserCommands(program.body, user_loc);

      console.log(program);
    }
  );

  context.subscriptions.push(webview);
  context.subscriptions.push(commandview);
}

// this method is called when your extension is deactivated
export function deactivate() {}
