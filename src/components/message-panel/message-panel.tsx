import { Button } from 'components/button';
import { Container } from 'components/container';
import { routes } from 'constants/routes';

import styles from './message-panel.module.css';

interface Props {
  title: string;
  text: string;
  cta: string;
  /** Texto grande sobre el título (p. ej. «404»). */
  code?: string;
  /**
   * Usa un enlace normal en lugar del de React Router: la frontera de error
   * necesita recargar la aplicación entera.
   */
  hardReload?: boolean;
}

/** Mensaje centrado con vuelta a Inicio (página no encontrada y error de ruta). */
export const MessagePanel = ({ title, text, cta, code, hardReload }: Props) => (
  <section className={styles.band}>
    <Container>
      <div className={styles.content}>
        {code && <p className={styles.code}>{code}</p>}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
        {hardReload ? (
          <a href={routes.home} className={styles.reloadLink}>
            {cta}
          </a>
        ) : (
          <Button to={routes.home}>{cta}</Button>
        )}
      </div>
    </Container>
  </section>
);
