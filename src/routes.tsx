import { Route } from 'react-router-dom';

import { MainLayout } from 'components/main-layout';
import { RouteError } from 'components/route-error';
import { routes as routePaths } from 'constants/routes';
import { AboutUs } from 'pages/about-us';
import { Contact } from 'pages/contact';
import { Home } from 'pages/home';
import { News } from 'pages/news';
import { NewsDetail } from 'pages/news-detail';
import { NotFound } from 'pages/not-found';
import { Privacy } from 'pages/privacy';
import { Team } from 'pages/team';

/**
 * Importación directa (eager) de las páginas: con tan pocas páginas, y ligeras, el
 * code-splitting por ruta no aporta nada. La frontera de error va en una ruta
 * sin path dentro del layout, para que un error conserve cabecera y pie.
 */
export const routes = (
  <Route element={<MainLayout />}>
    <Route errorElement={<RouteError />}>
      <Route index element={<Home />} />
      <Route path={routePaths.aboutUs} element={<AboutUs />} />
      <Route path={routePaths.news} element={<News />} />
      <Route path={routePaths.newsDetail} element={<NewsDetail />} />
      <Route path={routePaths.team} element={<Team />} />
      <Route path={routePaths.contact} element={<Contact />} />
      <Route path={routePaths.privacy} element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);
