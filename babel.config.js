module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@utils': './src/utils',
          '@components': './src/components',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@store': './src/store',
          '@navigation': './src/navigation',
          '@types': './src/types',
          '@assets': './src/assets',
          '@mocks': './src/mocks',
          '@services': './src/services',
        },
      },
    ],
  ],
};
