module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          extensions: [
            ".ios.js",
            ".android.js",
            ".ios.jsx",
            ".android.jsx",
            ".js",
            ".jsx",
            ".json",
            ".ts",
            ".tsx",
          ],
          root: ["."],
          alias: {
            "@components": "./components",
            "@constants": "./constants",
            "@assets": "./assets",
            "@theme": "./theme",
            "@types": "./types",
            "@validations": "./constants/validations",
            "@store": "./store",
          },
        },
      ],
    ],
  };
};
