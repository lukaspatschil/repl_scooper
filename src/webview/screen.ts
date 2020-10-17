import * as vscode from "vscode";
import { Variable } from "./types";

export function getWebviewContnet(
  variables: Variable[],
  stylesheet: vscode.Uri,
  script: vscode.Uri
) {
  return `
	<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Document</title>

			<script src="https://kit.fontawesome.com/fe6cd25c8c.js" crossorigin="anonymous"></script>
			<script src="${script}"></script>

			<link rel="stylesheet" type="text/css" href="${stylesheet}">
    </head>
    <body>
			<section id="var-container" class="var-container">
				<div class="var-container">
					<div class="border">
						<label class="var-lable" for="in1">x:</label>
					</div>
					<div class="border">
						<input type="text" name="in1" id="in1">
					</div>
				</div>
				<div class="var-container">
					<div class="border">
						<label class="var-lable" for="in2">y:</label>
					</div>
					<div class="border">
						<input type="text" name="in2" id="in2">
					</div>
				</div>
			</section>
			<section>
				<div class="button-container">
					<button class="play"><i class="fas fa-play"></i></button>
					<button class="reload"><i class="fas fa-redo-alt"></i></button>
				</div>
			</section>
			<section>
				<code>
					const func = (x, y) => {<br>
					&nbsp;&nbsp;return x + y;<br>
					}
				</code>
			</section>
			<section>
			<h1>This is some heading!</h1>
			<p>This is a heading which is used to do stuff!</p>
			
			<span id="text"></span>
			</section>
    </body>
  </html>
  `;
}
