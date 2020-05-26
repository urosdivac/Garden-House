import {useState} from 'react';
import Form from '../components/Register/Farmer/form';
import styles from './farmerRegistration.module.scss';
const farmerRegistration = () => {
  const [registrationStep, setRegistrationStep] = useState(1);
  return (
    <div className={styles.container}>
      <Form />
    </div>
  );
};

export default farmerRegistration;
