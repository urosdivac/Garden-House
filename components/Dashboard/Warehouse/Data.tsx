import React from 'react';
const styles = require('./Data.module.scss');

interface Props {
  type: string;
  name: string;
  quantity: number;
  speeduptime?: number;
}

const Data = ({type, name, quantity, speeduptime}: Props) => {
  return (
    <div className={styles.container}>
      <div>
        <p>{type}</p>
      </div>
      <div>
        <p>{name}</p>
      </div>
      <div>
        <p>{quantity}</p>
      </div>
      <div>
        <p>{speeduptime ? speeduptime : '/'}</p>
      </div>
    </div>
  );
};

export default Data;
