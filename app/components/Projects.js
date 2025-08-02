'use client';

import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: 'Svarga Dimsum',
      description:
        'Dibangun untuk membantu pelaku UMKM meningkatkan penjualan dan memperluas jaringan bisnis secara digital.',
      image: '/assets/svarga.png',
    },
    {
      title: 'E-Voting',
      description:
        'Sistem ini memangkas waktu pemilihan dari 3 hari menjadi 3 jam, dengan akurasi penghitungan suara 100%.',
      image: '/assets/E-Voting.png',
    },
    {
      title: 'Aplikasi Keuangan',
      description:
        'Membantu mengatur keuangan menjadi lebih simple dan mudah.',
      image: '/assets/keuangan.png',
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 px-6 text-gray-300 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/blackhole.jpg')] bg-cover bg-center bg-no-repeat bg-fixed" />
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm" />
      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          🚀 Featured Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-4">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:scale-[1.04] transition-transform duration-300 group"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.jpg';
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-300">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
