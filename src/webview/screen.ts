export function getWebviewContnet() {
  return `
	<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Document</title>
			<script src="https://kit.fontawesome.com/fe6cd25c8c.js" crossorigin="anonymous"></script>
			<style>
				body {
					margin: 0;
					padding: 1rem 1rem;
				}

				input {
					background-color: var(--vscode-editor-background-color);
					border: none;
					border-width: 0;
					color: var(--vscode-editor-foreground);
					width: 4rem;
				}

				input:focus {
					outline: none;
					outline-width: 0;
				}

				button {
					background-color: var(--vscode-editor-background-color);
					border: none;
					color: var(--vscode-button-foreground);
					padding: 0 5px;
					transition: transform .2s;
				}

				button:active {
					transform: scale(1.5);
				}

				button:focus {
					outline: none;
					outline-width: 0;
				}

				.play {
					color: var(--vscode-debugIcon-startForeground)
				}

				.reload {
					color: var(--vscode-debugIcon-continueForeground)
				}

				.button-container {
					float: right;
				}

				.border {
					border: .5px solid var(--vscode-editor-foreground);
				}

				.var-container {
					display: flex;
				}

				.var-lable {
					font-weight: bold;
					padding: 0 5px;
				}
			</style>
    </head>
    <body>
			<section class="var-container">
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
			<script>
				const input = document.getElementById('in1');
				const text = document.getElementById('text');

				input.onchange = e => {
					text.innerHTML = e.target.value;
				}
			</script>
			</section>
    </body>
  </html>
  `;
}
