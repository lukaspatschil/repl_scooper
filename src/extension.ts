// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ViewLoader from './view/ViewLoader';
import { parse, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import { parser, globalVariables, getRange } from './utils';

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

	let webview = vscode.commands.registerCommand(
		'extension.replscooper',
		() => {
			const editor = vscode.window.activeTextEditor;

			// getting the cursor position from the user
			const position = editor?.selection?.active;

			// reading the whole file as a string
			// TODO add validation and only allow js and ts
			const source = editor?.document.getText();

			// parse the source code
			// TODO only if the input is valid (try catch?)
			let program = parse(source ? source : '', PARSE_OPTIONS);

			// fix position, as vscode begins at 0, 0 and eslint alt 1,0
			const user_line = position?.line ? position.line + 1 : -1;

			// iterate over all the functions
			let active_function = parser(program.body, user_line);
			let global_variables = globalVariables(program.body, user_line);

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
					source_string ? source_string : '',
					editor
				);

				vscode.workspace.onDidChangeTextDocument((e) => {
					const new_source = editor?.document.getText();
					const new_program = parse(
						new_source ? new_source : '',
						PARSE_OPTIONS
					);
					const new_active_function = parser(
						new_program.body,
						user_line
					);
					const new_global_variables = globalVariables(
						new_program.body,
						user_line
					);
					const new_range = getRange(new_active_function);
					const new_source_string = editor?.document.getText(
						new_range
					);
					view.updateWebviewContent(
						new_active_function,
						new_global_variables,
						new_source_string ? new_source_string : ''
					);
				});
			} else {
				vscode.window.showErrorMessage(
					'There was nothing selected or your selection is not a function'
				);
			}
		}
	);

	context.subscriptions.push(webview);
}

// this method is called when your extension is deactivated
export function deactivate() {}
