'use client';

import { useEffect, useRef } from 'react';
import { FaWhatsapp, FaDiscord, FaGithub, FaInstagram } from 'react-icons/fa';
import { gsap } from 'gsap';

export default function Contact() {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {
    // Animate title and form
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from(formRef.current, {
      opacity: 0,
      y: 60,
      delay: 0.3,
      duration: 1,
      ease: 'power3.out',
    });

    // Animate icons
    gsap.from(iconsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
      delay: 0.8,
    });
  }, []);

  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-[#121212] text-gray-300 min-h-screen overflow-hidden"
    >
      {/* Glowing Effects */}
      <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl animate-pulse"></div>
          <div
            className="absolute top-10 left-10 w-32 h-32 rounded-full bg-green-500 opacity-15 blur-2xl animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-full h-full">
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-green-500 opacity-20 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-500 opacity-15 blur-2xl animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Let&apos;s <span className="text-pink-400">Connect</span>
        </h2>

        <form
          ref={formRef}
          className="space-y-6 bg-[#1e1e1e]/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full p-4 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-500 hover:shadow-lg hover:shadow-pink-500/20"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Social Icons */}
      <div className="mt-12 flex justify-center gap-6 z-10 relative">
        {[
          {
            href: 'https://wa.me/6289513270487',
            icon: <FaWhatsapp size={20} />,
            color: 'bg-green-500 hover:bg-green-600',
            glow: 'bg-green-500',
          },
          {
            href: 'https://discord.gg/BV3nG5TS',
            icon: <FaDiscord size={20} />,
            color: 'bg-[#5865F2] hover:bg-[#4752c4]',
            glow: 'bg-[#5865F2]',
          },
          {
            href: 'https://github.com/rizqan385',
            icon: <FaGithub size={20} />,
            color: 'bg-gray-700 hover:bg-gray-800',
            glow: 'bg-gray-700',
          },
          {
            href: 'https://instagram.com/rizqanahmd',
            icon: <FaInstagram size={20} />,
            color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
            glow: 'bg-gradient-to-r from-purple-500 to-pink-500',
          },
        ].map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (iconsRef.current[index] = el)}
            className="relative group"
          >
            <div
              className={`absolute -inset-1 ${social.glow} rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-200 animate-pulse`}
            ></div>
            <div
              className={`relative p-3 ${social.color} rounded-full text-white transition-all`}
            >
              {social.icon}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
