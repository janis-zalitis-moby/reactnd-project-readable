module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'no-plusplus': 'off',
    'react/jsx-filename-extension': 'off',
    'react/forbid-prop-types': 'off',
    'class-methods-use-this': 'off',
    'react/no-unused-prop-types': 'off',
    'import/prefer-default-export': 'off',
    'no-confusing-arrow': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'no-case-declarations': 'off',
    'arrow-parens': ['warn', 'as-needed'],
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'max-len': [2, 150],
  },
  globals: {
    window: true,
    document: true,
  },
};