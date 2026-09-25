import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Indica si el usuario ha pedido reducir el movimiento en los ajustes de su
 * sistema. Para el CSS basta la media query; esto es para las animaciones que
 * corren en JavaScript y no la ven, como el desplazamiento del carrusel.
 *
 * Se suscribe a los cambios: si el ajuste se activa a media sesión, la
 * animación se detiene sin necesidad de recargar.
 */
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return prefersReducedMotion;
};
