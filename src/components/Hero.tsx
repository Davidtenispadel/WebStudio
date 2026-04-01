import { motion } from "framer-motion";

const SceneOne = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src="TU_IMAGEN_ESCENA_1.jpg"
          alt="Ideas and references on a design table"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text */}
      <motion.div
        className="relative z-10 flex flex-col h-full justify-center items-center text-center px-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          You know what you want.
        </h1>

        <p className="text-lg md:text-xl leading-relaxed max-w-2xl">
          A new home, an extension, or the right space for your business.
          <br />
          You have ideas, images, references… but the more you explore,
          the more doubts appear.
          <br /><br />
          <span className="opacity-80">
            That feeling is normal. Every great project starts right here.
          </span>
        </p>
      </motion.div>
    </section>
  );
};

export default SceneOne;
``
