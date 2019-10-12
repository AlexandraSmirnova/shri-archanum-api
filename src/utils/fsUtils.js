const fs = require('fs');
const path = require('path');

const isDirectory = (path) => fs.lstatSync(path).isDirectory();

const getRepositoryPath = (repName) => {
    return typeof repName === 'string'
        ? path.join(process.env.DIR, repName)
        : process.env.DIR;
};

var deleteFolderRecursive = (path) => {
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

module.exports = {
    isDirectory,
    getRepositoryPath,
    deleteFolderRecursive
}