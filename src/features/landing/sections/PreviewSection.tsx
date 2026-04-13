import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { EXERCISES } from '@/exercises/registry';
import { ExerciseCard } from '@/features/home/ExerciseCard';

export function PreviewSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const preview = useMemo(() => EXERCISES.slice(0, 3), []);

  return (
    <section className="landingSection">
      <div className="landingContainer">
        <div className="landingSectionHeaderRow">
          <h2 className="landingH2">Exercises preview</h2>
          <Link className="appNavLink" to="/exercises">
            View all
          </Link>
        </div>

        <div className="exerciseGrid">
          {preview.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isActive={activeId === exercise.id}
              onActivate={setActiveId}
              onDeactivate={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
