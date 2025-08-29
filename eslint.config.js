import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  stylistic.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      // Ваши кастомные правила
      'linebreak-style': ['error', 'unix'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-console': 'off',
      'semi': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'brace-style': ['error', 'stroustrup'],
      'max-statements-per-line': ['error', { max: 1 }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Дополнительные настройки для stylistic плагина
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', 'stroustrup'],
    },
  },
])
