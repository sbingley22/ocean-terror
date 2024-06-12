/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from '@react-three/drei'
import glb from '../assets/woman.glb?url'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

const Woman = ({ anim, touchOn, touchArea }) => {
  const { scene, nodes, animations } = useGLTF(glb)
  // eslint-disable-next-line no-unused-vars
  const { actions, mixer, names } = useAnimations(animations, scene)
  const prevAnim = useRef(null)
  const group = useRef()

  //Initail setup
  useEffect(()=>{
    console.log("Woman", nodes)

    nodes.rig.position.z = -2
    nodes.rig.position.y = -0.3

    actions[anim.current].reset().fadeIn(0.2).play()
  })

  // eslint-disable-next-line no-unused-vars
  useFrame((state,delta) => {
    const move = () => {
      if (!touchOn.current) return
      if (!group.current) return

      if (touchArea.current.y > 0.4) {
        const boatSpeed = 4
        if (touchArea.current.x < 0.5) {
          group.current.position.x -= delta * boatSpeed
        } else {
          group.current.position.x += delta * boatSpeed
        }
      }
    }
    move()

    const updateAnimation = () => {
      if (!actions) return

      if (anim.current != prevAnim.current) {
        if (prevAnim.current) actions[prevAnim.current].fadeOut(0.2)
        actions[anim.current].reset().fadeIn(0.2).play()

        prevAnim.current = anim.current
      }

    }
    updateAnimation()
  })

  return (
    <group ref={group} name="womanGroup">
      <primitive object={scene} dispose={null} />
      <pointLight intensity={1} position={[0,0.7,-1.5]} />
    </group>
  )
}

export default Woman

useGLTF.preload(glb)