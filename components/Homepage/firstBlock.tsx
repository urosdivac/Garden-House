import {useEffect, useState} from 'react';
const styles = require('./firstBlock.module.scss');

const firstBlock = () => {
  const [pictureUrl, setPictureUrl] = useState('');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    if (mq.matches) {
      setPictureUrl('/assets/adminPageMobile.png');
    } else {
      setPictureUrl('/assets/adminPage.jpg');
    }
  }, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Manage your nurseries from the comfort of your home
      </h2>
      <div className={styles.innerContainer}>
        <div className={styles.leftSide}>
          <div className={styles.textWrapper}>
            <p className={styles.smallHeader}>
              Take care of your plants with click of a button
            </p>

            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi id
              voluptates explicabo pariatur temporibus quae quas autem. Soluta,
              aliquid ipsa.
            </p>
          </div>

          <div className={styles.textWrapper}>
            <p className={styles.smallHeader}>
              Browser our online shop for freshest seeds
            </p>

            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi id
              voluptates explicabo pariatur temporibus quae quas autem. Soluta,
              aliquid ipsa.
            </p>
          </div>
        </div>

        <div className={styles.rightSide}>
          <img src={pictureUrl} alt="adimin page" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default firstBlock;
