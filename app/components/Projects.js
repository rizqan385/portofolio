'use client';

export default function Projects() {
  const projects = [
    {
      title: 'Svarga Dimsum',
      description: 'Dibangun untuk membantu pelaku UMKM meningkatkan penjualan dan memperluas jaringan bisnis secara digital.',
      image: '/assets/svarga.png',
    },
    {
      title: 'E-Voting',
      description: 'Sistem ini memangkas waktu pemilihan dari 3 hari menjadi 3 jam, dengan akurasi penghitungan suara 100%.',
      image: '/assets/E-Voting.png',
    },
    {
      title: 'Aplikasi Keuangan',
      description: 'Membantu mengatur keuangan menjadi lebih simple dan mudah. ',
      image: '/assets/keuangan.png',
    }
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 px-6 text-gray-300 overflow-hidden"
    >
      {/* Background dengan Tailwind */}
      <div className="absolute inset-0 z-0 bg-[url('/blackhole.jpg')] bg-cover bg-center bg-no-repeat bg-fixed"></div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Projects</h2>
        
        {/* Grid container dengan 3 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {projects.map((project, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-[#2a2a2a]/80 backdrop-blur-md shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col h-full"
            >
              <div className="flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.jpg';
                  }}
                />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-300">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}