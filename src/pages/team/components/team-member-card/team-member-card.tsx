import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Mail } from 'lucide-react';

import { TEAM_PHOTO_PLACEHOLDER } from 'data/team';
import { TeamMember } from 'interfaces/team';

import styles from './team-member-card.module.css';

interface Props {
  member: TeamMember;
}

interface ContactButtonProps {
  href?: string;
  label: string;
  external?: boolean;
  children: ReactNode;
}

/** Botón redondo de contacto. Sin enlace todavía, se muestra solo como icono. */
const ContactButton = ({ href, label, external, children }: ContactButtonProps) =>
  href ? (
    <a
      href={href}
      className={`${styles.contactButton} ${styles.contactLink}`}
      aria-label={label}
      title={label}
      {...(external && { target: '_blank', rel: 'noopener' })}
    >
      {children}
    </a>
  ) : (
    <span className={styles.contactButton} aria-hidden>
      {children}
    </span>
  );

/**
 * Ficha de un miembro del equipo: foto 4:5, nombre, cargo y botones de correo
 * y LinkedIn. Mientras falten datos muestra la foto provisional con la etiqueta
 * «Foto próximamente» y un nombre de muestra.
 */
export const TeamMemberCard = ({ member }: Props) => {
  const { t } = useTranslation();
  const name = member.name ?? t('team.namePending');

  return (
    <article className={styles.card}>
      <div className={styles.photoWrapper}>
        <img
          src={member.photo ?? TEAM_PHOTO_PLACEHOLDER}
          alt={member.photo ? name : ''}
          className={styles.photo}
          width={800}
          height={1000}
          loading="lazy"
        />
        {!member.photo && <span className={styles.photoTag}>{t('team.photoPending')}</span>}
      </div>

      <div className={styles.info}>
        <div className={styles.identity}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.role}>{t(`team.roles.${member.roleKey}`)}</p>
        </div>
        <div className={styles.contact}>
          <ContactButton
            href={member.email && `mailto:${member.email}`}
            label={t('team.emailLabel', { name })}
          >
            <Mail size={18} aria-hidden />
          </ContactButton>
          <ContactButton href={member.linkedin} label={t('team.linkedinLabel', { name })} external>
            <Linkedin size={18} aria-hidden />
          </ContactButton>
        </div>
      </div>
    </article>
  );
};
