import {useState, useEffect} from 'react';
import Router from 'next/router';
import axios from 'axios';
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [errors, setErrors] = useState([]);

  // Checks if user is logged in
  useEffect(() => {
    const cookie = Cookies.get('JWT');
    if (cookie) Router.push('/');
  }, []);

  const goBack = () => {
    props.changeStep(1);
  };

  const handleErrors = () => {
    let errors = false;

    if (validator.isEmpty(username)) {
      setErrors(prevState => [...prevState, 'Please enter a valid username!']);
      setUsernameError(true);
      errors = true;
      setTimeout(() => setErrors([]), 3000);
      return errors;
    }

    if (validator.isEmpty(password)) {
      setErrors(prevState => [...prevState, 'Please enter a valid password!']);
      setPasswordError(true);
      errors = true;
      setTimeout(() => setErrors([]), 3000);
      return errors;
    }

    if (password !== confirmPassword) {
      setErrors(prevState => [...prevState, 'Passwords are not matching!']);
      setConfirmPasswordError(true);
      errors = true;
      setTimeout(() => setErrors([]), 3000);
      return errors;
    }

    if (validator.isEmpty(email) || !validator.isEmail(email)) {
      setErrors(prevState => [...prevState, 'Please enter a valid email!']);
      setEmailError(true);
      errors = true;
      setTimeout(() => setErrors([]), 3000);
      return errors;
    }

    return errors;
  };

  const handleRegistration = async () => {
    try {
      if (handleErrors()) return;
      goBack();
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
        <InputLabel htmlFor="outlined-adornment-password">
          First Name
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={usernameError}
          value={username}
          onChange={e => {
            setUsernameError(false);
            setUsername(e.target.value);
          }}
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
        <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={usernameError}
          value={username}
          onChange={e => {
            setUsernameError(false);
            setUsername(e.target.value);
          }}
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
