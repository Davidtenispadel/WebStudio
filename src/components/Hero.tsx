import { motion } from "framer-motion";

const Hero = () => (
  <section className="relative h-screen overflow-hidden">
    <div className="absolute inset-0">
      <motion.img
        src="https://res.cloudinary.com/dwealmbfi/image/upload/v1774772535/Family_rh8tui.png"
        alt="Family at sunrise"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />
    </div>

    <motion.div
      className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl md:text-5xl font-semibold">Architecture begins with you</h1>
      <p className="mt-4 text-lg md:text-xl leading-relaxed">
        Not with drawings. Not with plans.
        <br />
        With your life, your needs, your history.
      </p>
      <a href="#contact-form">
        <button className="mt-8 px-8 py-3 bg-white text-black rounded-full text-sm font-medium">
          Start your project
        </button>
      </a>
    </motion.div>
  </section>
);

export default Hero;
