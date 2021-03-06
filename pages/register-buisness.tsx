import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import Form from '../components/Register/Buisness/buisness-form-first-page';
import Form2 from '../components/Register/Buisness/buisness-form-second-page';
import getToken from '../src/getToken';
const styles = require('./register-farmer.module.scss');

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

  // Checks if user is logged in and redicrects him
  useEffect(() => {
    const cookie = getToken();
    if (cookie) Router.push('/');
  }, []);

  const handleRegistration = async () => {
    try {
      const query = `https://gardenhouse.tech/register/firm`;
      await axios.post(query, {
        fullname,
        shortname,
        password,
        foundeddate,
        location,
        email: email.toLowerCase().trim(),
      });
      Router.push('/registrationcompleted');
    } catch (err) {
      console.log(err);
    }
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
          setfullname={setfullname}
          shortname={shortname}
          setshortname={setshortname}
          foundeddate={foundeddate}
          setfoundeddate={setfoundeddate}
          location={location}
          setlocation={setlocation}
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
