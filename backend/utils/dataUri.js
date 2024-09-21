import DataUriParser from "datauri/parser.js";
import path from "path";
import fs from "fs";

const getDataUri = (file) => {
    if (!file || !file.path || !file.originalname) {
        console.error('Invalid file:', file);
        throw new Error('Invalid file');
    }
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    const fileBuffer = fs.readFileSync(file.path);
    return parser.format(extName, fileBuffer);
};

export default getDataUri;
