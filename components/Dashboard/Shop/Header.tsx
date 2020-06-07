import Cart from './Cart';
const styles = require('./Header.module.scss');

interface Props {
  cart: any[];
  setcart: (value) => void;
}

const Header = ({cart, setcart}: Props) => {
  return (
    <div className={styles.container}>
      <p>Store</p>
      <Cart cart={cart} setcart={setcart} />
    </div>
  );
};

export default Header;
