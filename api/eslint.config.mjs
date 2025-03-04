import pluginJs from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';


export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier
);
