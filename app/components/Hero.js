'use client'

import React, { useState, useRef } from 'react'
import Typewriter from 'typewriter-effect'
import Image from 'next/image'

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
    <section
      className="relative w-full h-screen text-white font-mono overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/cosmo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay grid optional (hapus kalau mau full clean image) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Glows */} 
      <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl opacity-40 animate-pulseSlow z-10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl opacity-40 animate-pulseSlow z-10" />

      {/* Main Content */}
      <div className="z-20 max-w-7xl w-full px-6 md:px-10 flex flex-col md:flex-row items-center justify-between">
        {/* Text kiri */}
        <div className="text-center md:text-left max-w-xl">
          <div className="relative inline-block">
            {highlight && (
              <span className="absolute inset-0 bg-white/10 rounded-md transition-all duration-500" />
            )}
            <h1 className="text-3xl sm:text-5xl font-bold relative px-4 py-2 z-10 whitespace-nowrap">
              <Typewriter
                options={{
                  strings: [],
                  autoStart: true,
                  loop: true,
                  delay: 150,
                  deleteSpeed: 70,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Hi, I'm Rizqan")
                    .pauseFor(2000)
                    .callFunction(showHighlight)
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString('Creative Coder')
                    .pauseFor(2000)
                    .callFunction(showHighlight)
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString('Space Explorer')
                    .pauseFor(2000)
                    .callFunction(showHighlight)
                    .pauseFor(1500)
                    .deleteAll()
                    .start()
                }}
              />
            </h1>
          </div>

          <p className="text-gray-300 text-sm sm:text-lg mt-4">
            Front-End Developer passionate about performance and design.
          </p>
        </div>

        {/* GIF kanan */}
        <div className="mt-10 md:mt-0 md:ml-10">
          <div className="w-[280px] h-[280px] overflow-hidden">
            <Image
              src="/assets/character.gif"
              alt="Animated Rizqan"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

     
    </section>
  )
}
