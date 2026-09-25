import styles from './video-embed.module.css';

interface Props {
  /** Identificador del vídeo de YouTube. */
  videoId: string;
  /** Título accesible del reproductor. */
  title: string;
}

/**
 * Vídeo de YouTube en modo de privacidad mejorada (youtube-nocookie.com):
 * YouTube no guarda nada en el navegador hasta que se reproduce el vídeo, como
 * se explica en la política de privacidad.
 */
export const VideoEmbed = ({ videoId, title }: Props) => (
  <div className={styles.frame}>
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  </div>
);
