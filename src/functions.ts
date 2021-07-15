import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { TextEditor } from "vscode";

interface IComponentFile {
  componentName: string;
  fileName: string;
  filePath: string;
}

const editor = vscode.window.activeTextEditor;

export const getSelection = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const text = editor.document.getText(editor.selection);
  return text;
};

export const createComponentFileInterface = (
  componentName: string
): IComponentFile => {
  return {
    componentName,
    fileName: componentName,
    filePath: "",
  };
};

// Curry
export const addExtensionToFilePath = (extension: string) => {
  return (componentFile: IComponentFile) => {
    return {
      ...componentFile,
      fileName: componentFile.fileName + extension,
    };
  };
};

export const createEmptyFile = (componentFile: IComponentFile) => {
  if (vscode.workspace.workspaceFolders === undefined) {
    return;
  }

  const filePath = path.join(
    vscode.workspace?.workspaceFolders?.[0].uri.fsPath,
    componentFile.fileName
  );

  fs.writeFileSync(filePath, "", null);
  return { ...componentFile, filePath };
};

export const openFileTab = (componentFile: IComponentFile) => {
  return new Promise((resolve, reject) => {
    vscode.workspace.openTextDocument(componentFile.filePath).then((doc) => {
      vscode.window.showTextDocument(doc).then((textEditor) => {
        resolve({ textEditor, componentFile });
      });
    });
  });
};

export const injectTestSnippet = ({
  textEditor,
  componentFile,
}: {
  textEditor: TextEditor;
  componentFile: IComponentFile;
}) => {
  if (!editor) {
    return;
  }

  const filePath = "../src/snippets/react-test.tsx";
  const content = fs.readFileSync(path.join(__dirname, filePath), "utf8");
  const replaced = content.replaceAll(
    "ComponentName",
    componentFile.componentName
  );

  const snippetString = new vscode.SnippetString(replaced);
  textEditor.insertSnippet(snippetString);
};

// export const showInputBox = async (placeholder: string) => {
//   const gistName = await vscode.window.showInputBox({
//     placeHolder: placeholder,
//   });

//   return gistName;
// };

export const writeFile = (filename: string, data: string) => {
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

export const getFilePath = (fileName: string) => {
  if (vscode.workspace.workspaceFolders === undefined) {
    return;
  }

  const filePath = path.join(
    vscode.workspace?.workspaceFolders?.[0].uri.path,
    fileName
  );

  return { fileName: fileName, filePath: vscode.Uri.file(filePath) };
};

// "hello ${1:ComponentName}, ${1:ComponentName}"

export const getNamesFromTemplateFile = (templateCode: string) => {
  let names = [];

  // Variable names are defined with double underscore, example __MyVariable__
  for (let x of templateCode.matchAll(/__(.*?)__/g)) {
    names.push(x[1]);
  }

  return [names, templateCode];
};
