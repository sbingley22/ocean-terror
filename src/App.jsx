import { useEffect, useState } from 'react'
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

  const [page, setPage] = useState(9)
  const [scores, setScores] = useState({lastScore: 0, highScore: 0})

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      <Navbar page={page} setPage={setPage} />

      {page===0 && <Home setPage={setPage} />}

      {page==1 && <HowToPlay setPage={setPage} />}

      {page===2 && <Results scores={scores} setPage={setPage} />}

      {page==9 && <Game isMobile={isMobile} setPage={setPage} setScores={setScores} />}

    </div>
  )
}

export default App
