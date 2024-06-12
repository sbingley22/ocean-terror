/* eslint-disable react/no-unknown-property */
import { useAnimations } from '@react-three/drei'
import glb from '../assets/mermaid.glb?url'
import { useSkinnedMeshClone } from './SkinnedMeshClone'
import { useEffect, useRef } from 'react'

const Mermaid = ({ index }) => {
  const { scene, nodes, animations } = useSkinnedMeshClone(glb)
  const { actions, names, mixer } = useAnimations(animations, scene)
  const group = useRef()

  // Initial Setup
  useEffect(()=>{
    console.log("Mermaid", nodes)

    actions["idle"].play()

    // nodes.Ana.material.color.g = 4
    // nodes.Ana.material.color.b = 1
    // nodes.Ana.material.color.r = 1
    
    nodes.Ana.material.emissive.g = 0.4
    nodes.Ana.material.emissive.b = 0
    nodes.Ana.material.emissive.r = 0

    if (group.current) {
      //debugger
      group.current.position.x = (index*8) -8
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

  }, [actions, index, nodes])

  return (
    <group ref={group} name={"mermaid"+index} scale={2}>
      <primitive object={scene} />
      {/* <pointLight intensity={1} position={[0,2,-1]} /> */}
    </group>
  )
}

export default Mermaid