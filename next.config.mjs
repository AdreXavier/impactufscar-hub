import nextra from 'nextra'

// O Nextra 4 detecta o tema automaticamente se ele estiver instalado
const withNextra = nextra({
  contentDirBasePath: '/',
})

export default withNextra({
  reactStrictMode: true,
})
