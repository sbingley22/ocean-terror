/* eslint-disable react/prop-types */
import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import Woman from "./Woman"
import { Environment } from "@react-three/drei"
import Ocean from "./Ocean"
import Mermaid from "./Mermaid"

const Game = ({ isMobile, setPage, setScores }) => {
  const gameContainer = useRef()
  const animWoman = useRef("row")

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(rgba(22,44,66,1), rgba(22,44,66,0))"
  }
  return (
    <div ref={gameContainer} style={containerStyle}>
      <Canvas camera={{position: [0,8,8]}}>
        <Suspense>

          <Environment preset="night" environmentIntensity={1} />

          <Ocean />

          <Woman anim={animWoman} />

          <Mermaid index={0} />
          <Mermaid index={1} />
          <Mermaid index={2} />

        </Suspense>
      </Canvas>
    </div>
  )
}

export default Game