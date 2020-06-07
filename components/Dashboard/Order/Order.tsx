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
  const [token, setToken] = useState<Token | undefined>();
  const [statusFilter, setStatusFilter] = useState('declined');
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

  const getOrders = async () => {
    let query: string;
    if (token) {
      if (!token.shortname) {
        query = 'https://gardenhouse.tech/order/user';
        const data = await axios.post(query, {id: token.id});
        console.log(data);
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

  useEffect(() => {
    if (!token) setToken(getToken());
    getOrders();
  }, [token]);

  return (
    <div className={styles.container}>
      <Heading />
      <div className={styles.fields}>
        <div
          className={styles.fieldContainer}
          onClick={() => {
            changeStatusFilter('all');
          }}
        >
          <div className={styles.all}>
            <p>All</p>
          </div>
        </div>
        <div
          className={styles.fieldContainer}
          onClick={() => {
            changeStatusFilter('pending');
          }}
        >
          <div className={styles.pending}>
            <p>Pending</p>
          </div>
        </div>
        <div
          className={styles.fieldContainer}
          onClick={() => {
            changeStatusFilter('accepted');
          }}
        >
          <div className={styles.accepted}>
            <p>Accepted</p>
          </div>
        </div>
        <div
          className={styles.fieldContainer}
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
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Order;
