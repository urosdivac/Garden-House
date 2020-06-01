import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import styles from './Add-Nursery.module.scss';

const AddNursery = props => {
  return (
    <div className={styles.container}>
      {props.type ? (
        <Button className={styles.addButton} size="large">
          ADD NURSERY
        </Button>
      ) : (
        <Button className={styles.addButtonSecond} size="large">
          +
        </Button>
      )}
    </div>
  );
};

export default AddNursery;
