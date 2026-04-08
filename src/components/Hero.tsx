import React from "react";

interface HeroProps {
  isActive: boolean;
}

const Hero: React.FC<HeroProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <section
      id="project-journey"
      className="project-journey w-full"
    >
      {/* JOURNEY SCENE 01 */}
      <article
        className="journey-scene"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dwealmbfi/image/upload/q_auto/f_auto/v1774772535/Family_rh8tui.png')",
        }}
      >
        <div className="journey-text top">
          <h1>Architecture begins with you</h1>
          <p>
            Not with drawings. Not with plans.
            <br />
            With your life, your needs, your story.
          </p>
          <a href="#start" className="journey-cta">
            Start your project
          </a>
        </div>
      </article>

      {/* JOURNEY SCENE 02 */}
      <article
        className="journey-scene"
        style={{ backgroundImage: "url('/images/journey-02.jpg')" }}
      >
        <div className="journey-text bottom">
          <h2>You’re searching for the right space</h2>
          <p>
            A new home. An extension.
            <br />
            A workspace that finally feels right.
          </p>
        </div>
      </article>

      {/* JOURNEY SCENE 03 */}
      <article
        className="journey-scene"
        style={{ backgroundImage: "url('/images/journey-03.jpg')" }}
      >
        <div className="journey-text bottom">
          <h2>Doubt is not a problem — it’s the beginning</h2>
          <p>
            Great architecture doesn’t start with answers.
            <br />
            It starts with the right questions.
          </p>
        </div>
      </article>

      {/* JOURNEY SCENE 04 */}
      <article
        className="journey-scene"
        style={{ backgroundImage: "url('/images/journey-04.jpg')" }}
      >
        <div className="journey-text bottom">
          <h2>Your ideal project begins here</h2>
          <p>
            Stop overthinking.
            <br />
            Start imagining with us.
          </p>
        </div>
      </article>
    </section>
  );
};

export default Hero;
