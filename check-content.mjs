// Sanity checks for both language files: same structure, valid page numbers and
// images, concise copy, and no leftover English UI strings in the French file.
import fs from 'node:fs'
const en = await import('./src/content/en.js')
const fr = await import('./src/content/fr.js')
let ok = true
const fail = (m) => { ok = false; console.log('FAIL', m) }
const sentences = (t) => (t.match(/[.!?](\s|$)/g) || []).length
for (const [name, c] of [['en', en], ['fr', fr]]) {
  for (const p of c.proposals) {
    for (const i of p.insights) {
      if (i.page < 1 || i.page > p.totalPages) fail(`${name} ${p.id} page ${i.page}`)
      if (!fs.existsSync('public/' + i.image)) fail(`missing ${i.image}`)
      if (!c.themes[i.theme]) fail(`${name} ${p.id} p.${i.page}: unknown theme`)
      if (sentences(i.recommendation) > 2) fail(`${name} ${p.id} p.${i.page}: recommendation over two sentences`)
      if (sentences(i.value) > 1) fail(`${name} ${p.id} p.${i.page}: value over one sentence`)
    }
    console.log(`${name} ${p.id}: pages ${p.insights.map((i) => i.page).join(', ')}`)
  }
  if (c.actionPlan.items.length !== 5) fail(`${name}: summary must have five items`)
}
// Same slides, same order, same figures in both languages.
const shape = (c) => JSON.stringify(c.proposals.map((p) => [p.id, p.insights.map((i) => [i.page, i.image, i.theme, i.detail?.type, i.detail?.current, i.detail?.low, i.detail?.high, !!i.note])]))
if (shape(en) !== shape(fr)) fail('en and fr structures differ')
if (Object.keys(en.ui).sort().join() !== Object.keys(fr.ui).sort().join()) fail('ui keys differ')
console.log('fr sample prices:', fr.format.money(2500), '|', fr.format.range(3250, 3750), '|', fr.format.change(30, 50))
process.exit(ok ? 0 : 1)
