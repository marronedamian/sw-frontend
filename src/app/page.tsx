'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const crawlTexts = [
  'Una galaxia muy, muy lejana te espera...',
  'El Lado Oscuro se está fortaleciendo...',
  'Nuevos planetas están siendo descubiertos...',
  'Prepárate para explorar el universo Star Wars...',
];

function useResponsiveOffset(defaultY: number = -90) {
  const [offsetY, setOffsetY] = useState(defaultY);

  useEffect(() => {
    const updateOffset = () => {
      const width = window.innerWidth;
      if (width < 640) setOffsetY(-50);       // sm
      else if (width < 768) setOffsetY(-70);  // md
      else if (width < 1024) setOffsetY(-90); // lg
      else setOffsetY(-120);                  // xl+
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  return offsetY;
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const offsetY = useResponsiveOffset();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % crawlTexts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-yellow-400">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/starwars/bg_sw.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Capa oscura encima del video */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 py-20 h-full">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold star-wars-font mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          STAR WARS API EXPLORER
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Explora el vasto universo de Star Wars. Descubre personajes, películas, naves espaciales y planetas.
        </motion.p>

        <Link
          href="/people"
          className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg text-lg hover:bg-yellow-500 transition duration-300 shadow-lg"
        >
          Comenzar la aventura
        </Link>

        {/* Texto animado inferior */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute bottom-20 text-sm md:text-base text-yellow-400 text-opacity-80 font-mono tracking-wide px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: offsetY, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6, ease: 'easeInOut' }}
          >
            <p className="uppercase">{crawlTexts[currentIndex]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
