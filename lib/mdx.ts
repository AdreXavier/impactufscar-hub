import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

const contentDir = path.join(process.cwd(), 'content')

export async function getMDXContent(area: string, type: string, slug: string) {
  const filePath = path.join(contentDir, area, type, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, 'utf-8')

  const { content, frontmatter } = await compileMDX<Record<string, string>>({
    source,
    options: { parseFrontmatter: true },
  })

  return { content, frontmatter }
}
