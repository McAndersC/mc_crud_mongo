import fs from 'node:fs/promises';
import { dirname } from '../misc/helpers.mjs';
import path from "node:path";

export const deleteFile = async (filePath) => {
  
    let img = filePath.indexOf('http') !== -1 ? filePath.split(process.env.SERVER_HOST)[1] : filePath;
    let imgPath = path.join(dirname, "/public" + img);
 
    if (img && img.indexOf("no-") === -1 && img.indexOf("seed_") === -1) {

        try {

            fs.unlink(imgPath)

        } catch (error) {

            console.log(error);

        }
    }
    
};


export const read = async (filePath) => await fs.readFile(filePath, 'utf8', (err, data) => {

    if (err) {
        console.error('ERROR', err);
        return;
    }

    return data;

});

export const write = async (filePath, content) => await fs.writeFile(filePath, content, 'utf8', (err, data) => {

    if (err) {
        console.error('ERROR', err);
        return;
    }

    return data;

});