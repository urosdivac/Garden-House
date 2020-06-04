import React from 'react';
const styles = require('./Card.module.scss');

const Card = props => {
  return (
    <div className={styles.container}>
      {props.icon}
      <p className={styles.featureName}>{props.featureName}</p>
      <p className={styles.featureDescp}>{props.featureDescp}</p>
    </div>
  );
};

export default Card;
