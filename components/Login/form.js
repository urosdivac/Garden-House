import {useState} from 'react';
import axios from 'axios';
import validator from 'validator';
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

    setTimeout(() => setErrors([]), 3000);
    return errors;
  };

  const handleLogin = () => {
    // if (handleErrors()) return;
    try {
      //   const response = await axios.post('http://localhost:3001/login/user', {
      //     email: email,
      //     password: password,
      //   });

      axios
        .post('http://localhost:3001/login/user', {
          firstname: 'Davidica',
          lastname: 'Suki',
          username: 'test',
          password: '123123',
          birthday: "'1980-01-01'",
          birthlocation: 'Balkansa 19',
          phonenumber: '493943',
          email: 'test@gmail.com',
          isAdmin: true,
        })
        .then(data => {
          console.log(data);
        });

      console.log();
    } catch (err) {
      setErrors(prevState => [...prevState, err.message]);
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      {errors.map(error => (
        <Alert severity="error" className={styles.error}>
          {error}
        </Alert>
      ))}

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
