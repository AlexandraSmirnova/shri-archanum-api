import * as express from 'express';
import repos from './api/repos';
import { REPOS_ROOT } from './env';

const app = express();

const allowCrossDomain = function(
    req: express.Request, 
    res: express.Response,
    next: express.NextFunction
) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin"
    );
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

app.use(allowCrossDomain);

console.log("Seted process.env.DIR: " + REPOS_ROOT);

app.use('/api/repos', repos);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

