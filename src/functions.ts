import * as vscode from "vscode";
import * as fs from "fs";

const editor = vscode.window.activeTextEditor;

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

export const createFile = (filename: string, data: string) => {
  fs.writeFileSync(filename, data, null);
};

export const autoImport = () => {
  // TODO
};
