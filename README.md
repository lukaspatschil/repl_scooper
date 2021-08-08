# repl scooper

Repl Scooper is a extension which helps programmers while developing new JS functions or code snippets. 

It allows users to evaluate code snippets in an enclosed environment in order to better get a grasp of small parts of the program or debug certain features.

## Features

The extension has two unique commands:

- `function`: In order to select a whole function which is around the cursor use the `function` command. The extension will automatically find the deepes enclosing function.
- `command`: If you want to experiment with parts of the code or just some code snippets use the `command` to select everything marked.

If you make changes to your code and save it the repl scooper will automatically update itself.

## Usage

The plugin can be used by accessing the command pallet with `shift + cmd + p` or `shift + ctrl + p` and searching for `REPL Scooper: function` or `command` and pressing enter while inside a valid function or statement. If there is no valid statement detected, the plugin will alert you with an error message.

## Requirements

To use the extension it is required to install node.js on your system so it can be used to evaluate to code. You must also `require` and install all neccesary `node-packages` in order for them to be used.

## Extension Settings

Currently there are no extension settings. We will keep you posted about them in the future.

## Report an Issue

Please let me know if you encounter any issues with the extension so I can fix them.

In order to let me know please submit them to [https://github.com/lukaspatschil/repl-scooper/issues](https://github.com/lukaspatschil/repl-scooper/issues).
