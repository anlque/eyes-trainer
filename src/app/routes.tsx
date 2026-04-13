import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/app/Layout';
import { LandingPage } from '@/features/landing/LandingPage';
import { HomeScreen } from '@/features/home/HomeScreen';
import { ExercisePlayerScreen } from '@/features/player/ExercisePlayerScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'exercises', element: <HomeScreen /> },
      { path: 'exercise/:exerciseId', element: <ExercisePlayerScreen /> },
    ],
  },
]);
