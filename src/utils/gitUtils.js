const { exec } = require('child_process');
const { getRepositoryPath } = require('./fsUtils');

const execWrapper = (command, path, onError, onSuccess) => {
    return exec(command, { cwd: path }, (err, stdout, stderr) => {
        if (err) {
            onError(err);
            return;
        }
        onSuccess(stdout);
    })
}

const log = (repositoryId, commitHash, args, onError, onSuccess) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    return execWrapper(`git log ${commitHash || ""} ${args}`, repositoryPath, onError, onSuccess);
};

const diff = (repositoryId, args, onError, onSuccess) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    return execWrapper(`git diff ${args}`, repositoryPath, onError, onSuccess);
};

const showTree = (repositoryId, commitHash, path, onError, onSuccess) => {
    const repositoryPath = getRepositoryPath(repositoryId);
    const pathParams = commitHash && path
        ? `${commitHash} ${path.replace(/\/?$/, '/') || ""}` 
        : "master";

    return execWrapper(`git ls-tree --full-tree --name-only ${pathParams}`, repositoryPath, onError, onSuccess);
};

const showFileContent = (repositoryId, commitHash, path, onError, onSuccess) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    return execWrapper(`git show ${commitHash || "HEAD"}:${path}`, repositoryPath, onError, onSuccess);
};

const clone = (url, repositoryId, onError, onSuccess) => {
    return execWrapper(`git clone ${url} ${repositoryId || ""}`, process.env.DIR, onError, onSuccess);
}

module.exports = {
    log,
    diff,
    showTree,
    showFileContent,
    clone,
}
