const styles = require('./Heading.module.scss');

interface Props {
  couriers: number;
  shortname: string;
}

const Heading = ({couriers, shortname}: Props) => {
  return (
    <div className={styles.container}>
      <p>Orders {shortname ? `- Available couriers ${couriers} / 5` : null}</p>
    </div>
  );
};

export default Heading;
