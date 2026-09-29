# Clavel.Front

Web corporativa de **Clavel**, empresa de fertilizantes ecológicos con sede en Valencia.
Cinco páginas (Inicio, Quiénes somos, Noticias, Equipo y Contactar) en español e inglés.

El diseño sale del handoff de diseño «design_handoff_clavel_web» (cabecera «Mínimo», alta
fidelidad), que no forma parte del repositorio. Los textos vienen de la web de Grupo Alfa.

## Stack

- **Vite + React 18 + TypeScript** (modo estricto)
- **React Router v6**: rutas centralizadas en `src/constants/routes.ts`
- **i18next / react-i18next**: textos en `public/locales/<idioma>/translation.json`
- **CSS Modules** + design tokens (`src/styles/design-tokens.css`)
- Fuentes self-hosted vía `@fontsource` (Barlow Semi Condensed + Barlow)
- Iconos **Lucide** (`lucide-react`); TikTok, que no está en Lucide, es un SVG propio

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
  images/
    favicon/        # favicon con la flor (pestaña del navegador) y apple-touch-icon
    logo/           # logo a color (cabecera) e inverso (pie)
    provisional/    # imágenes provisionales, ya con la proporción definitiva
    social/         # imagen para compartir en redes (1200×630)
  locales/<idioma>/ # textos estáticos, un fichero por idioma
src/
  components/       # componentes compartidos (cabecera, pie, botones, tarjetas…)
  pages/            # una carpeta por página; sus piezas propias en pages/<página>/components/
  constants/        # rutas, idiomas, datos de empresa, motivos de contacto
  data/             # contenido estructurado: noticias, equipo, pilares, portada
  hooks/            # pase de diapositivas, título de pestaña, datos de contacto…
  interfaces/       # tipos del contenido
  libs/             # inicialización de i18n y envío del formulario
  styles/           # design tokens + estilos globales
```

Alias de importación (`tsconfig.json` y `vite.config.ts`): `src/*`, `components/*`, `pages/*`,
`constants/*`, `data/*`, `hooks/*`, `interfaces/*` y `libs/*`.

## Multi-idioma

Español (por defecto) e inglés. Para añadir un idioma:

1. Copiar `public/locales/es/translation.json` a `public/locales/<código>/translation.json`
   y traducirlo.
2. Registrar el idioma en `src/constants/languages.ts`.

El selector de idioma y i18next lo detectan solos. La elección del usuario se recuerda
(localStorage) y se puede forzar por URL con `?lng=en`.

## Contenido

- **Noticias**: `src/data/news.ts` (slug, categoría, imagen y vídeos de YouTube opcionales) +
  `news.items.<id>` en cada `translation.json` (título, extracto y cuerpo). Cada noticia tiene su
  página en `/news/<slug>`.
- **Textos largos** (cuerpo de las noticias y política de privacidad): son listas de bloques en
  `translation.json`. Un bloque que empieza por `## ` es un subtítulo, por `### ` un subtítulo
  menor y por `- ` un elemento de lista; el resto son párrafos. Así se traducen sin tocar código.
- **Equipo**: `src/data/team.ts`. Cuando lleguen las fotos (4:5), copiarlas a
  `public/images/team/` y rellenar `photo`, `name`, `email` y `linkedin` de cada miembro. Sin
  foto, la ficha muestra la provisional con la etiqueta «Foto próximamente».
- **Productos y servicios** (`/products-services`): líneas, gamas y otras soluciones en
  `src/data/products.ts`, textos en `productsServices`. Cada botón «Solicitar catálogo» abre
  Contactar con el motivo «catálogo» y el catálogo de ese producto ya marcado
  (`/contact?reason=catalogue&product=<clave>`).
- **Contactar**: hay un motivo por cada botón o enlace que lleva a la página
  (`src/constants/contact-reasons.ts`). Con «Solicitar catálogo» hay que elegir además uno o
  varios catálogos, que son los de Productos y servicios (`CATALOGUES` en
  `src/data/products.ts`).
- **Laboratorio** (`/laboratory`) y **Producción y logística** (`/production-logistics`): se
  llega desde los enlaces «Descubre más» de Inicio. Textos en `laboratory` y `production`.
- **Clavel en cifras** (final de Quiénes somos): cifras e imágenes en `src/data/company-stats.ts`.
- **Horario de atención al cliente**: `src/data/opening-hours.ts` (días y tramos); los nombres
  de los días y el formato del tramo están en `contact.hours` de cada `translation.json`.
- **Fondos de las bandas de título** (Quiénes somos, Noticias, Equipo y Contactar):
  `src/data/page-header-images.ts`. Se muestran atenuadas para que el texto se lea bien.
- **Imágenes provisionales**: `public/images/provisional/`. Para cambiarlas, sustituir los
  ficheros (mismo nombre y proporción) o actualizar las rutas en `src/data/`.

## Pendiente

- **Envío del formulario**: no hay backend. Mientras tanto, `src/libs/contact-request.ts`
  abre el cliente de correo del usuario con la consulta ya redactada para el correo de Clavel.
  Cuando exista el servicio, solo hay que cambiar esa función.
- **Cifras de «Clavel en cifras»**: son las que publicaba Grupo Alfa; confirmarlas (y qué
  significa la «(M)» de las hectáreas).
- **Correo** (`info@agro-clavel.com`) en `src/constants/company.ts`. La dirección y los
  teléfonos son los de Grupo Alfa; de momento no se muestran en la web (ni en Contactar, ni en el pie, ni
  en la política de privacidad).
- **Redes sociales**: URLs en `SOCIAL_LINKS` (`src/constants/company.ts`). Mientras valgan
  `undefined`, el icono se muestra en el pie pero no enlaza.
- **Nombres, cargos y fotos del equipo**.
- **Revisión legal de la política de privacidad** (`/privacy`, textos en `privacy` de
  cada `translation.json`): el texto es una base estándar del RGPD y conviene que lo revise un
  asesor antes de publicar, añadiendo la razón social y el NIF definitivos de Clavel.
- **Logo vectorial**: el logo es un PNG; conviene vectorizarlo.
