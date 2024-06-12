/* eslint-disable react/prop-types */
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef } from "react"
import Woman from "./Woman"
import { Environment } from "@react-three/drei"
import Ocean from "./Ocean"
import Mermaid from "./Mermaid"
import Hud from "./Hud"

const Game = ({ isMobile, setPage, setScores }) => {
  const gameContainer = useRef()
  const animWoman = useRef("row")
  const touchArea = useRef({x:0, y:0})
  const touchOn = useRef(false)
  const health = useRef(100)
  const score = useRef(0)

  //Click Listener
  useEffect(()=>{
    const clicked = (e) => {
      if (!gameContainer.current) return

      const rect = gameContainer.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
  
      setArea(x,y)
    }

    const touched = (e) => {
      e.preventDefault()
      const touch = e.targetTouches[0]
      if (!gameContainer.current || !touch) return
  
      const rect = gameContainer.current.getBoundingClientRect()
      const x = (touch.clientX - rect.left) / rect.width
      const y = (touch.clientY - rect.top) / rect.height
      setArea(x,y)
    }

    const setArea = (x,y) => {
      touchArea.current = { x: Math.min(Math.max(x, 0), 1), y: Math.min(Math.max(y, 0), 1) }
      touchOn.current = true
      //console.log("touch", touchArea.current)
    }

    const released = () => {
      touchOn.current = false
    }

    window.addEventListener("mousedown", clicked)
    window.addEventListener("mouseup", released)
    window.addEventListener("touchstart", touched)
    window.addEventListener("touchend", released)

    return () => {
      window.removeEventListener("mousedown", clicked)
      window.removeEventListener("mouseup", released)
      window.removeEventListener("touchstart", touched)
      window.removeEventListener("touchend", released)
    }

  },[])

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(rgba(22,44,66,1), rgba(22,44,66,0))",
    overflow: "hidden",
    touchAction: "none",
  }
  return (
    <div ref={gameContainer} style={containerStyle}>
      <Canvas camera={{position: [0,8,8]}} dpr={isMobile?0.6:1}>
        <Suspense>

          <Environment preset="night" environmentIntensity={1} />

          <Ocean />

          <Woman anim={animWoman} touchOn={touchOn} touchArea={touchArea} health={health} score={score} setPage={setPage} setScores={setScores} />

          <Mermaid index={0} isMobile={isMobile} touchOn={touchOn} touchArea={touchArea} health={health} />
          <Mermaid index={1} isMobile={isMobile} touchOn={touchOn} touchArea={touchArea} health={health} />
          <Mermaid index={2} isMobile={isMobile} touchOn={touchOn} touchArea={touchArea} health={health} />

        </Suspense>
      </Canvas>

      <Hud health={health} score={score} />
    </div>
  )
}

export default Game