import { getRepositoryPath } from './fsUtils';

jest.mock('../env', () => ({
    REPOS_ROOT: "C:\\path\\dir",
}));

const mockedReposRoot = "C:\\path\\dir";

describe('test getRepositoryPath', () => {
    it('get correct path', () => {
        const result = getRepositoryPath('foo');

        expect(result).toBe('C:\\path\\dir\\foo');
    });

    it('return env.DIR if empty repository name', () => {
        const result = getRepositoryPath('');

        expect(result).toBe(mockedReposRoot);
    });
});

