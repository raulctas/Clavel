import { useTranslation } from 'react-i18next';

import { Container } from 'components/container';
import { PageHeader } from 'components/page-header';
import { TEAM } from 'data/team';
import { usePageTitle } from 'hooks/use-page-title';

import { TeamMemberCard } from './components/team-member-card';
import styles from './team.module.css';

export const Team = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.team'));

  return (
    <>
      <PageHeader page={t('nav.team')} title={t('team.title')} intro={t('team.intro')} narrow />

      <Container as="section" className={styles.section}>
        <ul className={styles.grid}>
          {TEAM.map((member) => (
            <li key={member.id}>
              <TeamMemberCard member={member} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};
