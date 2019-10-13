import * as fs from 'fs';

if (process.argv.length <= 2 || !fs.existsSync(process.argv[2])) {
    console.log("There is should be path of an existed directory in args");
    process.exit(-1);
}

export const REPOS_ROOT = process.argv[2];

