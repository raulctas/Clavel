import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './button.module.css';

/**
 * - `primary`: verde relleno; al pasar el ratón, verde noche.
 * - `secondary`: blanco con borde verde, pareja del primario sobre fondo claro.
 * - `light`: blanco relleno para fondos verdes (banda final de Inicio).
 */
type Variant = 'primary' | 'secondary' | 'light';

/** `sm` es el botón de la cabecera; `lg`, el de la banda final. */
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type ButtonAsLink = CommonProps & {
  /** Ruta interna (react-router). */
  to: string;
};

type Props = ButtonAsButton | ButtonAsLink;

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: Props) => {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link to={rest.to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};
