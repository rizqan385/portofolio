'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen py-28 px-4 sm:px-6 md:px-12 lg:px-24 bg-black text-cyan-200 font-mono overflow-hidden"
    >
      {/* 🌌 Milky Way Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/textures/stars_milky_way.jpg')"
          }}
        ></div>
      </div>

      {/* 💫 Blurred Nebula Lights */}
      <div className="absolute -top-40 -left-40 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-[#00fff2] rounded-full blur-[120px] opacity-30 animate-pulse z-10" />
      <div className="absolute top-[50%] right-[-200px] w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] bg-[#a855f7] rounded-full blur-[130px] opacity-25 animate-pulse delay-1000 z-10" />

      {/* 🌟 Vertical Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90 z-20" />

      {/* 📄 Main Content */}
      <div className="relative z-30 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl mb-8 text-cyan-300 tracking-wider"
        >
          {`> about()`}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-300 leading-relaxed mb-16 max-w-3xl mx-auto px-2"
        >
          👨‍🚀 I'm <span className="text-white font-semibold">Rizqan</span>, a passionate explorer of futuristic UI/UX.
          I build immersive websites with <span className="text-pink-400">React</span>, <span className="text-blue-400">Tailwind</span>, and <span className="text-purple-400">Next.js</span>.
          Let’s code through the cosmos together!
        </motion.p>

        {/* 🚀 Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-[#0d0d0d] border border-cyan-500 p-4 sm:p-6 rounded-xl mb-12 shadow-[0_0_50px_#00ffd5aa] text-left"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-300">🚀 Experience Log</h3>
          <div className="bg-[#111] p-3 sm:p-4 rounded-lg text-green-300 font-mono text-xs sm:text-sm leading-6 overflow-x-auto">
            <pre>
              <code>
{`const topAchievements = [
  "🏆 Top 5 Lomba Website Nasional",
  "💻 Front-End Developer - Ciptadra Softindo",
];

for (const exp of topAchievements) {
  console.log(exp);
}`}</code>
            </pre>
          </div>
        </motion.div>

        {/* 🎓 Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#0d0d0d] border border-purple-500 p-4 sm:p-6 rounded-xl shadow-[0_0_50px_#c084fc66] text-left"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-purple-300">🎓 Education Log</h3>
          <div className="bg-[#111] p-3 sm:p-4 rounded-lg text-purple-300 font-mono text-xs sm:text-sm leading-6 overflow-x-auto">
            <pre>
              <code>
{`const educationLog = [
  "📘 SMK YAJ Depok - RPL (2023-Present)",
];

for (const school of educationLog) {
  console.log(school);
}`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
