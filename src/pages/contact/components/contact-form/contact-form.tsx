import { FormEvent, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, CircleCheck, Send } from 'lucide-react';

import { Button } from 'components/button';
import { IconCircle } from 'components/icon-circle';
import { TextLink } from 'components/text-link';
import { CONTACT_REASONS, ContactReason } from 'constants/contact-reasons';
import { routes } from 'constants/routes';
import { sendContactRequest } from 'libs/contact-request';

import styles from './contact-form.module.css';

interface FormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
}

/**
 * Los errores se guardan como claves de traducción y no como textos: así, si
 * el usuario cambia de idioma con errores en pantalla, también se traducen.
 */
type FormErrors = Partial<Record<'name' | 'email' | 'privacy', string>>;

type TextField = Exclude<keyof FormValues, 'privacy' | 'message'>;

const EMPTY_FORM: FormValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
  privacy: false,
};

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/** Campos de una línea, en el orden de la rejilla. */
const TEXT_FIELDS: { field: TextField; type: string; autoComplete: string; optional?: boolean }[] =
  [
    { field: 'name', type: 'text', autoComplete: 'name' },
    { field: 'company', type: 'text', autoComplete: 'organization', optional: true },
    { field: 'email', type: 'email', autoComplete: 'email' },
    { field: 'phone', type: 'tel', autoComplete: 'tel', optional: true },
  ];

interface Props {
  /** Motivo preseleccionado (p. ej. «catálogo» desde «Solicitar catálogo»). */
  initialReason?: ContactReason;
}

/**
 * Formulario de contacto: motivo en chips, datos, mensaje y casilla de
 * privacidad. Al enviarse se sustituye por la confirmación.
 */
export const ContactForm = ({ initialReason = 'catalogue' }: Props) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState<ContactReason>(initialReason);
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const validate = (form: FormValues): FormErrors => ({
    ...(!form.name.trim() && { name: 'contact.form.errorName' }),
    ...(!EMAIL_REGEX.test(form.email.trim()) && { email: 'contact.form.errorEmail' }),
    ...(!form.privacy && { privacy: 'contact.form.errorPrivacy' }),
  });

  const setValue = <K extends keyof FormValues>(field: K, value: FormValues[K]) =>
    setValues((previous) => ({ ...previous, [field]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const reasonLabel = t(`contact.form.reasons.${reason}`);
    const line = (labelKey: string, value: string) =>
      value.trim() ? [`${t(labelKey)}: ${value.trim()}`] : [];

    await sendContactRequest({
      subject: t('contact.form.mailSubject', { reason: reasonLabel, name: values.name.trim() }),
      lines: [
        `${t('contact.form.reason')} ${reasonLabel}`,
        ...line('contact.form.name', values.name),
        ...line('contact.form.company', values.company),
        ...line('contact.form.email', values.email),
        ...line('contact.form.phone', values.phone),
        ...(values.message.trim() ? ['', values.message.trim()] : []),
      ],
    });
    setSent(true);
  };

  const reset = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    setReason(initialReason);
    setSent(false);
  };

  if (sent) {
    return (
      <div className={styles.sent} role="status">
        <IconCircle icon={CircleCheck} size="lg" />
        <h2 className={styles.sentTitle}>{t('contact.form.sentTitle')}</h2>
        <p className={styles.sentText}>{t('contact.form.sentText')}</p>
        <TextLink onClick={reset}>{t('contact.form.sendAnother')}</TextLink>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.reasonGroup}>
        <legend className={styles.label}>{t('contact.form.reason')}</legend>
        <div className={styles.chips}>
          {CONTACT_REASONS.map((option) => (
            <label
              key={option}
              className={[styles.chip, option === reason && styles.chipActive]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                type="radio"
                name="reason"
                value={option}
                checked={option === reason}
                onChange={() => setReason(option)}
                className="visually-hidden"
              />
              {t(`contact.form.reasons.${option}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.fields}>
        {TEXT_FIELDS.map(({ field, type, autoComplete, optional }) => {
          const error = field === 'name' || field === 'email' ? errors[field] : undefined;
          const errorId = `contact-${field}-error`;
          return (
            <label key={field} className={styles.field}>
              <span className={styles.label}>
                {t(`contact.form.${field}`)}
                {optional && ` (${t('contact.form.optional')})`}
              </span>
              <input
                type={type}
                name={field}
                autoComplete={autoComplete}
                value={values[field]}
                onChange={(event) => setValue(field, event.target.value)}
                className={[styles.input, error && styles.invalid].filter(Boolean).join(' ')}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
              />
              <span id={errorId} className={styles.error}>
                {error && t(error)}
              </span>
            </label>
          );
        })}
      </div>

      <label className={styles.field}>
        <span className={styles.label}>{t('contact.form.message')}</span>
        <textarea
          name="message"
          rows={5}
          placeholder={t('contact.form.messageHelp')}
          value={values.message}
          onChange={(event) => setValue('message', event.target.value)}
          className={`${styles.input} ${styles.textarea}`}
        />
      </label>

      <label className={styles.privacy}>
        <input
          type="checkbox"
          name="privacy"
          checked={values.privacy}
          onChange={(event) => setValue('privacy', event.target.checked)}
          className={`visually-hidden ${styles.privacyInput}`}
          aria-invalid={Boolean(errors.privacy)}
          aria-describedby={errors.privacy ? 'contact-privacy-error' : undefined}
        />
        <span
          className={[
            styles.checkbox,
            values.privacy && styles.checkboxChecked,
            errors.privacy && styles.checkboxInvalid,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden
        >
          <Check size={14} strokeWidth={3} />
        </span>
        <span className={styles.privacyText}>
          <span>
            {/* Se abre en otra pestaña para no perder lo que ya se ha escrito. */}
            <Trans
              i18nKey="contact.form.privacy"
              components={{
                policyLink: (
                  <Link
                    to={routes.privacy}
                    target="_blank"
                    rel="noopener"
                    className={styles.policyLink}
                  />
                ),
              }}
            />
          </span>
          <span id="contact-privacy-error" className={styles.error}>
            {errors.privacy && t(errors.privacy)}
          </span>
        </span>
      </label>

      <Button type="submit" className={styles.submit}>
        {t('contact.form.submit')}
        <Send size={18} aria-hidden />
      </Button>
    </form>
  );
};
