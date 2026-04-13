import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="landingSection landingHero">
      <div className="landingContainer">
        <div className="heroCard">
          <div className="heroKicker">Calm, guided eye exercises</div>
          <h1 className="heroTitle">Eye Training</h1>
          <p className="heroSubtitle">
            Short, soothing sessions to reduce eye strain and help your eyes relax. Choose
            an exercise, follow the animation, and breathe.
          </p>

          <div className="heroActions">
            <Link className="button buttonPrimary" to="/exercises">
              Start training
            </Link>
            <Link className="button buttonGhost" to="/exercises">
              View exercises
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
