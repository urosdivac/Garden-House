import {useState, useEffect} from 'react';
import Router from 'next/router';
import validator from 'validator';
import Cookies from 'js-cookie';
import styles from './farmer-form-first-page.module.scss';
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
          onChange={e => {
            setPasswordError(false);
            setPassword(e.target.value);
          }}
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
          error={confirmPasswordError}
          value={confirmPassword}
          onChange={e => {
            setConfirmPasswordError(false);
            setConfirmPassword(e.target.value);
          }}
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
          error={emailError}
          value={email}
          onChange={e => {
            setEmailError(false);
            setEmail(e.target.value);
          }}
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
        onClick={handleRegistration}
      >
        Continue
      </Button>
    </div>
  );
};

export default form;
