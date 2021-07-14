import { createFile, getFilePath, openFile } from "./functions";
import { compose } from "./utils";

export const createAndOpenFile = compose(createFile, getFilePath, openFile);
