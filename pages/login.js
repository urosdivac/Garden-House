import styles from './login.module.scss';
import Form from '../components/Login/form';
import Link from 'next/link';

const login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/">
          <img src="/assets/Logo.svg" className={styles.logo} alt="logo" />
        </Link>
      </div>
      <Form />
    </div>
  );
};

export default login;
