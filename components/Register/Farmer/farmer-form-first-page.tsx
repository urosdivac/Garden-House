import {useState, useEffect} from 'react';
import Router from 'next/router';
import validator from 'validator';
import Cookies from 'js-cookie';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputLabel from '@material-ui/core/InputLabel';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
const styles = require('../register.module.scss');

const form = props => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = props;

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [errors, setErrors] = useState([]);

  const goForward = () => {
    props.changeStep(2);
  };

  // Checks if user is logged in
  useEffect(() => {
    const cookie = Cookies.get('JWT');
    if (cookie) Router.push('/');
  }, []);

  const handleErrors = () => {
    let errors = false;

    if (validator.isEmpty(username)) {
      setErrors(prevState => [...prevState, 'Please enter a valid username!']);
      setUsernameError(true);
      errors = true;
      return errors;
    }

    if (validator.isEmpty(password)) {
      setErrors(prevState => [...prevState, 'Please enter a valid password!']);
      setPasswordError(true);
      errors = true;
      return errors;
    }

    if (password !== confirmPassword) {
      setErrors(prevState => [...prevState, 'Passwords are not matching!']);
      setConfirmPasswordError(true);
      errors = true;
      return errors;
    }

    if (validator.isEmpty(email) || !validator.isEmail(email)) {
      setErrors(prevState => [...prevState, 'Please enter a valid email!']);
      setEmailError(true);
      errors = true;
      return errors;
    }

    return errors;
  };

  const handleEnter = e => {
    if (e.key == 'Enter') {
      handleRegistration();
    }
  };

  const handleRegistration = async () => {
    try {
      if (handleErrors()) return;
      goForward();
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
          error={usernameError}
          value={username}
          onKeyPress={handleEnter}
          onChange={e => {
            setUsernameError(false);
            setErrors([]);
            setUsername(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          }
          labelWidth={75}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={passwordError}
          value={password}
          onKeyPress={handleEnter}
          onChange={e => {
            setPasswordError(false);
            setErrors([]);
            setPassword(e.target.value);
          }}
          type="password"
          endAdornment={
            <InputAdornment position="end">
              <LockOpenIcon />
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
          error={confirmPasswordError}
          value={confirmPassword}
          onKeyPress={handleEnter}
          onChange={e => {
            setConfirmPasswordError(false);
            setErrors([]);
            setConfirmPassword(e.target.value);
          }}
          type="password"
          endAdornment={
            <InputAdornment position="end">
              <LockOpenIcon />
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
          error={emailError}
          value={email}
          onKeyPress={handleEnter}
          onChange={e => {
            setEmailError(false);
            setErrors([]);
            setEmail(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <EmailIcon />
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
        onClick={handleRegistration}
      >
        Continue
      </Button>
    </div>
  );
};

export default form;
