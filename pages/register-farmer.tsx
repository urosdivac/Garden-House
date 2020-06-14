import {useState} from 'react';
import axios from 'axios';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Form from '../components/Register/Farmer/farmer-form-first-page';
import Form2 from '../components/Register/Farmer/farmer-form-second-page';
const styles = require('./register-farmer.module.scss');

const farmerRegistration = () => {
  const [registrationStep, setRegistrationStep] = useState(1);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthlocation, setStreet] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');

  const changeStep = step => {
    setRegistrationStep(step);
  };

  const handleRegistration = async () => {
    const query = `https://gardenhouse.tech/register/user`;
    await axios.post(query, {
      firstname,
      lastname,
      username: username.toLowerCase().trim(),
      password,
      birthday,
      birthlocation,
      phonenumber,
      email: email.toLowerCase().trim(),
    });
    
    Router.push('/registrationcompleted');
  };
  return (
    <div className={styles.container}>
      <Link href="/">
        <img src="/assets/Logo.svg" className={styles.logo} alt="logo" />
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
          firstname={firstname}
          setFirstName={setFirstName}
          lastname={lastname}
          setLastName={setLastName}
          birthday={birthday}
          setBirthday={setBirthday}
          phonenumber={phonenumber}
          setPhonenumber={setPhonenumber}
          birthlocation={birthlocation}
          setStreet={setStreet}
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

export default farmerRegistration;
