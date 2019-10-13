import { exec, ExecException } from 'child_process';
import { getRepositoryPath } from './fsUtils';
import { REPOS_ROOT } from '../env';


export type ErrorHandler = (arg: string | ExecException ) => void;
export type SuccessHandler = (arg: string ) => void;

export const execWrapper = (
    command: string, 
    path: string, 
    onError: ErrorHandler, 
    onSuccess: SuccessHandler
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
    commitHash: string | undefined,
    args: string,
    onError: ErrorHandler,
    onSuccess: SuccessHandler
) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    return execWrapper(`git log ${commitHash || ""} ${args}`, repositoryPath, onError, onSuccess);
};

export const diff = (
    repositoryId: string,
    args: string, 
    onError: ErrorHandler, 
    onSuccess: SuccessHandler
) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    return execWrapper(`git diff ${args}`, repositoryPath, onError, onSuccess);
};

export const showTree = (
    repositoryId: string,
    commitHash: string | undefined,
    path: string | undefined,
    onError: ErrorHandler,
    onSuccess: SuccessHandler
) => {
    const repositoryPath = getRepositoryPath(repositoryId);
    const pathParams = commitHash && path
        ? `${commitHash} ${path.replace(/\/?$/, '/') || ""}` 
        : "master";

    return execWrapper(`git ls-tree --full-tree --name-only ${pathParams}`, repositoryPath, onError, onSuccess);
};

export const showFileContent = (
    repositoryId: string,
    commitHash: string | undefined,
    path: string | undefined,
    onError: ErrorHandler,
    onSuccess: SuccessHandler
) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    return execWrapper(`git show ${commitHash || "HEAD"}:${path}`, repositoryPath, onError, onSuccess);
};

export const clone = (
    url: string,
    repositoryId: string,
    onError: ErrorHandler,
    onSuccess: SuccessHandler
) => execWrapper(`git clone ${url} ${repositoryId || ""}`, REPOS_ROOT, onError, onSuccess);

