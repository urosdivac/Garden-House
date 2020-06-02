import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './Add-Nursery.module.scss';

const AddNursery = props => {
  return (
    <div className={styles.container} onClick={() => props.handleopen()}>
      {props.type ? (
        <Button className={styles.addButton} size="large">
          ADD NURSERY
        </Button>
      ) : (
        <div className={styles.addButtonSecondContainer}>
          <Button className={styles.addButtonSecond} size="large">
            +
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddNursery;
