import * as vscode from "vscode";

import {
  getRange,
  globalVariables,
  parserCommands,
  requiresVariables,
} from "../utils";

import ViewLoader from "../view/ViewLoader";
import { parse } from "acorn";

export function command(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  // getting the cursor position from the user
  const position = editor?.selection;

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

  try {
    //@ts-ignore
    const active_command = parserCommands(acorn_prog.body, user_loc);

    const global_variables = globalVariables(
      //@ts-ignore
      acorn_prog.body,
      user_loc.start.line
    );

    const requires = requiresVariables(
      //@ts-ignore
      acorn_prog.body,
      user_loc.start.line
    );

    const active_folder = vscode.workspace.workspaceFolders;

    const range = getRange(active_command);
    const source_string = editor?.document.getText(range);

    if (editor) {
      const view = new ViewLoader(
        context.extensionPath,
        active_command,
        global_variables,
        requires,
        source_string ? source_string : "",
        editor,
        active_folder
      );
    }
  } catch (error) {
    console.error(error);
  }
}