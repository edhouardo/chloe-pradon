import { useEffect, useRef } from 'react'
import { actionPlan, ui } from '../content'

export default function ActionPlan({ open, onClose }) {
  const closeRef = useRef(null)
  const returnFocus = useRef(null)

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      returnFocus.current?.focus?.()
    }
  }, [open, onClose])

  return (
    <div
      className={`overlay fixed inset-0 z-50 flex items-center justify-center bg-ink/20 p-4 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      onClick={onClose}
      aria-hidden={!open}
      style={{
        paddingTop: 'max(16px, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-title"
        onClick={(e) => e.stopPropagation()}
        className={`sheet max-h-full w-full max-w-[520px] overflow-auto rounded-[16px] border border-line bg-panel p-6 md:p-7 ${
          open ? 'translate-y-0 scale-100' : 'translate-y-1 scale-[0.99]'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="plan-title" className="text-head font-semibold tracking-[-0.01em]">{actionPlan.title}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="rounded-full border border-line px-3 py-1 text-muted transition-colors duration-150 hover:text-ink"
          >
            {ui.closePlan}
          </button>
        </div>

        <ol className="mt-5 divide-y divide-line border-y border-line">
          {actionPlan.items.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2 py-3.5">
              <span className="nums text-muted">{i + 1}</span>
              <p>
                <span className="font-semibold">{item.title}</span> <span className="text-muted">— {item.text}</span>
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-head font-medium tracking-[-0.01em]">{actionPlan.closing}</p>
      </div>
    </div>
  )
}
