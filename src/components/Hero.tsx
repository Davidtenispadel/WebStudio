const Hero = () => (
  <section className="relative h-screen overflow-hidden bg-gray-800">
    <img
      src="https://picsum.photos/id/104/1920/1080"
      alt="test"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/35" />
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
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
    </div>
  </section>
);
