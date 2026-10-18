// ESLint "flat config". It tells ESLint which files to check and which
// rules to apply. We start from the recommended set and add a few rules
// that catch the mistakes beginners make most often.
import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['assets/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      // main.js is a classic script loaded with <script defer>, not a module.
      sourceType: 'script',
      globals: { ...globals.browser }
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      'no-console': ['warn', { allow: ['info', 'error'] }]
    }
  }
];
