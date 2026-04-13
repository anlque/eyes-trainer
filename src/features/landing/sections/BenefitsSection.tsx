const BENEFITS: readonly { title: string; description: string }[] = [
  {
    title: 'Reduce eye strain',
    description: 'Gentle motion helps relieve tension after long screen time.',
  },
  {
    title: 'Improve focus',
    description: 'Train smooth tracking and quick saccades with clear cues.',
  },
  {
    title: 'Relaxation',
    description: 'Calm pacing and soft visuals encourage a relaxed gaze.',
  },
  {
    title: 'Short sessions',
    description: 'Most exercises take about a minute—easy to fit in anytime.',
  },
] as const;

export function BenefitsSection() {
  return (
    <section className="landingSection">
      <div className="landingContainer">
        <h2 className="landingH2">Benefits</h2>
        <div className="benefitsGrid">
          {BENEFITS.map((b) => (
            <div key={b.title} className="miniCard">
              <div className="miniCardTitle">{b.title}</div>
              <div className="miniCardDescription">{b.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
