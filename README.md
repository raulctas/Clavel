# Clavel.Front

Web corporativa de **Clavel**, empresa de fertilizantes ecológicos con sede en Valencia.
Páginas de Inicio, Quiénes somos, Productos, Laboratorio, Producción y logística, Noticias, Contactar y Privacidad, en cinco idiomas (español, inglés, francés, portugués e italiano).

El diseño sale del handoff de diseño «design_handoff_clavel_web» (cabecera «Mínimo», alta
fidelidad), que no forma parte del repositorio. Los textos vienen de la web de Grupo Alfa.

## Stack

- **Vite + React 18 + TypeScript** (modo estricto)
- **React Router v6**: rutas centralizadas en `src/constants/routes.ts`
- **i18next / react-i18next**: textos en `public/locales/<idioma>/translation.json`
  (se piden con `?v=<versión del build>` para que la caché no sirva textos antiguos; en
  desarrollo, al cambiar uno, la página se recarga sola)
- **CSS Modules** + design tokens (`src/styles/design-tokens.css`)
- Fuentes self-hosted vía `@fontsource` (Barlow Semi Condensed + Barlow)
- Iconos **Lucide** (`lucide-react`)

Convenciones (las mismas que Wio.Front y Sysoil.Front): ficheros y carpetas en `kebab-case`,
una carpeta por componente con barrel `index.ts`, componentes como arrow functions,
Prettier + ESLint (flat config) y ningún texto literal en el JSX: todo pasa por `t()`.

## Requisitos

- Node.js 18+
- Yarn (classic)

## Scripts

```bash
yarn install      # instalar dependencias
yarn dev          # servidor de desarrollo (http://localhost:5173)
yarn build        # type-check + build de producción
yarn preview      # previsualizar el build
yarn lint         # ESLint
yarn type-check   # comprobación de tipos (tsc --noEmit)
```

## Estructura

```
public/
  api/
    contact.php     # envía el formulario de contacto a info@agro-clavel.com (PHP del hosting)
  images/
    favicon/        # favicon con la flor (pestaña del navegador) y apple-touch-icon
    about-us/       # Quiénes somos: banda de título, ¿Por qué elegirnos? y Calidad
    business-cards/ # tarjetas de presentación: <slug>.webp (página) y <slug>.png (descarga)
    contact/        # Contactar: banda de título
    home/           # Inicio: portada, pilares (WebP transparentes), Laboratorio y Fabricación
    laboratory/     # Laboratorio: banda de título, sección principal, iconos de «Qué hacemos» y galería
    logo/           # logo «Fertilizantes Eco» a color (cabecera) e inverso (pie), WebP 360 px
    news/           # imagen de cada noticia: <slug>.jpg
    production/     # Producción y logística: banda de título, Fabricación y Logística
    products/       # Productos: ilustración de cada gama y fotos de cada producto (<slug>/)
    social/         # imagen para compartir en redes (1200×630)
  locales/<idioma>/ # textos estáticos, un fichero por idioma
src/
  components/       # componentes compartidos (cabecera, pie, botones, tarjetas…)
  pages/            # una carpeta por página; sus piezas propias en pages/<página>/components/
  constants/        # rutas, idiomas, datos de empresa, motivos de contacto
  data/             # contenido estructurado: noticias, productos, pilares, portada
  hooks/            # pase de diapositivas, título de pestaña, datos de contacto…
  interfaces/       # tipos del contenido
  libs/             # inicialización de i18n y envío del formulario
  styles/           # design tokens + estilos globales
```

Alias de importación (`tsconfig.json` y `vite.config.ts`): `src/*`, `components/*`, `pages/*`,
`constants/*`, `data/*`, `hooks/*`, `interfaces/*` y `libs/*`.

## Multi-idioma

Español (por defecto), inglés, francés, portugués e italiano. Para añadir un idioma:

1. Copiar `public/locales/es/translation.json` a `public/locales/<código>/translation.json`
   y traducirlo.
2. Registrar el idioma en `src/constants/languages.ts`.

El selector de idioma y i18next lo detectan solos. La elección del usuario se recuerda
(localStorage) y se puede forzar por URL con `?lng=en`.

## Contenido

