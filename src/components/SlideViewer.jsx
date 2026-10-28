import { ui } from '../content'

const Arrow = ({ dir }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <path
      d={dir === 'left' ? 'M8.5 3 4.5 7l4 4' : 'm5.5 3 4 4-4 4'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const navButton =
  'grid size-8 place-items-center rounded-full border border-line text-ink transition-colors duration-150 hover:bg-well disabled:text-line disabled:hover:bg-transparent'

export default function SlideViewer({ proposal, index, onIndex }) {
  const { insights, totalPages } = proposal
  const current = insights[index]

  return (
    <section className="flex min-w-0 flex-col rounded-[14px] border border-line bg-panel p-3">
      {/* All slides of the proposal are stacked, so switching is an instant crossfade. */}
      <div className="flex flex-1 items-center rounded-[8px] bg-well">
      <div className="relative aspect-[16/9] w-full max-w-full overflow-hidden rounded-[8px] bg-well">
        {insights.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            alt={`${ui.slideAlt} ${s.page}`}
            width="1920"
            height="1080"
            decoding="async"
            aria-hidden={i !== index}
            className="slide-layer absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>
      </div>

      <div className=" flex items-center justify-between gap-3 px-1 pt-3">
        <span className="nums text-muted">
          {ui.page} {current.page} {ui.of} {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <span className="nums mr-1 text-muted">
            {index + 1} / {insights.length}
          </span>
          <button type="button" onClick={() => onIndex(index - 1)} disabled={index === 0} aria-label={ui.previous} className={navButton}>
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            onClick={() => onIndex(index + 1)}
            disabled={index === insights.length - 1}
            aria-label={ui.next}
            className={navButton}
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>
    </section>
  )
}
