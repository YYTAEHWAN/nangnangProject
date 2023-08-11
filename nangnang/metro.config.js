// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);

// const crypto = require.resolve('crypto-browserify');
const url = require.resolve('url/');
module.exports = {
resolver: {
  extraNodeModules: {
    // crypto,
    url,
    fs: require.resolve('expo-file-system'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    net: require.resolve('react-native-tcp'),
    os: require.resolve('os-browserify/browser.js'),
    path: require.resolve('path-browserify'),
    stream: require.resolve('readable-stream'),
    vm: require.resolve('vm-browserify'),
  },
},
};
