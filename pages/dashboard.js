import React from 'react';
import styles from './dashboard.module.scss';
import Panel from '../components/Dashboard/Panel';

const dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.panelWrapper}>
        <Panel admin={true} isAdmin={true} />
      </div>
      <div className={styles.contentWrapper}>hi</div>
    </div>
  );
};

export default dashboard;
