import * as  express from 'express';
import * as  fs from 'fs';
import * as  path from 'path';
import { ErrorHandler, log, diff, showTree, showFileContent, clone } from '../utils/gitUtils';
import { isDirectory, getRepositoryPath, deleteFolderRecursive } from '../utils/fsUtils';
import { REPOS_ROOT } from '../env';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    fs.readdir(REPOS_ROOT, (err: NodeJS.ErrnoException | null, items: string[]) => {
        if (err) {
            res.status(404).end();
        }

        const repos = items.filter((item: string) => {
            const dirPath = path.join(REPOS_ROOT, item);

            return isDirectory(dirPath) && fs.existsSync(path.join(dirPath, '.git'))
                && isDirectory(path.join(dirPath, '.git'));
        });

        res.json(repos);
    });
});

router.get('/:repositoryId/commits/:commitHash?', (req, res) => {
    const onError: ErrorHandler = () => res.status(404).end();
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

    log(req.params.repositoryId, req.params.commitHash, '--pretty="%H,%ad,%an,%s"', onError, onSuccess);
});

router.get('/:repositoryId/commits/:commitHash/diff', (req, res) => {
    const onError: ErrorHandler = () => res.status(404).end();
    const onSuccess = (out: string) => {
        res.json({ diff: out });
    }

    diff(req.params.repositoryId, req.params.commitHash, onError, onSuccess);
});

router.get(['/:repositoryId/', '/:repositoryId/tree/:commitHash/:path([^/]*)?'], (req, res) => {
    const onError: ErrorHandler = () => res.status(404).end();
    const onSuccess = (out: string) => {
        const result = out.split('\n')
            .filter((item) => item)
            .map((item) => {
                const itemPath = path.join(REPOS_ROOT, req.params.repositoryId, item);

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

    showTree(req.params.repositoryId, req.params.commitHash, req.params.path, onError, onSuccess);
});

router.get('/:repositoryId/blob/:commitHash?/:pathToFile([^/]*)', (req, res) => {
    const onError: ErrorHandler = () => res.status(404).end();
    const onSuccess = (out: string) => {
        res.json(JSON.stringify(out.split('\n')));
    }

    showFileContent(req.params.repositoryId, req.params.commitHash, req.params.pathToFile, onError, onSuccess);
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
    const onError: ErrorHandler = () => {
        res.status(404).end()
    };
    const onSuccess = (out: string) => {
        res.send(`Repository ${req.body.url} successfully added`);
    }

    clone(req.body.url, req.params.repositoryId, onError, onSuccess);
});

export default router;

