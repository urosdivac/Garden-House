import React from "react";
import styles from "./Card.module.scss";

const Card = (props) => {
  return (
    <div className={styles.container}>
      {props.icon}
      <p className={styles.featureName}>{props.featureName}</p>
      <p className={styles.featureDescp}>{props.featureDescp}</p>
    </div>
  );
};

export default Card;
