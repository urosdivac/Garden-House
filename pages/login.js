import styles from "./login.module.scss";
import Form from "../components/Login/form";

const login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/assets/Logo.svg" className={styles.logo} alt='logo'/>
      </div>
      <Form />
    </div>
  );
};

export default login;
