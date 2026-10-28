// Offline build: esbuild bundles React, Tailwind v4 compiles the CSS from class
// names found in src/. Output: dist/index.html (+ dist/slides/*.webp).
// Usage: node build.mjs   (set TOOLS to the node_modules folder holding
// esbuild, tailwindcss, react and react-dom; defaults to ./node_modules)
import fs from 'node:fs'
import path from 'node:path'

const TOOLS = process.env.TOOLS || path.resolve('node_modules')
const { build, transform } = await import(path.join(TOOLS, 'esbuild/lib/main.js'))
const { compile } = await import(path.join(TOOLS, 'tailwindcss/dist/lib.mjs'))

const root = path.dirname(new URL(import.meta.url).pathname)
const src = path.join(root, 'src')
const dist = path.join(root, 'dist')

// 1. JavaScript
const js = await build({
  entryPoints: [path.join(src, 'main.jsx')],
  bundle: true,
  minify: true,
  write: false,
  format: 'iife',
  jsx: 'automatic',
  target: 'es2020',
  nodePaths: [TOOLS],
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
})
const jsCode = js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script')

// 2. CSS: collect candidate class names from every source file.
const files = []
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const p = path.join(d, e.name)
  e.isDirectory() ? walk(p) : /\.(jsx?|css)$/.test(e.name) && files.push(p)
})
walk(src)
const candidates = new Set()
for (const f of files) for (const m of fs.readFileSync(f, 'utf8').matchAll(/[^\s"'`]+/g)) candidates.add(m[0])
const twBase = path.join(TOOLS, 'tailwindcss')
const compiler = await compile(fs.readFileSync(path.join(src, 'styles.css'), 'utf8'), {
  base: src,
  loadStylesheet: async (id) => {
    const p = id === 'tailwindcss' ? path.join(twBase, 'index.css') : path.join(twBase, id.replace(/^tailwindcss\//, ''))
    return { path: p, base: twBase, content: fs.readFileSync(p, 'utf8') }
  },
})
const css = (await transform(compiler.build([...candidates]), { loader: 'css', minify: true })).code

// 3. HTML (flat: the artifact host adds doctype, html, head and body).
const fonts = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
const { meta } = await import(path.join(src, 'content/index.js'))
const html = `<title>${meta.title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="${meta.description}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fonts}">
<style>${css}</style>
<div id="root"></div>
<script>${jsCode}</script>
`
// Only the slides referenced by the content ship.
const { proposals } = await import(path.join(src, 'content/index.js'))
const usedSlides = [...new Set(proposals.flatMap((p) => p.insights.map((i) => i.image)))]

const writeSite = (dir, page) => {
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(path.join(dir, 'slides'), { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), page)
  for (const img of usedSlides) fs.copyFileSync(path.join(root, 'public', img), path.join(dir, img))
}

// dist/: flat page for the claude.ai artifact (the host adds the document skeleton).
writeSite(dist, html)

// deploy/: standalone static site for Vercel (full HTML document + config, no build step).
const deploy = path.join(root, 'deploy')
const doc = `<!doctype html>
<html lang="${meta.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${html.slice(0, html.indexOf('<div id="root">')).replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')}<meta name="theme-color" content="#f5f5f5">
<link rel="icon" href="data:,">
</head>
<body>
<div id="root"></div>
<script>${jsCode}</script>
</body>
</html>
`
writeSite(deploy, doc)
fs.writeFileSync(
  path.join(deploy, 'vercel.json'),
  JSON.stringify(
    {
      $schema: 'https://openapi.vercel.sh/vercel.json',
      cleanUrls: true,
      headers: [{ source: '/slides/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }] }],
    },
    null,
    2,
  ) + '\n',
)
console.log(`dist/ and deploy/ written: index ${(html.length / 1024).toFixed(0)} KB, css ${(css.length / 1024).toFixed(0)} KB, ${usedSlides.length} slides`)
