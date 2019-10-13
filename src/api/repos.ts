import * as  express from 'express';
import * as  fs from 'fs';
import * as  path from 'path';
import * as  gitUtils from '../utils/gitUtils';
import { isDirectory, getRepositoryPath, deleteFolderRecursive } from '../utils/fsUtils';


const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    fs.readdir(process.env.DIR, (err, items) => {
        if (err) {
            res.status(404).end();
        }

        const repos = items.filter((item) => {
            const dirPath = path.join(process.env.DIR, item);

            return isDirectory(dirPath) && fs.existsSync(path.join(dirPath, '.git'))
                && isDirectory(path.join(dirPath, '.git'));
        });

        res.json(repos);
    });
});

router.get('/:repositoryId/commits/:commitHash?', (req, res) => {
    const onError = (err: string) => res.status(404).end();
    const onSuccess = (out: string) => {
        const info = out.split('\n')
            .filter((i) => i !== "")
            .map((commit) => {
                const commitData = commit.split(',');

                if (commitData.length < 4) {
                    return;
                }

                return {
                    hash: commitData[0],
                    data: commitData[1],
                    author: commitData[2],
                    name: commitData[3]
                }
            });

        res.json(info);
    }

    gitUtils.log(req.params.repositoryId, req.params.commitHash, '--pretty="%H,%ad,%an,%s"', onError, onSuccess);
});

router.get('/:repositoryId/commits/:commitHash/diff', (req, res) => {
    const onError = (err: string) => res.status(404).end();
    const onSuccess = (out: string) => {
        res.json({ diff: out });
    }

    gitUtils.diff(req.params.repositoryId, req.params.commitHash, onError, onSuccess);
});

router.get(['/:repositoryId/', '/:repositoryId/tree/:commitHash/:path([^/]*)?'], (req, res) => {
    const onError = (err: string) => res.status(404).end();
    const onSuccess = (out: string) => {
        const result = out.split('\n')
            .filter((item) => item)
            .map((item) => {
                const itemPath = path.join(process.env.DIR, req.params.repositoryId, item);

                return {
                    name: item.substr(item.lastIndexOf('/') + 1),
                    isDirectory: isDirectory(itemPath),
                };
            })
            .sort((a, b) => a.isDirectory === b.isDirectory
                ? a.name.localeCompare(b.name)
                : Number(b.isDirectory) - Number(a.isDirectory)
            );

        res.json(result);
    }

    gitUtils.showTree(req.params.repositoryId, req.params.commitHash, req.params.path, onError, onSuccess);
});

router.get('/:repositoryId/blob/:commitHash?/:pathToFile([^/]*)', (req, res) => {
    const onError = (err: string) => res.status(404).end();
    const onSuccess = (out: string) => {
        res.json(JSON.stringify(out.split('\n')));
    }

    gitUtils.showFileContent(req.params.repositoryId, req.params.commitHash, req.params.pathToFile, onError, onSuccess);
});

router.delete('/:repositoryId', (req, res) => {
    const repPath = getRepositoryPath(req.params.repositoryId);

    if (fs.existsSync(repPath)) {
        deleteFolderRecursive(repPath);
        res.send(`Repository ${repPath} successfully deleted`);
    } else {
        res.status(404).end();
    }
});

router.post('/:repositoryId?', (req, res) => {
    const onError = (err: string) => {
        res.status(404).end()
    };
    const onSuccess = (out: string) => {
        res.send(`Repository ${req.body.url} successfully added`);
    }

    gitUtils.clone(req.body.url, req.params.repositoryId, onError, onSuccess);
});

module.exports = router;

