import { Navigate, Route } from 'react-router-dom';

import { MainLayout } from 'components/main-layout';
import { RouteError } from 'components/route-error';
import { legacyRedirects, routes as routePaths } from 'constants/routes';
import { AboutUs } from 'pages/about-us';
import { AllProducts } from 'pages/all-products';
import { BusinessCard } from 'pages/business-card';
import { Contact } from 'pages/contact';
import { Home } from 'pages/home';
import { Laboratory } from 'pages/laboratory';
import { News } from 'pages/news';
import { NewsDetail } from 'pages/news-detail';
import { NotFound } from 'pages/not-found';
import { Privacy } from 'pages/privacy';
import { Production } from 'pages/production';
import { ProductDetail } from 'pages/product-detail';
import { ProductRange } from 'pages/product-range';
import { Products } from 'pages/products';

/**
 * Importación directa (eager) de las páginas: con tan pocas páginas, y ligeras, el
 * code-splitting por ruta no aporta nada. La frontera de error va en una ruta
 * sin path dentro del layout, para que un error conserve cabecera y pie. Las
 * tarjetas de presentación quedan fuera del layout: son páginas sin cabecera ni pie.
 */
export const routes = (
  <>
    <Route
      path={routePaths.businessCard}
      element={<BusinessCard />}
      errorElement={<RouteError />}
    />
    <Route element={<MainLayout />}>
      <Route errorElement={<RouteError />}>
        <Route index element={<Home />} />
        <Route path={routePaths.aboutUs} element={<AboutUs />} />
        <Route path={routePaths.products} element={<Products />} />
        <Route path={routePaths.allProducts} element={<AllProducts />} />
        <Route path={routePaths.productRange} element={<ProductRange />} />
        <Route path={routePaths.productDetail} element={<ProductDetail />} />
        <Route path={routePaths.laboratory} element={<Laboratory />} />
        <Route path={routePaths.production} element={<Production />} />
        <Route path={routePaths.news} element={<News />} />
        <Route path={routePaths.newsDetail} element={<NewsDetail />} />
        <Route path={routePaths.contact} element={<Contact />} />
        <Route path={routePaths.privacy} element={<Privacy />} />
        {legacyRedirects.map(({ from, to }) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  </>
);
