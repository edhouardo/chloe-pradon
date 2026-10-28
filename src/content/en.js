// ---------------------------------------------------------------------------
// All website copy lives in this file. Components only read from it.
// English reference version. The live site uses fr.js (same shape);
// the language is chosen in src/content/index.js.
// Slide images are original PDF pages; `page` is the page number in the PDF.
// ---------------------------------------------------------------------------

export const meta = {
  lang: 'en',
  title: 'Chloé Pradon Strategic Review',
  description: 'A strategic review of two service proposals by Chloé Pradon.',
}

// Number formatting for prices (CAD).
export const format = {
  money: (n) => '$' + n.toLocaleString('en-US'),
  range: (low, high) => `$${low.toLocaleString('en-US')}–$${high.toLocaleString('en-US')}`,
  change: (low, high) => `+${low}–${high}%`,
}

export const ui = {
  tabsLabel: 'Proposals',
  page: 'Page',
  of: 'of',
  previous: 'Previous slide',
  next: 'Next slide',
  slideAlt: 'Original slide, page',
  value: 'Value: ',
  hoursToday: 'Today',
  hoursTarget: 'Target',
  revenue: 'Potential revenue',
  backFromNote: 'Back',
  openPlan: 'Summary',
  closePlan: 'Close',
}

// Short category shown above each recommendation.
export const themes = {
  tools: 'Brand tools',
  aiImplementation: 'AI Implementation',
  exploration: 'Creative exploration',
  production: 'Production',
}

const markdownNote = {
  label: 'What is this file?',
  text: 'These files are called Markdown (.md). Think of them as organized text documents that AI tools can read easily. They don’t replace the brand guide.',
}

export const proposals = [
  {
    id: 'sarah',
    client: 'Sarah Bonneau',
    totalPages: 26,
    insights: [
      {
        page: 11,
        image: 'slides/sb-11.webp',
        theme: 'tools',
        opportunity: 'End the strategy with tools, not just a document',
        recommendation:
          'Add a small activation kit: a ready-to-use brand introduction, three core messages, a simple content framework, a briefing guide for future collaborators and the AI-ready brand file. Sarah can start using her strategy the week she receives it.',
        value: 'More autonomy for Sarah, and a clear reason for a higher strategy fee.',
        detail: {
          type: 'revenue',
          current: 4000,
          low: 4750,
          high: 5250,
          scope: 'on the strategy package',
          condition: 'only with practical tools beyond the current workshops, one-pager and platform.',
        },
      },
      {
        page: 12,
        image: 'slides/sb-12.webp',
        theme: 'exploration',
        opportunity: 'Make strategic ideas tangible earlier',
        recommendation:
          'Upload the completed strategy into Claude and ask it to explore a few creative directions as moodboards, website concepts or presentation layouts. Use the strongest to brief Louis-Pier, or to show Sarah where her strategy could lead.',
        value: 'Stronger presentations and more independent creative exploration.',
      },
      {
        page: 13,
        image: 'slides/sb-13.webp',
        theme: 'production',
        opportunity: 'Build once, adapt faster',
        recommendation:
          'Both proposals include 10 hours of design adaptations. With reusable templates for carousels, slides, newsletters and banners, plus AI-assisted production, suitable assignments could move closer to five hours.',
        value: 'Better margins and more capacity, at the same quality and client price.',
        detail: { type: 'hours', before: 10, after: 5 },
      },
    ],
  },
  {
    id: 'marie-michele',
    client: 'Marie-Michèle Dugas',
    totalPages: 33,
    insights: [
      {
        page: 8,
        image: 'slides/mm-08.webp',
        theme: 'tools',
        opportunity: 'Give clients a brand they can use with AI',
        recommendation:
          'Alongside the PDF, deliver a simple text file with the brand’s positioning, personality, tone of voice and communication rules. Marie-Michèle can upload it to Claude or another AI tool to write content that follows her strategy.',
        value: 'Her strategy becomes something she can actively use, not just reference.',
        detail: {
          type: 'revenue',
          current: 2500,
          low: 3250,
          high: 3750,
          scope: 'on the strategy package',
          condition: 'if it also adds client-ready tools and a clear handoff.',
        },
        note: markdownNote,
      },
      {
        page: 9,
        image: 'slides/mm-09.webp',
        theme: 'tools',
        opportunity: 'Add a brand file to the identity package',
        recommendation:
          'Next to the brand guide and source files, include a similar text file listing approved colors, typography, logo rules and visual principles. It gives AI tools the same rules a designer would follow.',
        value: 'Everyday content stays closer to the identity, with a human eye still checking the result.',
        note: markdownNote,
      },
      {
        page: 11,
        image: 'slides/mm-11.webp',
        theme: 'aiImplementation',
        opportunity: 'Help clients put their strategy to work with AI',
        recommendation:
          'Offer a hands-on session showing clients how to set up their brand strategy in Claude or another AI tool. Once their positioning, personality, and tone of voice are integrated, they can use AI to develop taglines, messaging, LinkedIn posts, newsletters, and other written content rooted in their strategy.',
        value: 'Clients become more autonomous in their communications while keeping their brand consistent.',
        detail: {
          type: 'revenue',
          low: 300,
          high: 600,
          scope: 'Per optional session',
          condition: 'depending on scope.',
        },
        note: {
          label: 'Brand files vs. this session',
          text: 'The files hold the strategy. The session shows clients how to set them up in Claude and write prompts for on-brand copy. Language only, not visuals.',
        },
      },
    ],
  },
]

export const actionPlan = {
  title: 'Summary',
  items: [
    { title: 'Deliver usable brand tools', text: 'Add AI-ready strategy and identity files, plus practical activation tools.' },
    { title: 'Offer AI implementation', text: 'Teach clients to set up their strategy in Claude and write brand-aligned content.' },
    { title: 'Visualize strategy', text: 'Use Claude to explore and communicate creative directions.' },
    { title: 'Improve production efficiency', text: 'Help creative collaborators build reusable digital systems.' },
    { title: 'Price for added value', text: 'Raise strategy fees only when clients receive new tools and guidance.' },
  ],
  closing: 'The opportunity isn’t to do more work. It’s to make your thinking go further.',
}
