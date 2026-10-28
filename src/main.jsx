import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { meta } from './content'

document.documentElement.lang = meta.lang

createRoot(document.getElementById('root')).render(<App />)
