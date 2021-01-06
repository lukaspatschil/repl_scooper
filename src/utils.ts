import * as vscode from "vscode";
import * as path from "path";
//@ts-ignore
import { ProgramStatment } from "@typescript-eslint/eslint-plugin";

export function getPaths(
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

export function parserFunction(
  program: ProgramStatment[],
  user_line: number
): ProgramStatment | undefined {
  for (const statment of program) {
    if (
      user_line >= statment.loc.start.line &&
      user_line <= statment.loc.end.line
    ) {
      if (statment.type === "FunctionDeclaration") {
        if (
          statment.body !== undefined &&
          statment.body.type === "BlockStatement"
        ) {
          const tmp = parserFunction(statment.body.body, user_line);
          if (tmp) {
            return tmp;
          }
        }
        return statment;
      } else {
        return undefined;
      }
    }
  }
}

export function parserCommands(
  program: ProgramStatment[],
  user_line: number
): ProgramStatment | undefined {
  return undefined;
}

export function globalVariables(
  program: ProgramStatment[],
  user_line: number
): ProgramStatment[] {
  const variables: ProgramStatment[] = [];

  for (const statemnt of program) {
    if (user_line >= statemnt.loc.start.line) {
      variables.push(statemnt);
    }
  }

  return variables;
}

export function getRange(active_function: any): vscode.Range {
  return new vscode.Range(
    new vscode.Position(
      active_function.loc.start.line - 1,
      active_function.loc.start.column
    ),
    new vscode.Position(
      active_function.loc.end.line - 1,
      active_function.loc.end.column
    )
  );
}
