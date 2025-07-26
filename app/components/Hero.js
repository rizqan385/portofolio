'use client'

import React, { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import EarthCanvas from './EarthCanvas'
import Typewriter from 'typewriter-effect'

export default function Hero() {
  const [highlight, setHighlight] = useState(false)
  const timeoutRef = useRef(null)

  const showHighlight = () => {
    setHighlight(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setHighlight(false)
      timeoutRef.current = null
    }, 1500)
  }

  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden font-mono">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <div className="relative inline-block">
          {highlight && (
            <span className="absolute inset-0 bg-white/10 rounded-md transition-all duration-500"></span>
          )}
          <h1 className="text-3xl sm:text-5xl font-bold relative px-4 py-2 z-10 whitespace-nowrap">
            <Typewriter
              options={{
                strings: [],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: -50,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Hi, I'm Rizqan")
                  .pauseFor(2000)
                  .callFunction(showHighlight)
                  .pauseFor(2000)
                  .deleteAll()
                  .typeString("Creative Coder")
                  .pauseFor(2000)
                  .callFunction(showHighlight)
                  .pauseFor(2000)
                  .deleteAll()
                  .typeString("Space Explorer")
                  .pauseFor(2000)
                  .callFunction(showHighlight)
                  .pauseFor(1500)
                  .deleteAll()
                  .start()  // start di akhir chaining
              }}
            />
          </h1>
        </div>
        <p className="text-gray-400 text-sm sm:text-lg mt-4">
          Front-End Developer passionate about performance and design.
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <group position={[0, -0.5, 0]} scale={1}>
            <EarthCanvas />
          </group>
        </Suspense>
      </Canvas>
    </section>
  )
}
