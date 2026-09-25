import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// Barlow Semi Condensed para titulares, antetítulos y rótulos de tarjeta.
import '@fontsource/barlow-semi-condensed/600.css';
import '@fontsource/barlow-semi-condensed/700.css';
// Barlow para el texto, la navegación, los botones y los formularios.
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';

import 'src/styles/design-tokens.css';
import 'src/styles/global.css';

import { PageLoader } from 'components/page-loader';
import { i18nextInit } from 'libs/i18n';

import { router } from './router';

i18nextInit();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);
