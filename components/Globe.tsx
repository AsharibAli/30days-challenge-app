"use client"
import { useRef, useMemo, useState, useCallback, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Sphere, Instances, Instance, Text, Html } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'
import { Mesh, InstancedMesh } from 'three'
import { Button } from '@/components/ui/button'

const GLOBE_RADIUS = 2
const POINT_RADIUS = 0.03
const NUM_POINTS = 30
const BUTTON_DISPLAY_DURATION = 3000 // 3 seconds in milliseconds

export default function Globe() {
  const router = useRouter()
  const globeRef = useRef<Mesh>(null)
  const pointsRef = useRef<InstancedMesh>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const [isRotating, setIsRotating] = useState(true)
  const { size } = useThree()

  const pointPositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < NUM_POINTS; i++) {
      const phi = Math.acos(-1 + (2 * i) / NUM_POINTS)
      const theta = Math.sqrt(NUM_POINTS * Math.PI) * phi
      const x = GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi)
      const y = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi)
      const z = GLOBE_RADIUS * Math.cos(phi)
      positions.push(new THREE.Vector3(x, y, z))
    }
    return positions
  }, [])

  useFrame((state) => {
    if (isRotating) {
      const t = state.clock.getElapsedTime()
      globeRef.current!.rotation.y = t * 0.1
      pointsRef.current!.rotation.y = t * 0.1
    }
  })

  const handlePointHover = useCallback((index: number | null) => {
    setHoverIndex(index)
    setIsRotating(index === null && clickedIndex === null)
  }, [clickedIndex])

  const handlePointClick = useCallback((index: number) => {
    setClickedIndex(index)
    setIsRotating(false)

    // Set a timeout to clear the clicked state after 3 seconds
    setTimeout(() => {
      setClickedIndex(null)
      setIsRotating(true)
    }, BUTTON_DISPLAY_DURATION)
  }, [])

  const navigateToDay = useCallback((index: number) => {
    router.push(`/day-${index + 1}`)
  }, [router])

  useEffect(() => {
    if (clickedIndex !== null) {
      const timer = setTimeout(() => {
        setClickedIndex(null)
        setIsRotating(true)
      }, BUTTON_DISPLAY_DURATION)

      return () => clearTimeout(timer)
    }
  }, [clickedIndex])

  return (
    <group scale={[0.9, 0.9, 0.9]}>
      <Sphere ref={globeRef} args={[GLOBE_RADIUS, 64, 64]}>
        <meshStandardMaterial color="#ffffff" wireframe />
      </Sphere>
      <Instances limit={NUM_POINTS} ref={pointsRef}>
        <sphereGeometry args={[POINT_RADIUS, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
        {pointPositions.map((position, index) => (
          <group key={index}>
            <Instance
              position={position}
              onClick={() => handlePointClick(index)}
              onPointerOver={() => handlePointHover(index)}
              onPointerOut={() => handlePointHover(null)}
            />
            <Text
              position={[position.x * 1.1, position.y * 1.1, position.z * 1.1]}
              fontSize={0.1}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {`Day ${index + 1}`}
            </Text>
            {(hoverIndex === index || clickedIndex === index) && (
              <Html position={[position.x * 1.2, position.y * 1.2, position.z * 1.2]}>
                <Button
                  onClick={() => navigateToDay(index)}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  Go to Day {index + 1}
                </Button>
              </Html>
            )}
          </group>
        ))}
      </Instances>
    </group>
  )
}