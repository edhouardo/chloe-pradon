import { format, ui } from '../content'

// Small supporting element pinned to the bottom of the recommendation panel.
// One per recommendation at most, and only where it makes the idea concrete.
// Price formatting comes from the content file, so it follows the site language.

const pct = (from, to) => Math.round(((to - from) / from) * 100)

// Compact revenue indicator. Percentages are computed from the figures.
function Revenue({ current, low, high, scope, condition }) {
  const range = format.range(low, high)
  return (
    <div className="rounded-[10px] bg-well px-4 py-3">
      <p className="font-medium text-muted">{ui.revenue}</p>
      <p className="nums mt-0.5 text-head font-semibold tracking-[-0.01em]">
        {current ? (
          <>
            <span className="font-normal text-muted">{format.money(current)}</span>
            <span className="mx-1.5 font-normal text-muted" aria-hidden="true">→</span>
            {range}
          </>
        ) : (
          `+${range}`
        )}
      </p>
      <p className="nums mt-4 text-[12px] leading-[1.5] text-faint">
        {current ? `${format.change(pct(current, low), pct(current, high))} ${scope}` : scope}, {condition}
      </p>
    </div>
  )
}

// Two bars drawn to the same scale: today's allowance and the efficiency target.
function Hours({ before, after }) {
  const rows = [
    { label: ui.hoursToday, value: `${before} h`, width: 100, tone: 'bg-line' },
    { label: ui.hoursTarget, value: `~${after} h`, width: (after / before) * 100, tone: 'bg-accent' },
  ]
  return (
    <div className="grid gap-2.5">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)_3rem] items-center gap-3">
          <span className="text-muted">{r.label}</span>
          <span className="h-1.5 rounded-full bg-well">
            <span className={`block h-full rounded-full ${r.tone}`} style={{ width: `${r.width}%` }} />
          </span>
          <span className="nums text-right">{r.value}</span>
        </div>
      ))}
    </div>
  )
}

const registry = { revenue: Revenue, hours: Hours }

export default function Detail({ detail }) {
  const Component = registry[detail.type]
  return Component ? <Component {...detail} /> : null
}
