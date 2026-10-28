import { useCallback, useEffect, useState } from 'react'
import { proposals, ui } from './content'
import Tabs from './components/Tabs.jsx'
import Review from './components/Review.jsx'
import ActionPlan from './components/ActionPlan.jsx'

const ids = proposals.map((p) => p.id)
const PLAN = 'action-plan'
const readHash = () => (typeof location !== 'undefined' ? location.hash.slice(1) : '')
const setHash = (h) => {
  try { history.replaceState(null, '', '#' + h) } catch {}
}

export default function App() {
  const initial = readHash()
  const [activeId, setActiveId] = useState(ids.includes(initial) ? initial : ids[0])
  const [planOpen, setPlanOpen] = useState(initial === PLAN)
  // Remember the selected slide per proposal, so switching back keeps your place.
  const [slideIndex, setSlideIndex] = useState(() => Object.fromEntries(ids.map((id) => [id, 0])))

  const proposal = proposals.find((p) => p.id === activeId)
  const index = slideIndex[activeId]
  const count = proposal.insights.length

  const go = useCallback(
    (i) => setSlideIndex((s) => ({ ...s, [activeId]: Math.max(0, Math.min(count - 1, i)) })),
    [activeId, count],
  )

  const selectProposal = (id) => {
    setActiveId(id)
    setHash(id)
  }
  const openPlan = () => { setPlanOpen(true); setHash(PLAN) }
  const closePlan = useCallback(() => { setPlanOpen(false); setHash(activeId) }, [activeId])

  // Arrow keys move between slides.
  useEffect(() => {
    const onKey = (e) => {
      if (planOpen || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'ArrowRight') go(index + 1)
      if (e.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index, planOpen])

  useEffect(() => {
    const onHash = () => {
      const h = readHash()
      if (ids.includes(h)) setActiveId(h)
      setPlanOpen(h === PLAN)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className="gutter flex min-h-full flex-col">
      <header className="flex justify-center pb-5 pt-5 md:pt-6">
        <Tabs activeId={activeId} onSelect={selectProposal} />
      </header>

      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[1200px]">
          <Review proposal={proposal} index={index} onIndex={go} />
        </div>
      </main>

      <footer className="flex justify-center pb-6 pt-5">
        <button
          type="button"
          onClick={openPlan}
          className="rounded-full border border-line bg-panel px-4 py-2 font-medium text-ink transition-colors duration-150 hover:bg-well"
        >
          {ui.openPlan}
        </button>
      </footer>

      <ActionPlan open={planOpen} onClose={closePlan} />
    </div>
  )
}
