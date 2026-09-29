/**
 * Imágenes de la portada de Inicio (se recortan para llenar la portada): las
 * tres fotos de las bandas de título de las páginas del menú principal. Con
 * una sola imagen no habría pase ni se mostrarían las flechas y los
 * indicadores. Son decorativas, así que no llevan texto alternativo.
 */
export const HERO_SLIDES: string[] = [
  // Campo de cultivo (también en Noticias).
  '/images/home/hero.jpg',
  // Manos plantando (Quiénes somos y Equipo).
  '/images/about-us/header.jpg',
  // Agricultores en el campo (Contactar y Productos y servicios).
  '/images/contact/header.jpg',
];

/** Milisegundos que permanece visible cada imagen antes de pasar a la siguiente. */
export const HERO_SLIDE_INTERVAL = 6000;
