/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

const Hud = ({ health, score }) => {
  const [healthState, setHealthState] = useState(100)
  const [scoreState, setScoreState] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHealthState(Math.round(health.current))
      setScoreState(Math.round(score.current))
    }, 500)

    return () => clearInterval(intervalId)
  }, [health, score])
  
  return (
    <div className="absolute top-0 left-0 w-screen flex justify-between items-center text-blue-200 bg-gradient-to-b from-black to-transparent pb-2 select-none pointer-events-none">
      <p className="m-3 text-3xl">Hull: {healthState}</p>
      <p className="m-3 text-3xl">Score: {scoreState}</p>
    </div>
  )
}

export default Hud