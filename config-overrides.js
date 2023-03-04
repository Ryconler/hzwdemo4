const { override, fixBabelImports, addWebpackAlias, addLessLoader, addPostcssPlugins } = require('customize-cra')

const path = require('path')
const theme = {
  '@brand-primary': '#306BFF',
  '@brand-primary-tap': '#0048FF',
  '@color-text-base': '#333333',
  '@fill-mask': 'rgba(0, 0, 0, 0.5)'
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  })
)