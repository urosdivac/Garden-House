import React from 'react';
import Button from '@material-ui/core/Button';
const styles = require('./Add-Nursery.module.scss');

interface Props {
  handleopen(): void;
  type: number;
}

const AddNursery = ({handleopen, type}: Props) => {
  return (
    <div className={styles.container} onClick={() => handleopen()}>
      {type ? (
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
