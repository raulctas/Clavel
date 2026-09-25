import { useCallback, useEffect, useState } from 'react';

import { usePrefersReducedMotion } from './use-prefers-reduced-motion';

/**
 * Pase de diapositivas cíclico con avance automático y control manual.
 *
 * Cada vez que el usuario elige una imagen (indicadores o flechas) el
 * temporizador vuelve a empezar, para que la imagen elegida se vea el intervalo
 * completo. Si el usuario ha pedido reducir el movimiento en su sistema, no hay
 * avance automático: solo cambia cuando él lo pide.
 */
export const useSlideshow = (count: number, intervalMs: number) => {
  const [index, setIndex] = useState(0);
  // Cambia con cada acción manual y reinicia el efecto del temporizador.
  const [cycle, setCycle] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || count < 2) {
      return;
    }
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [count, intervalMs, prefersReducedMotion, cycle]);

  const goTo = useCallback(
    (target: number) => {
      setIndex(((target % count) + count) % count);
      setCycle((value) => value + 1);
    },
    [count],
  );

  return {
    index,
    goTo,
    next: () => goTo(index + 1),
    previous: () => goTo(index - 1),
  };
};
