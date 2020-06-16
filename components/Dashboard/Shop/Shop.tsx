import {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
import ShopItemContainer from './ShopItemContainer';
import Alert from '@material-ui/lab/Alert';
const styles = require('./Shop.module.scss');

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const getStoreItems = async () => {
    const data = await axios.post('https://gardenhouse.tech/shopitem/', {});
    setData(data.data.data);
  };

  const addToCart = (shopitem_id: number, quantity: number, name: string) => {
    const filteredArray = cart.filter(item => item.name !== name);
    filteredArray.push({shopitem_id, quantity, name});
    setCart(filteredArray);
  };

  const handleAlert = text => {
    setAlerts(prevState => [...prevState, text]);
  };

  useEffect(() => {
    getStoreItems();
  }, []);
  return (
    <div className={styles.container}>
      <Header cart={cart} setcart={setCart} />
      {data.map(item => {
        return (
          <ShopItemContainer
            name={item.name}
            quant={item.quantity}
            speeduptime={item.speedup_time ? item.speedup_time : null}
            type={item.type}
            key={item.id}
            id={item.id}
            addtocart={addToCart}
            handlealert={handleAlert}
          />
        );
      })}
      <div className={styles.alertContainer}>
        {alerts
          ? alerts.map((alert, index) => {
              return (
                <Alert
                  onClose={() => {
                    setAlerts(alerts.filter(item => item !== alert));
                  }}
                  className={styles.alert}
                  key={index}
                >
                  {alert} successfuly added to cart!
                </Alert>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Shop;
