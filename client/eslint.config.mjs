import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import configPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

const MAX_DEPTH = 4;
const MAX_FN_PARAMS = 3;

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config([
  { languageOptions: { globals: { React: true } }, ignores: ['node_modules'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  js.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  {
    rules: {
      'max-depth': ['warn', { max: MAX_DEPTH }],
      'max-params': ['warn', { max: MAX_FN_PARAMS }],
      'prefer-const': 'warn',
      'no-eval': 'warn',
      'no-param-reassign': 'warn',
      'no-promise-executor-return': 'warn',
      'no-unreachable-loop': 'warn',

      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      'react/button-has-type': 'warn',
      'react/jsx-no-constructed-context-values': 'warn',
      'react/no-array-index-key': 'error',
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-unstable-nested-components': 'warn',

      'jsx-a11y/lang': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
    },
  },
  configPrettier,
]);
