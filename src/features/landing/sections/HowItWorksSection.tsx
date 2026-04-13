const STEPS: readonly { title: string; description: string }[] = [
  { title: 'Choose exercise', description: 'Pick a session that matches how you feel.' },
  { title: 'Follow animation', description: 'Let your eyes track the motion—no strain.' },
  { title: 'Relax eyes', description: 'Breathe, blink softly, and release tension.' },
] as const;

export function HowItWorksSection() {
  return (
    <section className="landingSection">
      <div className="landingContainer">
        <h2 className="landingH2">How it works</h2>
        <div className="stepsGrid">
          {STEPS.map((s, idx) => (
            <div key={s.title} className="miniCard">
              <div className="stepIndex">{idx + 1}</div>
              <div className="miniCardTitle">{s.title}</div>
              <div className="miniCardDescription">{s.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
