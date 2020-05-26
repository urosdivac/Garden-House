import {useEffect} from 'react';
import Link from 'next/link';
import styles from './register.module.scss';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';

const register = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <img src="/assets/Logo.svg" className={styles.logo} />
      </Link>

      <div className={styles.choiceWrapper}>
        <Link href="/farmer">
          <div className={styles.iconWrapper}>
            <PersonIcon className={styles.icon} />
            <p>Register as farmer</p>
          </div>
        </Link>

        <Link href="/buisness">
          <div className={styles.iconWrapper}>
            <StoreIcon className={styles.icon} />
            <p>Register as buisness</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default register;
