import {useState} from 'react';
import Link from 'next/link';
import Form from '../components/Register/Farmer/form';
import Form2 from '../components/Register/Farmer/form2';
import styles from './farmerRegistration.module.scss';
const farmerRegistration = () => {
  const [registrationStep, setRegistrationStep] = useState(1);

  const changeStep = step => {
    setRegistrationStep(step);
  };
  return (
    <div className={styles.container}>
      <Link href='/'>
        <img src="/assets/Logo.svg" className={styles.logo} />
      </Link>
      {registrationStep === 1 ? (
        <Form changeStep={changeStep} />
      ) : (
        <Form2 changeStep={changeStep} />
      )}
    </div>
  );
};

export default farmerRegistration;
