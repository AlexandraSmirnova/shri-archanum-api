import * as child from 'child_process';
import { mocked } from 'ts-jest/utils'
import { log, diff, showTree, showFileContent } from './gitUtils';


jest.mock('../utils/fsUtils', () => ({
    getRepositoryPath: jest.fn((arg) => arg),
}));

jest.mock('child_process');
const mockedExec = mocked(child.exec);

const getExecMock = (stderr, stdout) =>
    (command: string, path: object, callback): child.ChildProcess =>
        Promise.resolve()
            .then(() => callback(stderr, stdout)) as unknown as child.ChildProcess;

const defaultExecMock = getExecMock(null, 'test string');

describe('test log', () => {
    beforeEach(() => {
        mockedExec.mockImplementation(defaultExecMock);
    });

    it('should correct handle git answer', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response;
        }

        await log('repo', 'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    })

    it('should correct handle empty git answer', async () => {
        mockedExec.mockImplementation(getExecMock(null, ''));

        let result = null;
        const onSuccess = (response) => {
            result = response;
        }

        await log('repo', 'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should run onError handler if error', async () => {
        mockedExec.mockImplementation(getExecMock('error', null));

        let result = null;
        const onError = (response) => {
            result = response
        }

        await log('repo', 'hash', 'args', onError, jest.fn());

        expect(result).toBe("error");
    });

    it('should run onSuccess if commitHash is undefined', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response
        }

        await log('repo', undefined, '', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });
});


describe('test diff', () => {
    beforeEach(() => {
        mockedExec.mockImplementation(defaultExecMock);
    });

    it('should correct handle git answer', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response;
        }

        await diff('repo', '', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    })

    it('should correct handle empty git answer', async () => {
        mockedExec.mockImplementation(getExecMock(null, ''));

        let result = null;
        const onSuccess = (response) => {
            result = response;
        }

        await diff('repo', 'args', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should run onError handler if error', async () => {
        mockedExec.mockImplementation(getExecMock('error', null));
        let result = null;
        const onError = (response) => {
            result = response
        }

        await diff('repo', '', onError, jest.fn());

        expect(result).toBe("error");
    });
});


describe('test showTree', () => {
    beforeEach(() => {
        mockedExec.mockImplementation(defaultExecMock);
    });

    it('should correct handle git answer', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response;
        }

        await showTree('repo', 'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    })

    it('should correct handle empty git answer', async () => {
        mockedExec.mockImplementation(getExecMock(null, ''));

        let result = null;
        const onSuccess = (response) => {
            result = response;
        }

        await showTree('repo', 'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should run onError handler if error', async () => {
        mockedExec.mockImplementation(getExecMock('error', null));

        let result = null;
        const onError = (response) => {
            result = response
        }

        await showTree('repo', 'hash', 'args', onError, jest.fn());

        expect(result).toBe("error");
    });

    it('should correct work if hash is undefined', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response
        }

        await showTree('repo', undefined, 'args', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });

    it('should correct work if args is undefined', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response
        }

        await showTree('repo', 'hash', undefined, jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });
});


describe('test showFileContent', () => {
    beforeEach(() => {
        mockedExec.mockImplementation(defaultExecMock );;
    });

    it('should correct handle git answer', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response;
        }

        await showFileContent('repo',  'hash', 'path', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });

    it('should correct handle empty git answer', async () => {
        mockedExec.mockImplementation(getExecMock(null, ''));

        let result = null;
        const onSuccess = (response) => {
            result = response;
        }

        await showFileContent('repo', 'hash', 'path', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should correct work if hash is undefined', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response
        }

        await showFileContent('repo',  undefined, 'path', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });

    it('should correct work if path is undefined', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response
        }

        await showFileContent('repo',  'hash', undefined, jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });
});