import * as vscode from "vscode";
import * as path from "path";
//@ts-ignore
import { ProgramStatment } from "@typescript-eslint/eslint-plugin";
import { stat } from "fs";

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
  user_loc: vscode.Range
): ProgramStatment | undefined {
  for (const statement of program) {
    const statment_loc = new vscode.Range(
      new vscode.Position(statement.loc.start.line, statement.loc.start.colum),
      new vscode.Position(statement.loc.end.line, statement.loc.end.colum)
    );
    if (inRange(user_loc, statment_loc)) {
      if (statement.type === "FunctionDeclaration") {
        if (statement?.body?.type === "BlockStatement") {
          const tmp = parserFunction(statement.body.body, user_loc);
          if (tmp) {
            return tmp;
          }
        }
        return statement;
      } else {
        return undefined;
      }
    }
  }
}

export function parserCommands(
  program: ProgramStatment[],
  user_loc: vscode.Range
): ProgramStatment | undefined {
  for (const statement of program) {
    const statment_loc = new vscode.Range(
      new vscode.Position(
        statement.loc.start.line,
        statement.loc.start.character
      ),
      new vscode.Position(statement.loc.end.line, statement.loc.end.character)
    );
    if (inRange(user_loc, statment_loc)) {
      return statement;
    }
  }
}

function inRange(user_loc: vscode.Range, statment_loc: vscode.Range) {
  if (
    user_loc.start.line >= statment_loc.start.line &&
    user_loc.end.line <= statment_loc.end.line
  ) {
    if (user_loc.start.line === statment_loc.start.line) {
      if (user_loc.start.character <= statment_loc.start.character) {
        return false;
      }
    }

    if (user_loc.end.line === statment_loc.end.line) {
      if (user_loc.end.character <= statment_loc.end.character) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function requiresVariables(
  program: ProgramStatment[],
  user_line: number
): ProgramStatment[] {
  const variables: ProgramStatment[] = [];

  for (const statemnt of program) {
    if (
      user_line >= statemnt.loc.start.line &&
      statemnt.type === "VariableDeclaration" &&
      statemnt?.declarations[0]?.init?.type === "CallExpression"
    ) {
      variables.push(statemnt);
    }
  }

  return variables;
}

export function globalVariables(
  program: ProgramStatment[],
  user_line: number
): ProgramStatment[] {
  const variables: ProgramStatment[] = [];

  for (const statemnt of program) {
    if (
      user_line >= statemnt.loc.start.line &&
      statemnt.type === "VariableDeclaration" &&
      statemnt?.declarations[0]?.init?.type === "Literal"
    ) {
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
