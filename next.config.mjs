import nextra from 'nextra'

// Em versões novas, o Nextra já procura o theme.config.tsx sozinho.
// Vamos deixar o objeto de configuração vazio para ele não reclamar de chaves desconhecidas.
const withNextra = nextra({})

export default withNextra({
  reactStrictMode: true,
})
