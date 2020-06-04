import Link from 'next/link';
const styles = require('./Panel-Item.module.scss');

interface Props {
  logout?: () => void;
  icon?: JSX.Element;
  location: string;
  isActive?: boolean;
  text?: string;
}

const Panel = ({location, icon, logout, isActive, text}: Props) => {
  const handleLogOut = () => {
    if (logout) logout();
  };

  return (
    <Link href={location}>
      <div className={styles.containerWrapper} onClick={handleLogOut}>
        {isActive ? (
          <div className={styles.containerActive}>
            <span className={styles.iconWrapperActive}>{icon}</span>
            <span className={styles.textWrapperActive}>
              <p className={styles.textActive}>{text}</p>
            </span>
          </div>
        ) : (
          <div className={styles.container}>
            <span className={styles.iconWrapper}>{icon}</span>
            <span className={styles.textWrapper}>
              <p className={styles.text}>{text}</p>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Panel;
