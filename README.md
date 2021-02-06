# repl scooper

Repl Scooper is a extension which helps programmers while developing new JS functions or code snippets. 

It allowes users to evaluate code snippets in an enclosed envioment in order to better get a graps of small parts of the programm or debug certain features.

## Features

The extension has two unique commands:

- `function`: In order to select a whole function which is around the cursor use the `function` command. The extension will automatically find the deepes enclosing function.
- `command`: If you want to experiment with parts of the code or just some code snippets use the `command` to select everything marked.

If you make changes to your code and save it the repl scooper will automatically update itself.

## Requirements

To use the extension it is required to install node.js on your system so it can be used to evaluate to code. You must also `require` and install all neccesary `node-packages` in order for them to be used.

## Extension Settings

Currently there are no extension settings. We will keep you posted about them in the future.

## Report an Issue

Please let me know if you encounter any issues with the extension so I can fix them.

In order to let me know please submit them to [https://github.com/lukaspatschil/repl-scooper/issues](https://github.com/lukaspatschil/repl-scooper/issues).

## Known Issues

- The repl `command` is not working with the webview.

## Release Notes

### 0.0.1

Pre release of the extension.
