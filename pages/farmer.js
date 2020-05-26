import {useState} from 'react';
import Link from 'next/link';
import Form from '../components/Register/Farmer/form';
import Form2 from '../components/Register/Farmer/form2';
import styles from './farmerRegistration.module.scss';
const farmerRegistration = () => {
  const [registrationStep, setRegistrationStep] = useState(2);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');

  const changeStep = step => {
    setRegistrationStep(step);
  };
  return (
    <div className={styles.container}>
      <Link href="/">
        <img src="/assets/Logo.svg" className={styles.logo} />
      </Link>
      {registrationStep === 1 ? (
        <Form
          changeStep={changeStep}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          email={email}
          setEmail={setEmail}
        />
      ) : (
        <Form2
          changeStep={changeStep}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          birthday={birthday}
          setBirthday={setBirthday}
          numer={number}
          setNumber={setNumber}
          street={street}
          setStreet={setStreet}
        />
      )}
    </div>
  );
};

export default farmerRegistration;
