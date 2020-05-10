import React from "react";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import styles from "./secondBlock.module.scss";
import Card from "./Card";

const secondBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Card
          icon={<InvertColorsIcon className={styles.icon} />}
          featureName="Monitor water levels"
          featureDescp="Garden house allows you to monitor water levels of your plants 24/7."
        />
        <Card
          icon={<Brightness5Icon className={styles.icon} />}
          featureName="Adjust temeprature"
          featureDescp="With our dashboard you can adjust temeprature remotely!"
        />
        <Card
          icon={<LocalFloristIcon className={styles.icon} />}
          featureName="Plant seeds"
          featureDescp="Plant new seeds with a click of a button!"
        />
        <Card
          icon={<ShoppingCartIcon className={styles.icon} />}
          featureName="Browser our shop"
          featureDescp="Order freshest seeds for best price from our online shop."
        />
      </div>
    </div>
  );
};

export default secondBlock;
