// import { Node } from "acorn";

// export default class ASTParser {
//   private _globals: Array<Node>;
//   private _requires: Array<Node>;
//   private _code: Array<Node>;

//   constructor(
//     private _ast: Array<Node>,
//     private location: number,
//     UseCas: number
//   ) {}

//   private visitNode(node: Node) {
//     switch (node.type) {
//       case "VariableDeclaration":
//       case "VariableDeclarator":
//       case "Literal":
//       case "Identifier":
//       case "FunctionDeclaration":
//       default:
//         break;
//     }
//   }

//   private parse_globals(): Array<Node> {
//     const variables: Array<Node> = [];

//     for (const node of this._ast) {
//       if (
//         this.location >= node.loc.start.line &&
//         node.type === "VariableDeclaration" &&
//         node?.declarations[0]?.init?.type === "Literal"
//       ) {
//         variables.push(node);
//       }
//     }

//     return variables;
//   }
// }
