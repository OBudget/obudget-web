module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    project: "./tsconfig.json",
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".ts", ".tsx", ".js"],
      },
    },
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["node_modules", "build"],
  plugins: ["react", "@typescript-eslint", "jest"],
  rules: {
    "no-console": "off",
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "no-underscore-dangle": [
      "error",
      {
        allow: ["_id"],
      },
    ],
    "no-underscore-dangle": "off",
    "arrow-body-style": "off",
    "comma-dangle": "off",
    "import/no-unresolved": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-console": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
