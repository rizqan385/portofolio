'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaFigma,
  FaPython,
} from 'react-icons/fa'

export default function Skills() {
  const containerRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrame
    const scrollAmount = 0.5

    const scroll = () => {
      if (!isPaused) {
        container.scrollLeft += scrollAmount
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0
        }
      }
      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationFrame)
  }, [isPaused])

  const skills = [
    { icon: <FaHtml5 />, color: 'bg-orange-500', hover: 'group-hover:bg-orange-500', label: 'HTML5' },
    { icon: <FaCss3Alt />, color: 'bg-blue-500', hover: 'group-hover:bg-blue-500', label: 'CSS3' },
    { icon: <FaJs />, color: 'bg-yellow-400 text-black', hover: 'group-hover:bg-yellow-400 group-hover:text-black', label: 'JavaScript' },
    { icon: <FaReact />, color: 'bg-cyan-400', hover: 'group-hover:bg-cyan-400', label: 'React.js' },
    { icon: <FaNodeJs />, color: 'bg-green-500', hover: 'group-hover:bg-green-500', label: 'Node.js' },
    { icon: <FaGithub />, color: 'bg-white text-black', hover: 'group-hover:bg-white group-hover:text-black', label: 'GitHub' },
    { icon: <FaFigma />, color: 'bg-pink-500', hover: 'group-hover:bg-pink-500', label: 'Figma' },
    { icon: <FaPython />, color: 'bg-blue-300 text-black', hover: 'group-hover:bg-blue-300 group-hover:text-black', label: 'Python' },
  ]

  const extendedSkills = [...skills, ...skills, ...skills]

  return (
    <section id="skills" className="relative py-16 px-4 bg-[#0a0a23] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex justify-center items-center mb-10 relative">
          <h2 className="text-3xl font-bold text-center">My Skill</h2>
          <img
            src="/textures/cat.gif"
            alt="Cat"
            className="ml-4 w-16 h-16 md:w-30 md:h-30 object-contain"
          />
        </div>

        {/* Scrolling Skill Icons */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto whitespace-nowrap gap-4 md:gap-6 py-4 scroll-smooth flex-nowrap hide-scrollbar"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {extendedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-[110px] md:min-w-[150px] h-[110px] md:h-[150px] flex items-center justify-center rounded-xl transition duration-300 hover:scale-110 cursor-pointer group bg-[#1c1c3a]"
            >
              <div
                className={`w-full h-full flex flex-col items-center justify-center rounded-xl p-2 md:p-4 transition duration-300 ${skill.hover}`}
              >
                <div className="text-3xl md:text-5xl mb-2">{skill.icon}</div>
                <p className="text-xs md:text-sm text-center">{skill.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
