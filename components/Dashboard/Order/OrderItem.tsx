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
  cancelorder: (id: number) => void;
  acceptorder: (id: number) => void;
  declineorder: (id: number) => void;
}

const OrderItem = ({
  id,
  orderdate,
  deliverydate,
  status,
  iscompany,
  cancelorder,
  acceptorder,
  declineorder,
}: Props) => {
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
          {deliverydate
            ? moment(deliverydate).format('MMMM Do YYYY, h:mm:ss a')
            : '/'}
        </p>
      </div>

      <div>
        {status === 'pending' ? (
          <p style={{color: 'rgba(244, 179, 0, 1)'}}>Pending</p>
        ) : null}
        {status === 'shipping' ? (
          <p style={{color: 'rgba(48, 196, 126, 1)'}}>Shipping</p>
        ) : null}
        {status === 'cancled' ? (
          <p style={{color: 'rgba(219, 69, 55, 1)'}}>Cancled</p>
        ) : null}

        {status === 'declined' ? (
          <p style={{color: 'rgba(219, 69, 55, 1)'}}>Declined</p>
        ) : null}
      </div>

      <div>
        {iscompany ? (
          status === 'pending' ? (
            <span>
              <CheckIcon
                className={styles.accept}
                onClick={() => acceptorder(id)}
              />
              <BlockIcon
                className={styles.decline}
                onClick={() => declineorder(id)}
              />
            </span>
          ) : (
            '/'
          )
        ) : !iscompany && status === 'pending' ? (
          <BlockIcon
            className={styles.decline}
            onClick={() => cancelorder(id)}
          />
        ) : (
          <p>/</p>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
