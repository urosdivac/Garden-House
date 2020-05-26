import {useState, useEffect} from 'react';
import Router from 'next/router';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Cookies from 'js-cookie';
import styles from './form.module.scss';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('farmer');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errors, setErrors] = useState([]);

  // Checks if user is logged in
  useEffect(() => {
    const cookie = Cookies.get('JWT');
    if (cookie) {
      jwt.verify(cookie, 'secertToken', (err, user) => {
        if (user.isaccepted === 'accepted') {
          Router.push('/');
        }
      });
    }
  }, []);

  const handleErrors = () => {
    let errors = 0;
    if (validator.isEmpty(email) || !validator.isEmail(email)) {
      setErrors(prevState => [...prevState, 'Please enter a valid email!']);
      setEmailError(true);
      errors = 1;
    }

    if (validator.isEmpty(password)) {
      setErrors(prevState => [...prevState, 'Please enter a valid password!!']);
      setPasswordError(true);
      errors = 1;
    }

    setTimeout(() => setErrors([]), 5000);
    return errors;
  };

  const handleLogin = async () => {
    if (handleErrors()) return;
    try {
      const response = await axios.post('http://localhost:3001/login/user', {
        email: email,
        password: password,
      });

      if (!response.data.status) {
        setErrors(prevState => [...prevState, response.data.message]);
        return;
      }

      Cookies.set('JWT', response.data.token);
    } catch (err) {
      setErrors(prevState => [...prevState, err.message]);
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.errorWrapper}>
        {errors.map((error, key) => (
          <Alert severity="error" className={styles.error} key={key}>
            {error}
          </Alert>
        ))}
      </div>

      <TextField
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        className={styles.input}
        error={emailError}
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          setEmailError(false);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        className={styles.input}
        error={passwordError}
        value={password}
        onChange={e => {
          setPassword(e.target.value);
          setPasswordError(false);
        }}
      />

      <div className={styles.radio}>
        <p>Login as</p>

        <RadioGroup
          row
          aria-label="gender"
          name="gender1"
          value={loginType}
          onChange={e => setLoginType(e.target.value)}
        >
          <FormControlLabel value="farmer" control={<Radio />} label="Farmer" />
          <FormControlLabel
            value="company"
            control={<Radio />}
            label="Company"
          />
        </RadioGroup>
      </div>

      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        size="large"
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default form;
