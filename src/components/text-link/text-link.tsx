import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './text-link.module.css';

interface CommonProps {
  children: ReactNode;
  className?: string;
}

type Props =
  | (CommonProps & { to: string })
  | (CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined });

/** Enlace de texto subrayado en verde («Ver todas», «Pide asesoramiento»…). */
export const TextLink = ({ children, className, ...rest }: Props) => {
  const classes = [styles.link, className].filter(Boolean).join(' ');

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link to={rest.to} className={classes}>
        {children}
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
