// 可以参考eslint-config-next包的配置

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
  // 继承别人写好的规则
  extends: [
    // 'next/core-web-vitals', next框架自带
    'airbnb',
    'airbnb/hooks',
    'prettier', // eslint-config-prettier插件:关闭所有不必要或可能与Prettier冲突的规则
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  // 插件：为规则提供额外的能力
  plugins: ['jsx-a11y', 'react', 'import', '@typescript-eslint'],
  rules: {
    // 对于ts后缀的引入
    'import/extensions': ['error', { ts: 'never', json: 'always' }],
    'default-param-last': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',

    // 在ts,tsx中开启jsx属性
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    // 忽略在ts中使用prop-type属性校验
    'react/prop-types': [0],
    // 没有命名导入警告
    'import/no-anonymous-default-export': 'warn',
    // 使用jsx时防止缺少react包
    'react/react-in-jsx-scope': 'off',
    // 关闭禁止jsx中使用 ...obj 扩展符
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore', explicitSpread: 'ignore' }],
    // react 函数式组件可以使用的类型
    'react/function-component-definition': [
      'error',
      {
        // function-declaration-function Name  function-expression-const a = function a
        namedComponents: ['arrow-function', 'function-declaration'],
        unnamedComponents: ['arrow-function', 'function-expression'],
      },
    ],
  },
  // 覆盖glob配置
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // 对于不支持的ts版本进行警告
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      // 对ts的@/xx路径的支持
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
}
