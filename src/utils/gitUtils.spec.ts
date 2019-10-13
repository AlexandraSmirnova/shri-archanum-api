import * as child from 'child_process';
import { mocked } from 'ts-jest/utils'
import { log, diff, showTree, showFileContent, ErrorHandler, SuccessHandler } from './gitUtils';


jest.mock('../utils/fsUtils', () => ({
    getRepositoryPath: jest.fn((arg) => arg),
}));

jest.mock('../env', jest.fn());

jest.mock('child_process');

const mockedExec = mocked(child.exec);

const getExecMock = (err: string, stdout: string) =>
    (
        command: string,
        options: object | undefined | null,
        callback?: (error: child.ExecException | null, stdout: string | Buffer, stderr: string | Buffer) => void
    ): child.ChildProcess =>
        Promise.resolve()
            .then(() => callback 
                && callback(err as unknown as child.ExecException, stdout, '')
            ) as unknown as child.ChildProcess;

const defaultExecMock = getExecMock('', 'test string');

describe('test log', () => {
    beforeEach(() => {
        mockedExec.mockImplementation(defaultExecMock);
    });

    it('should correct handle git answer', async () => {
        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response;
        }

        await log('repo', 'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    })

    it('should correct handle empty git answer', async () => {
        mockedExec.mockImplementation(getExecMock('', ''));

        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response;
        }

        await log('repo', 'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should run onError handler if error', async () => {
        mockedExec.mockImplementation(getExecMock('error', ''));

        let result = null;
        const onError: ErrorHandler = (response) => {
            result = response
        }

        await log('repo', 'hash', 'args', onError, jest.fn());

        expect(result).toBe("error");
    });

    it('should run onSuccess if commitHash is undefined', async () => {
        let result = null;
        const onSuccess: SuccessHandler = (response) => {
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
        const onSuccess: SuccessHandler = (response) => {
            result = response;
        }

        await diff('repo', '', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    })

    it('should correct handle empty git answer', async () => {
        mockedExec.mockImplementation(getExecMock('', ''));

        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response;
        }

        await diff('repo', 'args', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should run onError handler if error', async () => {
        mockedExec.mockImplementation(getExecMock('error', ''));
        let result = null;
        const onError: ErrorHandler = (response) => {
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
        const onSuccess: SuccessHandler = (response) => {
            result = response;
        }

        await showTree('repo', 'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    })

    it('should correct handle empty git answer', async () => {
        mockedExec.mockImplementation(getExecMock('', ''));

        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response;
        }

        await showTree('repo', 'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should run onError handler if error', async () => {
        mockedExec.mockImplementation(getExecMock('error', ''));

        let result = null;
        const onError: ErrorHandler = (response) => {
            result = response
        }

        await showTree('repo', 'hash', 'args', onError, jest.fn());

        expect(result).toBe("error");
    });

    it('should correct work if hash is undefined', async () => {
        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response
        }

        await showTree('repo', undefined, 'args', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });

    it('should correct work if args is undefined', async () => {
        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response
        }

        await showTree('repo', 'hash', undefined, jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });
});


describe('test showFileContent', () => {
    beforeEach(() => {
        mockedExec.mockImplementation(defaultExecMock);
    });

    it('should correct handle git answer', async () => {
        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response;
        }

        await showFileContent('repo',  'hash', 'path', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });

    it('should correct handle empty git answer', async () => {
        mockedExec.mockImplementation(getExecMock('', ''));

        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response;
        }

        await showFileContent('repo', 'hash', 'path', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should correct work if hash is undefined', async () => {
        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response
        }

        await showFileContent('repo',  undefined, 'path', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });

    it('should correct work if path is undefined', async () => {
        let result = null;
        const onSuccess: SuccessHandler = (response) => {
            result = response
        }

        await showFileContent('repo',  'hash', undefined, jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });
});