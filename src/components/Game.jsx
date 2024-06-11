/* eslint-disable react/prop-types */
import { useRef } from "react"

const Game = ({ isMobile, setPage, setScores }) => {
  const gameContainer = useRef()

  return (
    <div ref={gameContainer}>

    </div>
  )
}

export default Game