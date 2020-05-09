import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.containerz}>
      <Link href="/login">
        <a className={styles.login}>Login</a>
      </Link>
    </div>
  );
};

export default Navbar;
