import * as vscode from "vscode";
import { createAndOpenEmptyFile } from "./compositions";
import { getSelection } from "./functions";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "extension" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from extension!");
    }
  );

  // let contextItem = vscode.commands.registerCommand(
  //   "extension.contextItem",
  //   () => {
  //     vscode.window.showInformationMessage("Hello World from extension!");
  //   }
  // );

  let createFileInContextMenu = vscode.commands.registerCommand(
    "extension.createTestFile",
    () => {
      createAndOpenEmptyFile(getSelection());
    }
  );

  context.subscriptions.push(
    disposable,
    //  contextItem,
    createFileInContextMenu
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
