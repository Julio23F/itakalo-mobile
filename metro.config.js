const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      "obj",
      "mtl",
      "JPG",
      "vrx",
      "hdr",
      "gltf",
      "glb",
      "bin",
      "arobject",
      "gif",
    ],
  },
};

const mergedConfig = mergeConfig(defaultConfig, config);
module.exports = withNativeWind(mergedConfig, { input: "./global.css" });
