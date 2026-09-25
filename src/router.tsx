import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { routes } from './routes';

export const router = createBrowserRouter(createRoutesFromElements(routes));
