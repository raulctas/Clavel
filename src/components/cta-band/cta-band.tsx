import { Button } from 'components/button';
import { Container } from 'components/container';

import styles from './cta-band.module.css';

interface Props {
  /**
   * Fondo de la sección que envuelve la banda. Debe ser distinto del de la
   * sección anterior: `cream` cuando la anterior es blanca.
   */
  background?: 'white' | 'cream';
  title: string;
  text: string;
  buttonLabel: string;
  to: string;
}

/** Banda verde de cierre con título, texto y un botón (normalmente a Contactar). */
export const CtaBand = ({ background = 'white', title, text, buttonLabel, to }: Props) => (
  <section className={styles[background]}>
    <Container className={styles.block}>
      <div className={styles.band}>
        <div className={styles.text}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.paragraph}>{text}</p>
        </div>
        <Button to={to} variant="light" size="lg">
          {buttonLabel}
        </Button>
      </div>
    </Container>
  </section>
);
