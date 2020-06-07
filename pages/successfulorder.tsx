import Link from 'next/link';
const styles = require('./successfulorder.module.scss');
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const successfulorder = () => {
  return (
    <div className={styles.container}>
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
  );
};

export default successfulorder;