- **Tarjetas de presentación** (`/card/<slug>`, p. ej. `/card/libero-parri`): página sencilla, sin
  cabecera ni pie, con la imagen de la tarjeta y los botones «Descargar tarjeta» y «Visita nuestra
  web». No se indexa en buscadores. Para añadir una: en `public/images/business-cards/`, la imagen
  `<slug>.webp` (1360 px de ancho) y el PNG en alta resolución `<slug>.png` para la descarga; y
  alta en `src/data/business-cards.ts`.
- **Noticias**: `src/data/news.ts` (slug, categoría, imagen y vídeos de YouTube opcionales) +
  `news.items.<id>` en cada `translation.json` (título, extracto y cuerpo). Cada noticia tiene su
  página en `/news/<slug>`. Su imagen es `public/images/news/<slug>.jpg`: JPG de unos 1200 px
  de ancho. Se muestra en su tarjeta (recortada a 3:2) y como fondo de la banda de título de
  la noticia, así que lo importante debe quedar en el centro.
- **Textos largos** (cuerpo de las noticias y política de privacidad): son listas de bloques en
  `translation.json`. Un bloque que empieza por `## ` es un subtítulo, por `### ` un subtítulo
  menor y por `- ` un elemento de lista; el resto son párrafos. Así se traducen sin tocar código.
- **Productos**, en tres niveles (gamas y productos en `src/data/products.ts`, textos en
  `products`):
  - `/products`: las cinco gamas (Terra, Protección, Potenciador, Nutrición y Correctores) en
    una rejilla centrada (tres y dos) de tarjetas, cada una con su ilustración, su título y su descripción
    breve; toda la gama enlaza con su página. Debajo, «Ver todos los productos».
  - `/products/all`: los 14 productos juntos en una rejilla, en el orden de las gamas; cada
    tarjeta indica su gama («Clavel · Terra») y enlaza con la ficha.
  - `/products/<gama>`: la gama con las tarjetas de sus productos, el botón «Solicitar el
    catálogo de <gama>» y enlaces a las demás gamas.
  - `/products/<gama>/<producto>`: la ficha: banda de título con el nombre y la función y, debajo,
    una disposición de tienda en línea: galería con
    miniaturas, «Detalles del producto» desplegables (descripción y ficha técnica) y una caja
    fija con el formato y el botón «Solicitar información», que abre Contactar con el
    producto ya elegido. En móvil la caja va justo después del nombre.

  Nombres, función y composición siguen la nomenclatura de 2026 (Excel «CLAVEL PRODUCTOS»);
  función, descripción y composición de cada producto están en `products.items.<slug>`. Las
  fotos (`public/images/products/<slug>/`: `main`, `5l` y `20l`, en WebP transparente de 900 px
  de alto) llevan ya la etiqueta de Clavel. Una gama o un producto desconocidos muestran la página 404, y
  las direcciones antiguas (`/products-services`, `/products/clavel`, `/products/agrentis`)
  redirigen a `/products`.
- **Buscador** (lupa del menú, `src/components/search` y `src/libs/search.ts`): al abrirse por
  primera vez carga los textos de los cinco idiomas y busca en todos a la vez (sin tildes ni
  mayúsculas). A partir de 3 letras muestra hasta 5 resultados (`MAX_RESULTS`): primero
  productos, después noticias y luego el resto de páginas; para entrar en el máximo cuentan
  antes los que coinciden en el título. Cada resultado enlaza con su página y muestra el
  fragmento encontrado (con el idioma, si no es el activo). Las páginas y qué textos incluye
  cada una están en `PAGES`, en `src/libs/search.ts`: una página nueva hay que añadirla ahí.
- **Contactar**: motivos en `src/constants/contact-reasons.ts` (catálogo, asesoramiento, productos,
  distribuidor, trabajar en Clavel y otra consulta); algunos botones llegan con uno ya elegido.
  Con «Solicitar catálogo» hay que elegir además uno o
  varios catálogos, uno por gama (`CATALOGUES` en `src/data/products.ts`). Con «Información
  sobre productos» hay que elegir el producto; `/contact?reason=productInfo&product=<slug>`
  lo deja ya elegido (es lo que hace el botón de cada ficha). Del mismo modo,
  `/contact?reason=catalogue&catalogue=<gama>` deja marcados el motivo y ese catálogo (botón de
  cada gama).
  El mensaje viene escrito con un texto breve según el motivo y el producto, en el idioma de
  la web (`contact.form.defaultMessage`), con saludo según la hora; deja de cambiar en cuanto
  el usuario lo edita.
  Son obligatorios el nombre, el correo **o** el teléfono (al menos uno, y bien escrito el que
  se rellene) y la casilla de privacidad.
