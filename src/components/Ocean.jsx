/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import glb from '../assets/props.glb?url'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

const Ocean = () => {
  const { nodes } = useGLTF(glb)
  const speed = useRef(2.5)
  const womanRef = useRef(null)

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
      new Vector3(5, -3.5, 20),
      new Vector3(-15, -3.6, -25),
      new Vector3(10, -3.9, 30),
    ]

    rockPositions.forEach((position) => {
      const rockClone = nodes["Rock_A"].clone()
      rockClone.position.copy(position)
      rockClones.push(rockClone)
    })

    return rockClones
  }, [nodes])

  useFrame((state,delta)=>{
    if (!womanRef.current) {
      womanRef.current = state.scene.getObjectByName("womanGroup")
      return
    }
    speed.current += delta / 20

    const scrollOcean = () => {
      nodes.sea.position.z -= delta * speed.current

      const seamPos = 40
      if (nodes.sea.position.z <= -seamPos) nodes.sea.position.z = seamPos
    }
    scrollOcean()

    const scrollRocks = () => {
      rocks.forEach(rock => {
        let respawn = false
        rock.position.z -= delta * speed.current
        
        if (rock.position.z <= -50) {
          respawn = true
        }
        else if (rock.position.z > -1.5 && rock.position.z < 0) {
          if (Math.abs(rock.position.x - womanRef.current.position.x) < 4) {
            respawn = true
            //Damage Player
            womanRef.current.actionFlag = "hurt"
          }
        }

        if (respawn) {
          //randomize rock pos
          let rand = Math.random() * 20
          rock.position.z = 20 + rand
          rand = (Math.random() - 0.5) * 20
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