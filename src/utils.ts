import * as path from 'path';
import * as vscode from 'vscode';
import * as walk from 'acorn-walk';

import acorn = require('acorn');

export function getPaths(
  panel: vscode.WebviewPanel,
  context: vscode.ExtensionContext
) {
  const stylePath = vscode.Uri.file(
    path.join(context.extensionPath, 'src', 'webview', 'media', 'styles.css')
  );
  const scriptPath = vscode.Uri.file(
    path.join(context.extensionPath, 'src', 'webview', 'media', 'script.js')
  );

  const styles = panel.webview.asWebviewUri(stylePath);
  const script = panel.webview.asWebviewUri(scriptPath);

  return { styles, script };
}

export function parserFunction(
  program: any[],
  user_loc: vscode.Range
): any | undefined {
  for (const statement of program) {
    const statment_loc = new vscode.Range(
      new vscode.Position(statement.loc.start.line, statement.loc.start.colum),
      new vscode.Position(statement.loc.end.line, statement.loc.end.colum)
    );
    if (inRange(user_loc, statment_loc)) {
      if (statement.type === 'FunctionDeclaration') {
        if (statement?.body?.type === 'BlockStatement') {
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
  program: any[],
  user_loc: vscode.Range
): any | undefined {
  for (const statement of program) {
    const statment_loc = new vscode.Range(
      new vscode.Position(
        statement.loc.start.line,
        statement.loc.start.character
      ),
      new vscode.Position(statement.loc.end.line, statement.loc.end.character)
    );
    if (inRange(user_loc, statment_loc)) {
      let next_statment = statement;
      while (!Array.isArray(next_statment?.body)) {
        if (next_statment?.body) {
          next_statment = next_statment?.body;
        } else {
          break;
        }
      }
      if (Array.isArray(next_statment?.body)) {
        return parserCommands(next_statment.body, user_loc);
      }
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

export function requiresVariables(program: any[], user_line: number): any[] {
  const variables: any[] = [];

  for (const statemnt of program) {
    if (
      user_line >= statemnt.loc.start.line &&
      statemnt.type === 'VariableDeclaration' &&
      statemnt?.declarations[0]?.init?.type === 'CallExpression'
    ) {
      variables.push(statemnt);
    }
  }

  return variables;
}

export function getGlobalVariables(program: acorn.Node): acorn.Node[] {
  const variables: acorn.Node[] = [];

  walk.ancestor(program, {
    VariableDeclaration(node, ancestor) {
      if ((ancestor as any[]).length === 2) {
        variables.push(node);
      }
    }
  });

  return variables;
}

export function getGlobalScope(program: acorn.Node, userLine: number) {
  const scope: acorn.Node[] = [];

  walk.ancestor(program, {
    FunctionDeclaration(node, ancestor) {
      if ((ancestor as any[]).length === 2 && (node.loc?.end?.line ?? 0) < userLine) {
        scope.push(node);
      }
    }
  });

  return scope;
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
