// Small animation layer: CSS keyframes driven by React keys.
// All motion lives here and in styles.css (150–250ms, reduced motion honored),
// so it can be swapped for Motion (motion.dev) without touching other components.

// Re-mounts its children when `swapKey` changes, playing a short fade.
export function Swap({ swapKey, className = '', children }) {
  return (
    <div key={swapKey} className={`swap-in ${className}`}>
      {children}
    </div>
  )
}
