import { FormEvent, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, CircleCheck, Send } from 'lucide-react';

import { Button } from 'components/button';
import { IconCircle } from 'components/icon-circle';
import { TextLink } from 'components/text-link';
import { CONTACT_REASONS, ContactReason } from 'constants/contact-reasons';
import { routes } from 'constants/routes';
import { CATALOGUES, catalogueTitleKey } from 'data/products';
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
type FormErrors = Partial<Record<'reason' | 'catalogues' | 'name' | 'email' | 'privacy', string>>;

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
  /**
   * Motivo preseleccionado (p. ej. «catálogo» desde «Solicitar catálogo»). Sin
   * él (entrando desde «Contactar») no hay ninguno marcado y hay que elegirlo.
   */
  initialReason?: ContactReason;
  /** Catálogo ya marcado (el del producto desde el que se ha llegado). */
  initialCatalogue?: string;
}

/**
 * Formulario de contacto: motivo en chips, datos, mensaje y casilla de
 * privacidad. Si el motivo es «Solicitar catálogo», hay que elegir además qué
 * catálogo (uno o varios). Al enviarse se sustituye por la confirmación.
 */
export const ContactForm = ({ initialReason, initialCatalogue }: Props) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState<ContactReason | undefined>(initialReason);
  const initialCatalogues = initialCatalogue ? [initialCatalogue] : [];
  const [catalogues, setCatalogues] = useState<string[]>(initialCatalogues);
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const validate = (form: FormValues): FormErrors => ({
    ...(!reason && { reason: 'contact.form.errorReason' }),
    ...(reason === 'catalogue' &&
      catalogues.length === 0 && { catalogues: 'contact.form.errorCatalogue' }),
    ...(!form.name.trim() && { name: 'contact.form.errorName' }),
    ...(!EMAIL_REGEX.test(form.email.trim()) && { email: 'contact.form.errorEmail' }),
    ...(!form.privacy && { privacy: 'contact.form.errorPrivacy' }),
  });

  const toggleCatalogue = (key: string) => {
    setCatalogues((previous) =>
      previous.includes(key) ? previous.filter((item) => item !== key) : [...previous, key],
    );
    setErrors((previous) => ({ ...previous, catalogues: undefined }));
  };

  const setValue = <K extends keyof FormValues>(field: K, value: FormValues[K]) =>
    setValues((previous) => ({ ...previous, [field]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !reason) {
      return;
    }

    const reasonLabel = t(`contact.form.reasons.${reason}`);
    const line = (labelKey: string, value: string) =>
      value.trim() ? [`${t(labelKey)}: ${value.trim()}`] : [];

    await sendContactRequest({
      subject: t('contact.form.mailSubject', { reason: reasonLabel, name: values.name.trim() }),
      lines: [
        `${t('contact.form.reason')} ${reasonLabel}`,
        ...(reason === 'catalogue'
          ? [
              `${t('contact.form.cataloguesLine')}: ${CATALOGUES.filter((key) =>
                catalogues.includes(key),
              )
                .map((key) => t(catalogueTitleKey(key)))
                .join(', ')}`,
            ]
          : []),
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
    setCatalogues(initialCatalogues);
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
      <fieldset
        className={styles.reasonGroup}
        aria-invalid={Boolean(errors.reason)}
        aria-describedby={errors.reason ? 'contact-reason-error' : undefined}
      >
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
                onChange={() => {
                  setReason(option);
                  // Al elegir un motivo desaparece su error, sin esperar a reenviar.
                  setErrors((previous) => ({ ...previous, reason: undefined }));
                }}
                className="visually-hidden"
              />
              {t(`contact.form.reasons.${option}`)}
            </label>
          ))}
        </div>
        <span id="contact-reason-error" className={styles.error}>
          {errors.reason && t(errors.reason)}
        </span>
      </fieldset>

      {reason === 'catalogue' && (
        <fieldset
          className={styles.reasonGroup}
          aria-invalid={Boolean(errors.catalogues)}
          aria-describedby={errors.catalogues ? 'contact-catalogues-error' : undefined}
        >
          <legend className={styles.label}>
            {t('contact.form.catalogues')}{' '}
            <span className={styles.hint}>{t('contact.form.cataloguesHint')}</span>
          </legend>
          <div className={styles.chips}>
            {CATALOGUES.map((key) => {
              const checked = catalogues.includes(key);
              return (
                <label
                  key={key}
                  className={[styles.chip, checked && styles.chipActive].filter(Boolean).join(' ')}
                >
                  <input
                    type="checkbox"
                    name="catalogues"
                    value={key}
                    checked={checked}
                    onChange={() => toggleCatalogue(key)}
                    className="visually-hidden"
                  />
                  {checked && <Check size={16} strokeWidth={3} aria-hidden />}
                  {t(catalogueTitleKey(key))}
                </label>
              );
            })}
          </div>
          <span id="contact-catalogues-error" className={styles.error}>
            {errors.catalogues && t(errors.catalogues)}
          </span>
        </fieldset>
      )}

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
