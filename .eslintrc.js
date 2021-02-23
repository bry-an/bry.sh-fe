module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'prettier',
    'prettier/standard',
    'plugin:vue/recommended',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'vue/require-prop-types': 'error',
    'vue/require-default-prop': 'error',
    camelcase: 'warn',
    'max-len': 'off',
    'no-console': 'error',
    'no-debugger': 'warn',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': ['error'],
    'import/extensions': ['warn', 'ignorePackages'],
    'import/no-extraneous-dependencies': 'off',
    'arrow-parens': ['error', 'always'],
    'func-names': ['error', 'never'],
    'object-curly-newline': [
      'error',
      { ImportDeclaration: 'never', ExportDeclaration: 'never' },
    ],
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
