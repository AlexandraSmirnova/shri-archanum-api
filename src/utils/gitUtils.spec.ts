const child = require('child_process');
const { log, diff, showTree, showFileContent } = require('./gitUtils');


jest.mock('../utils/fsUtils', () => ({
    getRepositoryPath: jest.fn((arg) => arg),
}));

jest.mock('child_process');

const defaultExecMock = (command, path, callback) => 
    Promise.resolve().then(() => callback(null, 'test string'));


describe('test log', () => {
    beforeEach(() => {
        child.exec.mockImplementation(defaultExecMock);
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
        child.exec.mockImplementation((command, path, callback) => 
            Promise.resolve().then(() => callback(null, '')
        ));
        let result = null;
        const onSuccess = (response) => {
            result = response;
        }
        
        await log('repo', 'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should run onError handler if error', async () => {
        child.exec.mockImplementation((command, path, callback) => 
            Promise.resolve().then(() => callback('error')
        ));
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
        child.exec.mockImplementation(defaultExecMock);
    });
    
    it('should correct handle git answer', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response;
        }
        
        await diff('repo',  '', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    })

    it('should correct handle empty git answer', async () => {
        child.exec.mockImplementation((command, path, callback) => 
            Promise.resolve().then(() => callback(null, '')
        ));
        let result = null;
        const onSuccess = (response) => {
            result = response;
        }
        
        await diff('repo', 'args', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should run onError handler if error', async () => {
        child.exec.mockImplementation((command, path, callback) => 
            Promise.resolve().then(() => callback('error')
        ));
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
        child.exec.mockImplementation(defaultExecMock);
    });
    
    it('should correct handle git answer', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response;
        }
        
        await showTree('repo',  'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    })

    it('should correct handle empty git answer', async () => {
        child.exec.mockImplementation((command, path, callback) => 
            Promise.resolve().then(() => callback(null, '')
        ));
        let result = null;
        const onSuccess = (response) => {
            result = response;
        }
        
        await showTree('repo',  'hash', 'args', jest.fn(), onSuccess);

        expect(result).toBe("");
    });

    it('should run onError handler if error', async () => {
        child.exec.mockImplementation((command, path, callback) => 
            Promise.resolve().then(() => callback('error')
        ));
        let result = null;
        const onError = (response) => {
            result = response
        }

        await showTree('repo',  'hash', 'args', onError, jest.fn());

        expect(result).toBe("error");
    });

    it('should correct work if hash is undefined', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response
        }

        await showTree('repo',  undefined, 'args', jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });

    it('should correct work if args is undefined', async () => {
        let result = null;
        const onSuccess = (response) => {
            result = response
        }

        await showTree('repo',  'hash', undefined, jest.fn(), onSuccess);

        expect(result).toBe("test string");
    });
});


describe('test showFileContent', () => {
    beforeEach(() => {
        child.exec.mockImplementation(defaultExecMock);
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
        child.exec.mockImplementation((command, path, callback) => 
            Promise.resolve().then(() => callback(null, '')
        ));
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