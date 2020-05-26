import {useState, useEffect} from 'react';
import Router from 'next/router';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Cookies from 'js-cookie';
import styles from './form.module.scss';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <AccountCircle />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          type="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <LockOpenIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          type="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <LockOpenIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={135}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          type="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <EmailIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={45}
        />
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        size="large"
        onClick={handleLogin}
      >
        Continue
      </Button>
    </div>
  );
};

export default form;
