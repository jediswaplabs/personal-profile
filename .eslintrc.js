module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:storybook/recommended'],
  plugins: ['react', 'react-hooks', 'fp'
  // '@spothero/eslint-plugin-spothero',
  ],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    }
  },
  globals: {
    document: true,
    window: true,
    localStorage: true,
    Fragment: true
  },
  overrides: [{
    files: ['**/*.test.js', '**/*.test.jsx'],
    env: {
      jest: true
    },
    plugins: ['jest']
  }],
  rules: {
    // '@spothero/spothero/ternary-parentheses': 'error',
    'arrow-parens': ['error', 'always'],
    'consistent-return': 'off',
    // 'fp/no-class': 'error',
    'fp/no-delete': 'error',
    'func-names': ['error', 'as-needed'],
    'import/exports-last': 'error',
    'import/group-exports': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 2,
    'import/order': ['error', {
      'newlines-between': 'always',
      groups: [['builtin', 'external'], ['internal', 'parent', 'sibling', 'index']]
    }],
    'import/prefer-default-export': 'off',
    'jest/expect-expect': 'off',
    'jest/no-disabled-tests': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'off',
    'jsx-a11y/aria-props': 'off',
    'jsx-a11y/aria-proptypes': 'off',
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/aria-unsupported-elements': 'off',
    'jsx-a11y/autocomplete-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/html-has-lang': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-access-key': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-distracting-elements': 'off',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/no-redundant-roles': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/role-has-required-aria-props': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',
    'jsx-a11y/scope': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
    'max-len': 'off',
    'max-params': ['error', 3],
    'no-await-in-loop': 'off',
    'no-cond-assign': 'off',
    'no-console': ['error', {
      allow: ['warn', 'error']
    }],
    'no-continue': 'off',
    'no-delete-var': 'error',
    'no-empty': 0,
    'no-extra-boolean-cast': 0,
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['state']
    }],
    'no-plusplus': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-properties': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-vars': ['error', {
      varsIgnorePattern: 'Fragment',
      ignoreRestSiblings: true
    }],
    'no-use-before-define': 'off',
    'object-curly-newline': ['error', {
      ObjectExpression: {
        consistent: true,
        multiline: true,
        minProperties: 5
      },
      ObjectPattern: {
        consistent: true
        // multiline: true,
        // minProperties: 5,
      },

      ImportDeclaration: 'never',
      ExportDeclaration: 'always'
    }],
    'react-hooks/exhaustive-deps': 0,
    // Checks effect dependencies
    'react-hooks/rules-of-hooks': 'error',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 0,
    'react/forbid-prop-types': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-array-index-key': 'off',
    'react/no-did-update-set-state': 'off',
    'react/no-unused-state': 'off',
    'react/prop-types': [2, {
      skipUndeclared: true
    }],
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'require-atomic-updates': 'off',
    'require-await': 2,
    camelcase: 'error',
    curly: ['error', 'all'],
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};