'use client'

import { useState } from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Globe from './Globe'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const [showGlobe, setShowGlobe] = useState(false)

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <div className={`transition-opacity duration-1000 ${showGlobe ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'} z-10 flex flex-col items-center`}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          30 Days of 30 Projects
        </h1>
        <p className="text-xl text-gray-300 mb-3 text-center max-w-2xl px-4">
        Build 30 exciting projects in 30 days using latest tech-stack
        </p>
        <Button 
          className="mt-8 bg-white text-black" 
          variant="outline"
          onClick={() => setShowGlobe(true)}
        >
          Begin Your Journey
        </Button>
      </div>
      
      <div className={`w-full h-full absolute inset-0 transition-opacity duration-1000 ${showGlobe ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Globe />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}