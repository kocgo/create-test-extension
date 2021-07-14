import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

const editor = vscode.window.activeTextEditor;
//Create output channel
// let outputChannel = vscode.window.createOutputChannel("My Debugger");

export const getSelection = () => {
  if (!editor) {
    return;
  }
  return editor.document.getText(editor.selection);
};

export const showInputBox = async (placeholder: string) => {
  const gistName = await vscode.window.showInputBox({
    placeHolder: placeholder,
  });

  return gistName;
};

// Done
export const createFile = (filename: string, data: string) => {
  if (vscode.workspace.workspaceFolders === undefined) {
    return;
  }

  const filePath = path.join(
    vscode.workspace?.workspaceFolders?.[0].uri.fsPath,
    filename
  );

  fs.writeFileSync(filePath, data, null);
  return filename;
};

export const getFilePath = (filename: string) => {
  if (vscode.workspace.workspaceFolders === undefined) {
    return;
  }

  const filePath = path.join(
    vscode.workspace?.workspaceFolders?.[0].uri.path,
    filename
  );

  return vscode.Uri.file(filePath);
};

export const openFile = (openPath: string) => {
  vscode.workspace.openTextDocument(openPath).then((doc) => {
    vscode.window.showTextDocument(doc);
  });
};

export const autoImport = () => {
  // TODO
};
