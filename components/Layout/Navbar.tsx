import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
const styles = require('./Navbar.module.scss');

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    Cookies.remove('JWT');
    setIsLoggedIn(false);
  };
  useEffect(() => {
    const cookie = Cookies.get('JWT');
    if (cookie) setIsLoggedIn(true);
  }, []);
  return (
    <div className={styles.containerz}>
      {isLoggedIn ? (
        <Link href="/dashboard">
          <a className={styles.login}>Dashboard</a>
        </Link>
      ) : null}

      {isLoggedIn ? null : (
        <Link href="/login">
          <a className={styles.login}>Login</a>
        </Link>
      )}

      {isLoggedIn ? (
        <a className={styles.logout} onClick={handleLogout}>
          Log out
        </a>
      ) : null}
    </div>
  );
};

export default Navbar;
