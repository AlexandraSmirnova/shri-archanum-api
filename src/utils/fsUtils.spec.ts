import { getRepositoryPath } from './fsUtils';


describe('test getRepositoryPath', () => {
    beforeEach(() => {
        process.env.DIR = "C:\\path\\dir";
    });

    it('get correct path', () => {
        const result = getRepositoryPath('foo');

        expect(result).toBe('C:\\path\\dir\\foo');
    });

    it('return env.DIR if empty repository name', () => {
        const result = getRepositoryPath('');

        expect(result).toBe(process.env.DIR);
    });
});

