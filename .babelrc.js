// .babelrc.js
module.exports = {
  presets: [['next/babel', { 'preset-react': { runtime: 'automatic' } }]],
  plugins: [
    // ['styled-components', { ssr: true, displayName: true }],
    'babel-plugin-macros',
    ['babel-plugin-styled-components', { ssr: true }],
  ],
};