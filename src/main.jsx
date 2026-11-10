import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import Photos from './pages/Photos.jsx'
import Reserve from './pages/Reserve.jsx'

// four pages don't need a router; vercel.json rewrites these paths to index.html
const Page = { '/rsvp': Reserve, '/admin': Admin, '/photos': Photos }[location.pathname.replace(/\/$/, '')] ?? App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Page />
        <div aria-hidden className="pointer-events-none fixed -inset-[10%] z-50 grain opacity-[0.09] motion-safe:animate-[grain_1s_steps(5)_infinite]" />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
