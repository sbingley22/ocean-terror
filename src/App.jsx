import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Results from './components/Results'
import HowToPlay from './components/HowToPlay'
import Game from './components/Game'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handleResize = () => {
      setIsMobile(mediaQuery.matches)
      console.log("isMobile: ", mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleResize)

    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }, [])

  const [page, setPage] = useState(0)
  const [scores, setScores] = useState({lastScore: 0, highScore: 0})

  const bgmRef = useRef()
  const [muted, setMuted] = useState(null)

  //Start BGM
  useEffect(()=>{
    bgmRef.current.volume = 0.4
    if (muted) bgmRef.current.pause()
    else if (muted == false) bgmRef.current.play()
  }, [muted, bgmRef])

  useEffect(()=>{
    if (page == 0) return
    if (muted != null) return

    setMuted(false)
    
  }, [muted, page])

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      <Navbar page={page} setPage={setPage} />

      {page===0 && <Home setPage={setPage} />}

      {page==1 && <HowToPlay setPage={setPage} />}

      {page===2 && <Results scores={scores} setPage={setPage} />}

      {page==9 && <Game isMobile={isMobile} setPage={setPage} setScores={setScores} />}

      <audio ref={bgmRef} loop>
        <source src="./heavy-rain.wav" type='audio/wav' />
      </audio>

      <button 
       className='absolute bottom-0 left-0 text-slate-400 p-3 bg-slate-900 rounded-lg'
       onClick={()=>setMuted(!muted)}
      >
        {muted? "muted" : "mute"}
      </button>

    </div>
  )
}

export default App
