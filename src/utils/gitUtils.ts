import { exec } from 'child_process';
import { getRepositoryPath } from './fsUtils';


type Callback = (string) => void;

export const execWrapper = (
    command: string, 
    path: string, 
    onError: Callback, 
    onSuccess: Callback
) => {
    return exec(command, { cwd: path }, (err, stdout, stderr) => {
        if (err) {
            onError(err);
            return;
        }
        onSuccess(stdout);
    })
}

export const log = (
    repositoryId: string,
    commitHash: string,
    args: string,
    onError: Callback,
    onSuccess: Callback
) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    return execWrapper(`git log ${commitHash || ""} ${args}`, repositoryPath, onError, onSuccess);
};

export const diff = (
    repositoryId: string,
    args: string, 
    onError: Callback, 
    onSuccess: Callback
) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    return execWrapper(`git diff ${args}`, repositoryPath, onError, onSuccess);
};

export const showTree = (
    repositoryId: string,
    commitHash: string,
    path: string,
    onError: Callback,
    onSuccess: Callback
) => {
    const repositoryPath = getRepositoryPath(repositoryId);
    const pathParams = commitHash && path
        ? `${commitHash} ${path.replace(/\/?$/, '/') || ""}` 
        : "master";

    return execWrapper(`git ls-tree --full-tree --name-only ${pathParams}`, repositoryPath, onError, onSuccess);
};

export const showFileContent = (
    repositoryId: string,
    commitHash: string,
    path: string,
    onError: Callback,
    onSuccess: Callback
) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    return execWrapper(`git show ${commitHash || "HEAD"}:${path}`, repositoryPath, onError, onSuccess);
};

export const clone = (
    url: string,
    repositoryId: string,
    onError: Callback,
    onSuccess: Callback
) => execWrapper(`git clone ${url} ${repositoryId || ""}`, process.env.DIR, onError, onSuccess);

