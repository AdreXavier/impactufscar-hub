const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  // Se você tiver outras configurações, coloque-as aqui dentro
  reactStrictMode: true,
})
