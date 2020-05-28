import React from 'react';
import Link from 'next/link';
import styles from './Panel.module.scss';
import PanelItem from './Panel-Item';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const Panel = props => {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <img
            src="/assets/Logo-Green.svg"
            className={styles.logo}
            alt="logo"
          />
        </Link>
      </div>
      <PanelItem
        icon={<VerifiedUserIcon className={styles.icon} />}
        text="Admin Panel"
        isActive={true}
      />

      <PanelItem
        icon={<VerifiedUserIcon className={styles.icon} />}
        text="Admin Panel"
      />
    </div>
  );
};

export default Panel;
