import * as vscode from 'vscode';

import {
  getGlobalScope,
  getGlobalVariables,
  getRange,
  parserCommands,
  requiresVariables,
} from '../utils';

import ViewLoader from '../view/ViewLoader';
import { activate } from '../extension';
import { parse } from 'acorn';

export function command(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  // getting the cursor position from the user
  const position = editor?.selection?.active;

  // reading the whole file as a string
  // TODO add validation and only allow js and ts
  const source = editor?.document.getText();

  // parse the source code
  // TODO only if the input is valid (try catch?)
  const acorn_prog = parse(source ? source : '', {
    ecmaVersion: 'latest',
    allowImportExportEverywhere: true,
    allowAwaitOutsideFunction: true,
    locations: true,
  });

  // fix position, as vscode begins at 0, 0 and eslint alt 1,0
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

  //@ts-ignore
  const active_command = parserCommands(acorn_prog.body, user_loc);

  const globalVariables = getGlobalVariables(acorn_prog);
  const globalScope = getGlobalScope(acorn_prog, user_line);

  const requires = requiresVariables(
    //@ts-ignore
    acorn_prog.body,
    user_pos.start.line
  );

  const active_folder = vscode.workspace.workspaceFolders;

  const range = getRange(active_command);
  const source_string = editor?.document.getText(range);

  if (active_command && editor) {
    const view = new ViewLoader(
      context.extensionPath,
      active_command,
      globalVariables,
      globalScope,
      requires,
      source_string ? source_string : '',
      editor,
      active_folder
    );

    vscode.workspace.onDidSaveTextDocument((e) => {
      const new_source = editor?.document.getText();
      const new_program = parse(new_source ? new_source : '', {
        ecmaVersion: 'latest',
        allowImportExportEverywhere: true,
        allowAwaitOutsideFunction: true,
        locations: true,
      });

      
        //@ts-ignore
      const new_active_command = parserCommands(acorn_prog.body, user_loc);
      const newGlobalVariables = getGlobalVariables(new_program);
      const new_range = getRange(new_active_command);
      const new_source_string = editor?.document.getText(new_range);
      view.updateWebviewContent(
        new_active_command,
        newGlobalVariables,
        new_source_string ? new_source_string : ''
      );
    });
  } else {
    vscode.window.showErrorMessage(
      'There was nothing selected or your selection is not valid'
    );
  }
}
