import {useEffect, useState} from 'react';
import Heading from './Heading';
import axios from 'axios';
import getToken from '../../../src/getToken';
import OrderItem from './OrderItem';
const styles = require('./Order.module.scss');
interface Token {
  id?: number;
  shortname?: string;
}

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [couriers, setCouriers] = useState(5);
  const [token, setToken] = useState<Token | undefined>();
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredData, setFilteredData] = useState<any[] | undefined>();

  const changeStatusFilter = filter => {
    setStatusFilter(filter);

    if (filter === 'all') {
      setFilteredData(orders);
      return;
    }

    setFilteredData([]);

    orders.forEach(item => {
      if (item.status == filter)
        setFilteredData(prevState => [...prevState, item]);
    });
  };

  const getAvailableCouriers = async () => {
    if (token) {
      if (token.shortname) {
        const data = await axios.post('https://gardenhouse.tech/courier/', {
          id: token.id,
        });
        setCouriers(data.data.data);
      }
    }
  };

  const getOrders = async () => {
    let query: string;
    if (token) {
      if (!token.shortname) {
        query = 'https://gardenhouse.tech/order/user';
        const data = await axios.post(query, {id: token.id});
        setOrders(data.data.data);
        setFilteredData(data.data.data);
      } else {
        query = 'https://gardenhouse.tech/order/';
        const data = await axios.post(query, {name: token.shortname});
        setOrders(data.data.data);
        setFilteredData(data.data.data);
      }
    }
  };

  const cancelOrder = async (id: number) => {
    await axios.post('https://gardenhouse.tech/order/cancel', {orderid: id});
    getOrders();
  };

  const acceptOrder = async (id: number) => {
    try {
      await axios.post('https://gardenhouse.tech/order/acept', {
        orderid: id,
        firm: token.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) setToken(getToken());
    getOrders();
    if (!couriers) getAvailableCouriers();
  }, [token]);

  return (
    <div className={styles.container}>
      <Heading
        couriers={couriers}
        shortname={
          token
            ? token.hasOwnProperty('shortname')
              ? token.shortname
              : null
            : null
        }
      />
      <div className={styles.fields}>
        <div
          className={styles.fieldContainer}
          onClick={() => {
            changeStatusFilter('all');
          }}
        >
          <div
            className={statusFilter === 'all' ? styles.allActive : styles.all}
          >
            <p>All</p>
          </div>
        </div>
        <div
          className={
            statusFilter === 'pending' ? styles.pendingActive : styles.pending
          }
          onClick={() => {
            changeStatusFilter('pending');
          }}
        >
          <div className={styles.pending}>
            <p>Pending</p>
          </div>
        </div>
        <div
          className={
            statusFilter === 'accepted'
              ? styles.acceptedActive
              : styles.accepted
          }
          onClick={() => {
            changeStatusFilter('accepted');
          }}
        >
          <div className={styles.accepted}>
            <p>Accepted</p>
          </div>
        </div>
        <div
          className={
            statusFilter === 'declined'
              ? styles.declinedActive
              : styles.declined
          }
          onClick={() => {
            changeStatusFilter('declined');
          }}
        >
          <div className={styles.declined}>
            <p>Declined</p>
          </div>
        </div>
      </div>
      <div className={styles.labelsContainer}>
        <div>
          <p>ID</p>
        </div>

        <div>
          <p>Order date</p>
        </div>

        <div>
          <p>Delivery Date</p>
        </div>

        <div>
          <p>Status</p>
        </div>

        <div>
          <p>Functions</p>
        </div>
      </div>
      <div className={styles.ordersContainer}>
        {filteredData
          ? filteredData.map(order => {
              return (
                <OrderItem
                  id={order.id}
                  status={order.status}
                  deliverydate={order.delivery_date}
                  orderdate={order.created_at}
                  iscompany={token.shortname}
                  key={order.id}
                  cancelorder={cancelOrder}
                  acceptorder={acceptOrder}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Order;
