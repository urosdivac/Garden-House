import {useState} from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Form from '../components/Register/Farmer/farmer-form-first-page';
import Form2 from '../components/Register/Farmer/farmer-form-second-page';
import styles from './register-farmer.module.scss';

const buisnessRegistration = () => {
  const [registrationStep, setRegistrationStep] = useState(1);
  const [fullname, setfullname] = useState('');
  const [shortname, setshortname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [foundeddate, setfoundeddate] = useState('');
  const [location, setlocation] = useState('');
  const [email, setEmail] = useState('');

  const changeStep = step => {
    setRegistrationStep(step);
  };

  const handleRegistration = async () => {
    const query = `https://gardenhouse.tech/register/user`;
    await axios.post(query, {
      fullname,
      shortname,
      password,
      foundeddate,
      location,
      email: email.toLowerCase().trim(),
    });
  };
  return (
    <div className={styles.container}>
      <Link href="/">
        <img src="/assets/Logo.svg" className={styles.logo} alt="logo" />
      </Link>
      {registrationStep === 1 ? (
        <Form
          changeStep={changeStep}
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
          fullname={fullname}
          setFirstName={setFirstName}
          shortname={shortname}
          setshortname={setshortname}
          foundeddate={foundeddate}
          setfoundeddate={setfoundeddate}
          location={location}
          location={setlocation}
          handleRegistration={handleRegistration}
        />
      )}
      <Head>
        <title>Farmer Registration - Garden House</title>
        <meta name="Description" content="Page for farmer registration."></meta>
      </Head>
    </div>
  );
};

export default buisnessRegistration;
