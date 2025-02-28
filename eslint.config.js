// eslint.config.js
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
  // ESLint recommended rules
  js.configs.recommended,
  // TypeScript rules
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
      ...ts.configs['recommended-type-checked'].rules,
      
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off'
    },
  },
  // Vue rules
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
    },
    processor: vue.processors['.vue'],
    rules: {
      ...vue.configs.base.rules,
      ...vue.configs['vue3-recommended'].rules,
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.output/',
      'coverage/',
      '.nuxt',
    ]
  }
];
