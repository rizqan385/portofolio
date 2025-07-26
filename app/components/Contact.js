'use client';

import { FaWhatsapp, FaDiscord, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-[#121212] text-gray-300 min-h-screen overflow-hidden"
    >
      {/* Glowing Corner - Top Left */}
      <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl animate-pulse"></div>
          <div
            className="absolute top-10 left-10 w-32 h-32 rounded-full bg-green-500 opacity-15 blur-2xl animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>

      {/* Glowing Corner - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-full h-full">
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-green-500 opacity-20 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-500 opacity-15 blur-2xl animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Let&apos;s <span className="text-pink-400">Connect</span>
        </h2>

        <form className="space-y-6 bg-[#1e1e1e]/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                required
              />
            </div>
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-4 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-500 hover:shadow-lg hover:shadow-pink-500/20"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Social Icons */}
      <div className="mt-12 flex justify-center gap-6 z-10">
        <a
          href="https://wa.me/089513270487"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <div className="absolute -inset-1 bg-green-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-200 animate-pulse"></div>
          <div className="relative p-3 bg-green-500 rounded-full text-white hover:bg-green-600 transition-all">
            <FaWhatsapp size={20} />
          </div>
        </a>
        <a
          href="https://discord.com/users/yourid"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <div className="absolute -inset-1 bg-[#5865F2] rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-200 animate-pulse"></div>
          <div className="relative p-3 bg-[#5865F2] rounded-full text-white hover:bg-[#4752c4] transition-all">
            <FaDiscord size={20} />
          </div>
        </a>
        <a
          href="https://github.com/rizqan385"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gray-700 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-200 animate-pulse"></div>
          <div className="relative p-3 bg-gray-700 rounded-full text-white hover:bg-gray-800 transition-all">
            <FaGithub size={20} />
          </div>
        </a>
        <a
          href="https://instagram.com/rizqanahmd"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-200 animate-pulse"></div>
          <div className="relative p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white hover:from-purple-600 hover:to-pink-600 transition-all">
            <FaInstagram size={20} />
          </div>
        </a>
      </div>
    </section>
  );
}
