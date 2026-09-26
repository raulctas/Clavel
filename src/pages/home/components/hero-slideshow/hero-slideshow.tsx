import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from 'components/button';
import { Container } from 'components/container';
import { Eyebrow } from 'components/eyebrow';
import { catalogueRequestPath, routes } from 'constants/routes';
import { HERO_SLIDES, HERO_SLIDE_INTERVAL } from 'data/hero-slides';
import { useSlideshow } from 'hooks/use-slideshow';

import styles from './hero-slideshow.module.css';

/**
 * Portada de Inicio: galería a sangre con fundido y zoom lento, veladura blanca
 * de izquierda a derecha y el texto directamente sobre la imagen. Avanza sola
 * cada 6s; los indicadores y las flechas reinician el temporizador.
 */
export const HeroSlideshow = () => {
  const { t } = useTranslation();
  const { index, goTo, next, previous } = useSlideshow(HERO_SLIDES.length, HERO_SLIDE_INTERVAL);

  return (
    <section className={styles.hero}>
      {HERO_SLIDES.map((src, slideIndex) => (
        <img
          key={src}
          src={src}
          alt=""
          className={[styles.slide, slideIndex === index && styles.slideActive]
            .filter(Boolean)
            .join(' ')}
          loading={slideIndex === 0 ? 'eager' : 'lazy'}
        />
      ))}
      <div className={styles.veil} aria-hidden />

      <Container className={styles.content}>
        <div className={styles.copy}>
          <Eyebrow>{t('home.hero.eyebrow')}</Eyebrow>
          <h1 className={styles.title}>{t('home.hero.title')}</h1>
          <p className={styles.intro}>{t('home.hero.intro')}</p>
          <div className={styles.actions}>
            <Button to={catalogueRequestPath}>{t('common.requestCatalogue')}</Button>
            <Button to={routes.aboutUs} variant="secondary">
              {t('home.hero.ctaAbout')}
            </Button>
          </div>
        </div>
      </Container>

      <div className={styles.controls}>
        <Container className={styles.controlsInner}>
          <div className={styles.dots}>
            {HERO_SLIDES.map((src, slideIndex) => (
              <button
                key={src}
                type="button"
                className={styles.dot}
                aria-label={t('common.goToSlide', { index: slideIndex + 1 })}
                aria-current={slideIndex === index}
                onClick={() => goTo(slideIndex)}
              >
                <span
                  className={[styles.dotBar, slideIndex === index && styles.dotBarActive]
                    .filter(Boolean)
                    .join(' ')}
                />
              </button>
            ))}
          </div>
          <div className={styles.arrows}>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrevious}`}
              aria-label={t('common.previous')}
              onClick={previous}
            >
              <ArrowLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              aria-label={t('common.next')}
              onClick={next}
            >
              <ArrowRight size={20} aria-hidden />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
};
