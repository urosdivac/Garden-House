import React from 'react';
import styles from './DataField.module.scss';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import axios from 'axios';

const DataField = props => {
  const acceptUser = async id => {};
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p>{props.id}</p>
      </div>
      <div className={styles.field}>
        <p>{props.firstname}</p>
      </div>
      <div className={styles.field}>
        <p>{props.lastname}</p>
      </div>
      <div className={styles.field}>
        <p>{props.username}</p>
      </div>
      <div className={styles.field}>
        <p>{props.createdat}</p>
      </div>
      <div className={styles.field}>
        <p>{props.birthday}</p>
      </div>
      <div className={styles.field}>
        <p>{props.phonenumber}</p>
      </div>
      <div className={styles.field}>
        <p>{props.email}</p>
      </div>
      <div className={styles.field}>
        <p>
          {props.isaccepted === 'pending' ? (
            <div className={styles.functionWrapper}>
              <CheckIcon className={styles.accept} />
              <BlockIcon className={styles.decline} />
            </div>
          ) : null}

          {props.isaccepted === 'accepted' ? (
            <p className={styles.accepted}>Accepted</p>
          ) : null}

          {props.isaccepted === 'declined' ? (
            <p className={styles.declined}>Declined</p>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default DataField;
