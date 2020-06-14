import Link from 'next/link';
import Head from 'next/head';
const styles = require('./successfulorder.module.scss');
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const RegistrationCompleted = () => {
  return (
    <div className={styles.container}>
      <img src="/assets/order.svg" className={styles.image} />
      <div className={styles.innerContainer}>
        <img src="/assets/Logo-Green.svg" alt="success"  className={styles.logo}/>
        <p>Registration completed successfully!</p>
        <p className={styles.adminMessage}>
          You will be able to login once administrator approves your request
        </p>
        
        <Link href="/">
          <Button
            className={styles.button}
            startIcon={<ArrowBackIcon className={styles.flower} />}
          >
            Go back to homepage
          </Button>
        </Link>
      </div>

      <Head>
        <title>Successful Registration - Garden House</title>

        <meta
          name="Description"
          content="Your registration was successful."
        ></meta>
      </Head>
    </div>
  );
};

export default RegistrationCompleted;
