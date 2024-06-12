/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useAnimations } from '@react-three/drei'
import glb from '../assets/mermaid.glb?url'
import { useSkinnedMeshClone } from './SkinnedMeshClone'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Mermaid = ({ index, isMobile, touchOn, touchArea, health }) => {
  const { scene, nodes, animations } = useSkinnedMeshClone(glb)
  // eslint-disable-next-line no-unused-vars
  const { actions, names, mixer } = useAnimations(animations, scene)
  const group = useRef()
  const timer = useRef(0)
  const prevAction = useRef("idle")
  const action = useRef("idle")
  const shakeDir = useRef(1)

  // Initial Setup
  useEffect(()=>{
    console.log("Mermaid", nodes)

    action.current = "idle"
    actions["idle"].play()
    timer.current = 0
    
    nodes.Ana.material.emissive.g = 0.4
    nodes.Ana.material.emissive.b = 0
    nodes.Ana.material.emissive.r = 0

    if (group.current) {
      //debugger
      const xSpace = isMobile? 8 : 12
      group.current.position.x = (index*xSpace) -xSpace
      group.current.position.y = -3
      group.current.position.z = -16

      if (index == 0) {
        group.current.rotation.y = Math.PI / 8
      } else if (index == 1) {
        group.current.position.z = -10
      } else if (index == 2) {
        group.current.rotation.y = -Math.PI / 8
      }
    }

  }, [actions, index, isMobile, nodes])

  useFrame((state,delta)=>{
    if (timer.current == null) return
    timer.current += delta

    if (action.current == "idle") {
      if (timer.current > 2) {
        const rand = Math.random()
        if (rand < 0.01) {
          action.current = "attacking"
          group.current.position.y = -1
          timer.current = 0
        }
      }
    }
    else if (action.current == "attacking") {
      if (timer.current > 1) {
        // Damage Player
        const rotX = state.camera.rotation.x
        const rotY = state.camera.rotation.y
        const rotZ = state.camera.rotation.z

        health.current -= delta

        if (index == 0) {
          //debugger
          //console.log(rotY)
          const shakeVal = rotY + (shakeDir.current * delta * 0.1)
          state.camera.rotation.set(rotX, shakeVal, rotZ)
          if (rotY > 0.05) shakeDir.current = -1
          else if (rotY < -0.05) shakeDir.current = 1
        } else if (index == 1) {
          const shakeVal = rotZ + (shakeDir.current * delta * 0.1)
          state.camera.rotation.set(rotX, rotY, shakeVal)
          if (rotZ > 0.05) shakeDir.current = -1
          else if (rotZ < -0.05) shakeDir.current = 1
        } else if (index == 2) {
          const shakeVal = rotZ + (shakeDir.current * delta * 0.2)
          state.camera.rotation.set(rotX, rotY, shakeVal)
          if (rotZ > 0.05) shakeDir.current = -1
          else if (rotZ < -0.05) shakeDir.current = 1
        }
      }

      if (touchOn.current) {
        if (touchArea.current.y < 0.4) {
          const tx = touchArea.current.x
          let touchIndex = 0
          if (tx < 0.4) touchIndex = 0
          else if (tx < 0.6) touchIndex = 1
          else touchIndex = 2

          if (index === touchIndex) {
            // Stop attacking
            action.current = "idle"
            group.current.position.y = -3
            timer.current = 0
          }
        }
      }
    }
    
    const updateAnimation = () => {
      if (!actions) return

      if (action.current != prevAction.current) {
        if (prevAction.current) actions[prevAction.current].fadeOut(0.2)
        actions[action.current].reset().fadeIn(0.2).play()

        prevAction.current = action.current
      }

    }
    updateAnimation()

  })

  return (
    <group ref={group} name={"mermaid"+index} scale={2}>
      <primitive object={scene} />
    </group>
  )
}

export default Mermaid