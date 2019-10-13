import * as fs from 'fs';
import * as path from 'path';
import { REPOS_ROOT } from '../env';


export const isDirectory = (path: string): boolean => fs.lstatSync(path).isDirectory();

export const getRepositoryPath = (repName: string): string => {
    return typeof repName === 'string'
        ? path.join(REPOS_ROOT, repName)
        : REPOS_ROOT;
};

export const deleteFolderRecursive = (path: string): void => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            const curPath = path + "/" + file;

            if (isDirectory(curPath)) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
