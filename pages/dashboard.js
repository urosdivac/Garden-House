import React from 'react';
import Head from 'next/head';
import styles from './dashboard.module.scss';
import Panel from '../components/Dashboard/Panel';
import Admin from '../components/Dashboard/Admin/Admin-Dashboard';

const dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.panelWrapper}>
        <Panel admin={true} isAdmin={true} />
      </div>
      <div className={styles.contentWrapper}>
        <Admin />
      </div>
      <Head>
        <title>Admin Dashboard - Garden House</title>
      </Head>
    </div>
  );
};

export default dashboard;
