module.exports = {
    automock: false,
    moduleFileExtensions: [
        'ts',
        'js',
    ],
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!lodash-es/.*)',
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|tsx?)$',
    transform: {
        '.(ts|js)': 'ts-jest',
    },
};
