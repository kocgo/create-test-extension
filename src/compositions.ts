import { createFile, getFilePath, openFile } from "./functions";
import { compose } from "./utils";

export const createAndOpenFile = compose(openFile, getFilePath, createFile);
