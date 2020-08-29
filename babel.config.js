module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            firefox: '60',
            chrome: '70',
          },
          corejs: 3,
          useBuiltIns: 'usage',
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: {
            version: 3,
            proposals: true,
          },
          useESModules: true,
        },
      ],
      '@babel/plugin-proposal-logical-assignment-operators',
    ],
  };
};
