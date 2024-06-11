/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from '@react-three/drei'
import glb from '../assets/woman.glb?url'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

const Woman = ({ anim }) => {
  const { scene, nodes, animations } = useGLTF(glb)
  const { actions, mixer, names } = useAnimations(animations, scene)
  const prevAnim = useRef(null)

  //Initail setup
  useEffect(()=>{
    console.log("Woman", nodes)

    nodes.rig.position.z = -2
    nodes.rig.position.y = -0.3

    actions[anim.current].reset().fadeIn(0.2).play()
  })

  useFrame((state,delta) => {

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
    <>
      <primitive object={scene} dispose={null} />
      <pointLight intensity={1} position={[0,0.7,-1.5]} />
    </>
  )
}

export default Woman

useGLTF.preload(glb)