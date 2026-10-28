import { useState } from 'react'
import { themes, ui } from '../content'
import Detail from './Detail.jsx'

export default function RecommendationPanel({ insight }) {
  // A secondary explanation, shown in place of the detail only when asked for.
  const [noteOpen, setNoteOpen] = useState(false)
  const { note, detail } = insight

  return (
    <article aria-live="polite" className="flex flex-1 flex-col p-6 md:p-7">
      <p className="text-muted">{themes[insight.theme]}</p>
      <h2 className="mt-2 text-head font-semibold tracking-[-0.01em]">{insight.opportunity}</h2>
      <p className="mt-3 text-ink">{insight.recommendation}</p>
      <p className="mt-4">
        <span className="font-medium text-muted">{ui.value}</span>
        <span className="text-ink">{insight.value}</span>
      </p>

      {(detail || note) && (
        <div className="mt-auto pt-5">
          {noteOpen ? (
            <div key="note" className="swap-in rounded-[10px] bg-well px-4 py-2.5">
              <p className="font-medium">{note.label}</p>
              <p className="mt-0.5 text-ink">{note.text}</p>
            </div>
          ) : (
            detail && (
              <div key="detail" className="swap-in">
                <Detail detail={detail} />
              </div>
            )
          )}
          {note && (
            <button
              type="button"
              aria-expanded={noteOpen}
              onClick={() => setNoteOpen((o) => !o)}
              className="mt-3 font-medium text-accent transition-opacity duration-150 hover:opacity-70"
            >
              {noteOpen ? ui.backFromNote : note.label}
            </button>
          )}
        </div>
      )}
    </article>
  )
}
