import {useState} from 'react';
import Router from 'next/router';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Cookies from 'js-cookie';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import EmailIcon from '@material-ui/icons/Email';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

const styles = require('./form.module.scss');

interface Token {
  isadmin: boolean;
  shortname: string;
}

const form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('farmer');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errors, setErrors] = useState([]);

  const getToken = async () => {
    const cookie = await Cookies.get('JWT');
    if (cookie) {
      jwt.verify(cookie, 'secertToken', async (err, decoded: Token) => {
        if (decoded.isadmin) {
          Router.push('/dashboard');
        } else if (decoded.shortname) {
          Router.push('/orders');
        } else {
          Router.push('/nursery');
        }
      });
    }
  };

  const handleEnter = e => {
    if (e.key == 'Enter') {
      handleLogin();
    }
  };

  const handleErrors = () => {
    let errors = false;
    if (validator.isEmpty(email) || !validator.isEmail(email)) {
      setErrors(prevState => [...prevState, 'Please enter a valid email!']);
      setEmailError(true);
      errors = true;
    }

    if (validator.isEmpty(password)) {
      setErrors(prevState => [...prevState, 'Please enter a valid password!!']);
      setPasswordError(true);
      errors = true;
    }

    return errors;
  };

  const handleLogin = async () => {
    if (handleErrors()) return;
    try {
      let query;

      if (loginType === 'farmer') query = 'https://gardenhouse.tech/login/user';
      else query = 'https://gardenhouse.tech/login/firm';

      const response = await axios.post(query, {
        email: email,
        password: password,
      });

      if (!response.data.status) {
        setErrors(prevState => [...prevState, response.data.message]);
        return;
      }

      Cookies.set('JWT', response.data.token, {expires: 90});
      setEmail('');
      setPassword('');
      getToken();
    } catch (err) {
      setErrors(prevState => [...prevState, err.message]);
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
        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={emailError}
          value={email}
          onKeyPress={handleEnter}
          onChange={e => {
            setEmail(e.target.value);
            setErrors([]);
            setEmailError(false);
          }}
          endAdornment={
            <InputAdornment position="end">
              <EmailIcon />
            </InputAdornment>
          }
          labelWidth={45}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          type="password"
          error={passwordError}
          value={password}
          onKeyPress={handleEnter}
          onChange={e => {
            setPassword(e.target.value);
            setErrors([]);
            setPasswordError(false);
          }}
          endAdornment={
            <InputAdornment position="end">
              <LockOpenIcon />
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

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
        type="submit"
      >
        Login
      </Button>
    </div>
  );
};

export default form;
