/** @type {import('react-native-unistyles/plugin').UnistylesPluginOptions} */
const unistylesPluginOptions = {
  root: './src', // point this to your actual source folder
  debug: true,
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-unistyles/plugin', unistylesPluginOptions],
      'react-native-worklets/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@/components': './src/components',
            '@/theme': './src/theme',
            '@/utils': './src/utils',
            '@/types': './src/types',
            '@/hooks': './src/hooks',
          },
        },
      ],
    ],
  };
};
