module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["module:babel-preset-expo", "module:react-native-dotenv"],
    env: {
      production: {},
    },
    plugins: [
      [
        "transform-inline-environment-variables",
        {
          include: ["NODE_ENV", "API"],
        },
      ],
    ],
  }
};
