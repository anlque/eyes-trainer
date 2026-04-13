import { useState } from 'react';

import { EXERCISES } from '@/exercises/registry';
import { ExerciseCard } from '@/features/home/ExerciseCard';

export function HomeScreen() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <main className="screen">
      <header className="screenHeader">
        <h1 className="screenTitle">Exercises</h1>
        <p className="screenSubtitle">Pick an exercise and follow along.</p>
      </header>

      <section className="gridWrap">
        <div className="exerciseGrid">
          {EXERCISES.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isActive={activeId === exercise.id}
              onActivate={setActiveId}
              onDeactivate={() => setActiveId(null)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
