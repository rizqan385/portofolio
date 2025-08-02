'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
} from 'react-icons/fa'
import Image from 'next/image'
import Typewriter from 'typewriter-effect'
import gsap from 'gsap'

const techIcons = [
  { icon: <FaHtml5 className="text-orange-500" />, angle: 0 },
  { icon: <FaCss3Alt className="text-blue-500" />, angle: 60 },
  { icon: <FaJs className="text-yellow-400" />, angle: 120 },
  { icon: <FaReact className="text-cyan-400" />, angle: 180 },
  { icon: <FaNodeJs className="text-green-500" />, angle: 240 },
  { icon: <FaGithub className="text-white" />, angle: 300 },
]

export default function Hero() {
  const [radius, setRadius] = useState(140)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const imageRef = useRef(null)
  const iconRefs = useRef([])

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 80 : 140)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // GSAP animation on load
  useEffect(() => {
    gsap.from(titleRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
    gsap.from(subtitleRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    })
    gsap.from(descRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out',
    })
    gsap.from(imageRef.current, {
      scale: 0,
      opacity: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.6)',
      delay: 0.5,
    })
    gsap.from(iconRefs.current, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.2,
      delay: 1.1,
    })
  }, [])

  return (
    <section
      className="relative w-full min-h-screen bg-black text-white flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-6 md:px-20 py-20 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/cosmo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Glow efek */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl opacity-20 animate-pulseSlow" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl opacity-20 animate-pulseSlow" />

      {/* TEKS */}
      <div className="z-10 text-center md:text-left md:max-w-lg mt-10 md:mt-0">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Hi, I'm Rizqan
        </h1>
        <div
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 h-16"
        >
          <Typewriter
            options={{
              strings: ['Front-End Developer', 'UI Designer', 'Tech Explorer'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <p
          ref={descRef}
          className="mt-4 text-gray-400 max-w-md mx-auto md:mx-0"
        >
          Passionate in building cosmic user experiences with modern web technologies.
        </p>
      </div>

      {/* PROFILE + ICON */}
      <div
        ref={imageRef}
        className="relative w-[240px] h-[240px] md:w-[360px] md:h-[360px] flex items-center justify-center mb-12 md:mb-0 z-10"
      >
        {/* ICON ROTATING */}
        <motion.div
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear',
          }}
        >
          <div className="relative w-[240px] h-[240px] md:w-[360px] md:h-[360px]">
            {techIcons.map((item, index) => {
              const angleInRad = (item.angle * Math.PI) / 180
              const x = radius * Math.cos(angleInRad)
              const y = radius * Math.sin(angleInRad)

              return (
                <div
                  key={index}
                  ref={(el) => (iconRefs.current[index] = el)}
                  className="absolute flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-black border-2 border-white shadow-lg"
                  style={{
                    left: `calc(50% + ${x}px - 1.25rem)`,
                    top: `calc(50% + ${y}px - 1.25rem)`,
                  }}
                >
                  <div className="text-lg md:text-2xl">{item.icon}</div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* PROFILE IMAGE */}
        <div className="relative w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden border-4 border-white shadow-2xl z-20 bg-black">
          <Image
            src="/assets/profile.jpg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Custom animasi */}
      <style jsx>{`
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulseSlow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
