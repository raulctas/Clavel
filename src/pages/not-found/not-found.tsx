import { useTranslation } from 'react-i18next';

import { MessagePanel } from 'components/message-panel';
import { usePageTitle } from 'hooks/use-page-title';

const NOT_FOUND_CODE = '404';

export const NotFound = () => {
  const { t } = useTranslation();
  usePageTitle(t('notFound.title'));

  return (
    <MessagePanel
      code={NOT_FOUND_CODE}
      title={t('notFound.title')}
      text={t('notFound.text')}
      cta={t('notFound.cta')}
    />
  );
};
