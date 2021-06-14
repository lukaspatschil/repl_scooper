import * as vscode from "vscode";

import {
  getRange,
  globalVariables,
  parserFunction,
  requiresVariables,
} from "../utils";

import ViewLoader from "../view/ViewLoader";
import { parse } from "acorn";

export function func(context: vscode.ExtensionContext) {
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

  if (!active_folder) {
    const message = "REPL Scooper: Working folder not found, open a folder an try again" ;
    vscode.window.showErrorMessage(message);
    throw new Error(message);
  }

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
}