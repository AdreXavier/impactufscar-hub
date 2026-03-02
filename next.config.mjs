import nextra from 'nextra'

// Removi as chaves { theme: ... } porque o Nextra novo 
// quer os valores direto, separados por vírgula.
const withNextra = nextra('nextra-theme-docs', './theme.config.tsx')

export default withNextra({
  reactStrictMode: true,
})
