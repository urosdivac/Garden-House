const styles = require('./Fields.module.scss');

const Fields = () => {
  return (
    <div className={styles.container}>
      <div>
        <p>Type</p>
      </div>
      <div>
        <p>Name</p>
      </div>
      <div>
        <p>Quantity</p>
      </div>
      <div>
        <p>SpeedUp Time</p>
      </div>
    </div>
  );
};

export default Fields;
