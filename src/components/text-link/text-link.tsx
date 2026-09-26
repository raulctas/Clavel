import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import styles from './text-link.module.css';

interface CommonProps {
  children: ReactNode;
  className?: string;
}

type Props =
  | (CommonProps & {
      to: string;
      /** Enlace de vuelta («Volver a Noticias»): la flecha apunta a la izquierda. */
      back?: boolean;
    })
  | (CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined });

/**
 * Enlace de texto subrayado en verde («Descubre más», «Ver todas»…).
 *
 * Regla de la web: la flecha va solo en los enlaces de texto que llevan a
 * otra página, y la pone este componente para que no dependa de cada uso. Los
 * botones (componente `Button`) nunca llevan flecha. Si se usa como botón
 * (sin `to`), tampoco: no lleva a otra página.
 */
export const TextLink = ({ children, className, ...rest }: Props) => {
  const classes = [styles.link, className].filter(Boolean).join(' ');

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link to={rest.to} className={classes}>
        {rest.back && <ArrowLeft size={18} aria-hidden />}
        {children}
        {!rest.back && <ArrowRight size={18} aria-hidden />}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