- **Envío del formulario**: `src/libs/contact-request.ts` manda la consulta por POST a
  `public/api/contact.php`, que vuelve a validarla y la envía con `mail()` de PHP a
  `info@agro-clavel.com`. El destinatario está fijado en el script (no viene del navegador), y
  un campo trampa oculto (`website`) descarta envíos de robots. En desarrollo, Vite no ejecuta
  PHP: `vite.config.ts` simula esa dirección, muestra la consulta en la consola de Vite y no
  envía nada (con «fallo» como nombre responde con error, para probar el aviso).
- **Laboratorio** (`/laboratory`) y **Producción y logística** (`/production-logistics`): se
  llega desde los enlaces «Descubre más» de Inicio. Textos en `laboratory` y `production`.
- **Clavel en cifras** (al final de «¿Por qué elegirnos?», en Quiénes somos): cifras en
  `src/data/company-stats.ts`.
- **Portada de Inicio**: `src/data/hero-slides.ts`. Con una sola imagen no hay pase (ni
  flechas ni indicadores); con varias, se alternan cada 6 s.
- **Fondos de las bandas de título** (todas las páginas interiores):
  `src/data/page-header-images.ts`. Se muestran atenuadas para que el texto se lea bien.
  Productos, Noticias y Privacidad reutilizan las fotos de Contactar, la
  portada de Inicio y Quiénes somos.

## Despliegue

`yarn build` genera `dist/`. Su **contenido** se sube a la raíz de la web del hosting (`/www`), no
dentro de `cgi-bin`, sobrescribiendo los ficheros. Van incluidos dos `.htaccess` (Apache):

- `public/.htaccess`: todas las rutas sirven `index.html` (React Router) y fija la caché:
  `index.html` y los `translation.json` se comprueban siempre; imágenes y demás ficheros de
  `public/`, un día, porque conservan su nombre aunque se sustituyan.
- `public/assets/.htaccess`: acaba en `dist/assets/` y deja guardar un año el código y las fuentes
  de Vite, que cambian de nombre en cada versión.

Las fotos de producto llevan además `?v=<PHOTOS_VERSION>` (`src/data/products.ts`): al sustituir
fotos conservando el nombre, sube ese número para que se vean al momento.

Para el resto de imágenes (logo, fotos de páginas, noticias…), al sustituirlas conviene darles
**un nombre nuevo** y actualizar la referencia: hasta octubre de 2026 el hosting dejaba guardarlas
un año sin volver a preguntar, y quien las tenga de entonces no vería la nueva con el mismo nombre.

## Pendiente

- **Envío del formulario en el hosting**: necesita PHP con `mail()` y correo saliente. El
  remitente es `info@agro-clavel.com` (`MAIL_FROM` en `public/api/contact.php`); si el hosting
  exige otro buzón del dominio, se cambia ahí. Probar un envío real tras el despliegue.
- **Cifras de «Clavel en cifras»**: son las que publicaba Grupo Alfa; confirmarlas (y qué
  significa la «(M)» de las hectáreas).
- **Correo y teléfono** (`info@agro-clavel.com`, `+34 629 49 17 60`) en
  `src/constants/company.ts`. La dirección (Bétera) está en `contact.address` de cada
  `translation.json` y se muestra como texto, sin enlace. Se ven en el pie y en el apartado
  «Responsable del tratamiento» de la política de privacidad; Contactar no los muestra.
- **Revisión legal de la política de privacidad** (`/privacy`, textos en `privacy` de
  cada `translation.json`): el texto es una base estándar del RGPD y conviene que lo revise un
  asesor antes de publicar, añadiendo la razón social y el NIF definitivos de Clavel.
- **Logo vectorial**: el logo es una imagen (WebP a partir de un PNG); conviene vectorizarlo.
