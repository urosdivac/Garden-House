import styles from "./secondBlock.module.scss";
import React from "react";

import Button from "@material-ui/core/Button";

const secondBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.headz}>Hi</h1>
      </div>
      <Button variant="contained" color="primary">
        Primary
      </Button>
    </div>
  );
};

export default secondBlock;
