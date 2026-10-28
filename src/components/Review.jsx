import { Swap } from '../lib/motion.jsx'
import SlideViewer from './SlideViewer.jsx'
import RecommendationPanel from './RecommendationPanel.jsx'

// One row, two panels of equal height. From 1280px the slide sets the height;
// between 1024 and 1279px a fixed row height keeps the panels steady and the
// slide sits centered on its stage. Either way the panel never resizes between slides.
export default function Review({ proposal, index, onIndex }) {
  return (
    <div className="grid items-stretch gap-3 lg:auto-rows-[minmax(564px,auto)] xl:auto-rows-[minmax(424px,auto)] lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
      <SlideViewer proposal={proposal} index={index} onIndex={onIndex} />
      <section className="flex min-h-[340px] min-w-0 flex-col rounded-[14px] border border-line bg-panel">
        <Swap swapKey={proposal.id + index} className="flex flex-1 flex-col">
          <RecommendationPanel insight={proposal.insights[index]} />
        </Swap>
      </section>
    </div>
  )
}
