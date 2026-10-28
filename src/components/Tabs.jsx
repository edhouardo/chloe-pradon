import { proposals, ui } from '../content'

export default function Tabs({ activeId, onSelect }) {
  return (
    <nav aria-label={ui.tabsLabel} className="inline-flex rounded-full border border-line bg-panel p-1">
      {proposals.map((p) => {
        const active = p.id === activeId
        return (
          <button
            key={p.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(p.id)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium transition-colors duration-150 ${
              active ? 'bg-well text-ink shadow-[inset_0_0_0_1px_var(--line)]' : 'text-muted hover:text-ink'
            }`}
          >
            {p.client}
          </button>
        )
      })}
    </nav>
  )
}
