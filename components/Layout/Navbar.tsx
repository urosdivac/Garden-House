import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import getToken from '../../src/getToken';
const styles = require('./Navbar.module.scss');

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<{isadmin: boolean} | undefined>();
  const [navigation, setNavigation] = useState('/');

  const handleLogout = () => {
    Cookies.remove('JWT');
    setIsLoggedIn(false);
  };

  const getNavigation = () => {
    if (token) {
      if (token.isadmin) {
        setNavigation('/dashboard');
      } else if (!token.isadmin) {
        setNavigation('/nursery');
      } else {
        setNavigation('/dashboard');
      }
    }
    console.log(token)
  };

  useEffect(() => {
    const cookie = Cookies.get('JWT');
    if (cookie) setIsLoggedIn(true);
    if (!token) setToken(getToken());
    getNavigation();
  }, [token]);

  return (
    <div className={styles.containerz}>
      {isLoggedIn ? (
        <Link href={navigation}>
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
