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

  const addToCart = (id: number, quantity: number, name: string) => {
    const filteredArray = cart.filter(item => item.name !== name);
    filteredArray.push({id, quantity, name});
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
      <Header cart={cart} />
      {data.map(item => {
        return (
          <ShopItemContainer
            name={item.name}
            quant={item.quantity}
            speeduptime={item.speeduptime ? item.speeduptime : null}
            type={item.speeduptime ? 'Fertilizer' : 'Seedling'}
            key={item.id}
            id={item.id}
            addtocart={addToCart}
            handlealert={handleAlert}
          />
        );
      })}
      <div className={styles.alertContainer}>
        {alerts
          ? alerts.map(alert => {
              return (
                <Alert
                  onClose={() => {
                    setAlerts(alerts.filter(item => item !== alert));
                  }}
                  className={styles.alert}
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
