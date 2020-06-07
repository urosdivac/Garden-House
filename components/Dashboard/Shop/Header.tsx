import Cart from './Cart';
const styles = require('./Header.module.scss');

interface Props {
  cart: any[];
}

const Header = ({cart}:Props) => {
  return (
    <div className={styles.container}>
      <p>Store</p>
      <Cart cart={cart}/>
    </div>
  );
};

export default Header;
