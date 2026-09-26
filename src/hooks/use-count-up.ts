import { RefObject, useEffect, useState } from 'react';

import { usePrefersReducedMotion } from './use-prefers-reduced-motion';

const DURATION_MS = 1600;

/**
 * Cuenta de 0 a `target` la primera vez que el elemento entra en pantalla.
 *
 * Hasta entonces muestra la cifra final: si la animación no llega a
 * ejecutarse (pestaña en segundo plano, buscadores, impresión…) nunca se queda
 * un 0 a la vista. Con «reducir movimiento» no se anima.
 */
export const useCountUp = (target: number, ref: RefObject<Element>) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(target);

  useEffect(() => {
    const element = ref.current;
    setValue(target);
    if (prefersReducedMotion || !element) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          // Frena al final (ease-out cúbico), como un contador.
          const eased = 1 - (1 - progress) ** 3;
          setValue(Math.round(target * eased));
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, ref, prefersReducedMotion]);

  return value;
};
