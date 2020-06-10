import Link from 'next/link';
import Head from 'next/head'
const styles = require('./successfulorder.module.scss');
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const successfulorder = () => {
  return (
    <div className={styles.container}>
      <img src="/assets/order.svg" className={styles.image} />
      <div className={styles.innerContainer}>
        <img src="/assets/Logo-Green.svg" alt="success" />
        <p>Your order was successfully placed!</p>
        <Link href="/shop">
          <Button
            className={styles.button}
            startIcon={<ArrowBackIcon className={styles.flower} />}
          >
            Go back to shop
          </Button>
        </Link>
      </div>

      <Head>
        <title>Successful Order - Garden House</title>

        <meta
          name="Description"
          content="Your order was successful."
        ></meta>
      </Head>
    </div>
  );
};

export default successfulorder;
