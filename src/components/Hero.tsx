import { motion } from 'framer-motion';

const Hero = () => {
  console.log('Hero renderizado desde:', new Error().stack);

  return (
    <section className="relative h-screen overflow-hidden">
      
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <img
          src="https://res.cloudinary.com/dwealmbfi/image/upload/v1774772535/Family_rh8tui.png"
          alt="Family at sunrise"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold">
          Your Project Journey Starts Here
        </h1>

        <p className="mt-4 text-lg md:text-xl leading-relaxed max-w-2xl">
          Every project begins with your life, your needs and your story.
          <br />
          We guide you through each stage — from the first idea to the built reality.
        </p>

        <a href="#project-journey">
          <button className="mt-8 px-8 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition">
            Explore the Journey
          </button>
        </a>
      </motion.div>

    </section>
  );
};

export default Hero;
