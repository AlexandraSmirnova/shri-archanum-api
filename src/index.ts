import * as express from 'express';
import * as fs from 'fs';
import repos from './api/repos';

const app = express();


const allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

app.use(allowCrossDomain);

if (process.argv.length <= 2 || !fs.existsSync(process.argv[2])) {
    console.log("There is should be path of an existed directory in args");
    process.exit(-1);
}

process.env.DIR = process.argv[2];
console.log("Seted process.env.DIR: " + process.env.DIR);

app.use('/api/repos', repos);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

