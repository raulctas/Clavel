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

- **Noticias**: `src/data/news.ts` (categoría e imagen) + `news.items.<id>` en cada
  `translation.json` (título y extracto). Si una noticia tiene página propia, basta con añadir
  `href` y su tarjeta enlazará a ella.
- **Equipo**: `src/data/team.ts`. Cuando lleguen las fotos (4:5), copiarlas a
  `public/images/team/` y rellenar `photo`, `name`, `email` y `linkedin` de cada miembro. Sin
  foto, la ficha muestra la provisional con la etiqueta «Foto próximamente».
- **Imágenes provisionales**: `public/images/provisional/`. Para cambiarlas, sustituir los
  ficheros (mismo nombre y proporción) o actualizar las rutas en `src/data/`.

## Pendiente

- **Envío del formulario**: no hay backend. Mientras tanto, `src/libs/contact-request.ts`
  abre el cliente de correo del usuario con la consulta ya redactada para el correo de Clavel.
  Cuando exista el servicio, solo hay que cambiar esa función.
- **Correo** (`info@clavel.es`, provisional) en `src/constants/company.ts`. La dirección y los
  teléfonos son los de Grupo Alfa.
- **Redes sociales**: URLs en `SOCIAL_LINKS` (`src/constants/company.ts`). Mientras valgan
  `undefined`, el icono se muestra en el pie pero no enlaza.
- **Nombres, cargos y fotos del equipo**.
- **Política de privacidad** a la que enlazar desde el formulario.
- **Logo vectorial**: el logo es un PNG; conviene vectorizarlo.
