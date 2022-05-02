module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  // 表示你想使用的额外的语言特性
  parserOptions: {
    ecmaVersion: 12, // 'latest' | 11 | 2020  (不自动启用es6全局变量) es6是es2015
    sourceType: 'module', // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
    ecmaFeatures: {
      globalReturn: false, // 允许在全局作用域下使用 return 语句
      impliedStrict: true, // 启用全局 strict mode
      jsx: true, // 启用 JSX
    },
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // 'airbnb',
    'next/core-web-vitals',
    // eslint-config-prettier插件:关闭所有不必要或可能与Prettier冲突的规则
    'prettier',
  ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    // import/parsers import/resolver 处理ts(import/extensions)问题
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/extensions': ['.ts', '.tsx', '.d.ts'],
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
}
