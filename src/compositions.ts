import {
  createEmptyFile,
  openFileTab,
  injectTestSnippet,
  addExtensionToFilePath,
  createComponentFileInterface,
} from "./functions";
import { composeAsync } from "./utils";

export const createAndOpenEmptyFile = composeAsync(
  injectTestSnippet,
  openFileTab,
  createEmptyFile,
  addExtensionToFilePath(".test.tsx"),
  createComponentFileInterface
);
