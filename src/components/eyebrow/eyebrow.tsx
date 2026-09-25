import { ReactNode } from 'react';

import styles from './eyebrow.module.css';

interface Props {
  children: ReactNode;
}

/** Antetítulo: mayúsculas espaciadas en rosa texto, encima de un titular. */
export const Eyebrow = ({ children }: Props) => <p className={styles.eyebrow}>{children}</p>;
