import moment from 'moment';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
const styles = require('./OrderItem.module.scss');

interface Props {
  id: number;
  orderdate: Date;
  deliverydate?: Date;
  status: string;
  iscompany: string;
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const OrderItem = ({id, orderdate, deliverydate, status, iscompany}: Props) => {
  return (
    <div className={styles.container}>
      <div>
        <p>{id}</p>
      </div>

      <div>
        <p>{moment(orderdate).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>

      <div>
        <p>
          {deliverydate ? (
            moment(deliverydate).format('MMMM Do YYYY, h:mm:ss a')
          ) : (
            <p>/</p>
          )}
        </p>
      </div>

      <div>
        <p>{capitalizeFirstLetter(status)}</p>
      </div>

      <div>
        {iscompany ? (
          <span>
            <CheckIcon className={styles.accept} />
            <BlockIcon className={styles.decline} />
          </span>
        ) : !iscompany && status === 'pending' ? (
          <BlockIcon className={styles.decline} />
        ) : (
          <p>/</p>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
