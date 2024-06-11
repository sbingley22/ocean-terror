/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import glb from '../assets/props.glb?url'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

const Ocean = () => {
  const { nodes } = useGLTF(glb)
  const speed = useRef(2.5)

  // Initial setup
  useEffect(()=>{
    console.log("Props", nodes)

    nodes.sea.material.map.repeat.x = 5
    nodes.sea.material.map.repeat.y = 10

    //nodes["Rock_A"].scale.multiplyScalar(0.3)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // Generate rock clones and positions
  const rocks = useMemo(() => {
    const rockClones = []
    const rockPositions = [
      new Vector3(5, -3, 20),
      new Vector3(-15, -3.1, -25),
      new Vector3(10, -2.9, 30),
    ]

    rockPositions.forEach((position) => {
      const rockClone = nodes["Rock_A"].clone()
      rockClone.position.copy(position)
      rockClones.push(rockClone)
    })

    return rockClones
  }, [nodes])

  useFrame((state,delta)=>{
    const scrollOcean = () => {
      nodes.sea.position.z -= delta * speed.current

      const seamPos = 40
      if (nodes.sea.position.z <= -seamPos) nodes.sea.position.z = seamPos
    }
    scrollOcean()

    const scrollRocks = () => {
      rocks.forEach(rock => {
        rock.position.z -= delta * speed.current
        if (rock.position.z <= -40) {
          //randomize rock pos
          let rand = Math.random() * 20
          rock.position.z = 20 + rand
          rand = (Math.random() - 0.5) * 15
          rock.position.x = rand
        }
      })
    }
    scrollRocks()

  })

  return (
    <>
      <primitive object={nodes.sea} scale={10} />
      {rocks.map((rock, index) => (
        <primitive key={index} object={rock} />
      ))}
    </>
  )
}

export default Ocean

useGLTF.preload(glb)