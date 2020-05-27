import {useState, useEffect} from 'react';
import Router from 'next/router';
import validator from 'validator';
import Cookies from 'js-cookie';
import styles from './farmer-form-second-page.module.scss';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import Alert from '@material-ui/lab/Alert';

const form = props => {
  const {
    firstname,
    lastname,
    phonenumber,
    birthlocation,
    birthday,
    setFirstName,
    setLastName,
    setPhonenumber,
    setStreet,
    setBirthday,
  } = props;
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
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

    if (validator.isEmpty(firstname)) {
      setErrors(prevState => [
        ...prevState,
        'Please enter a valid first name!',
      ]);
      setFirstNameError(true);
      errors = true;
      setTimeout(() => setErrors([]), 3000);
      return errors;
    }

    if (validator.isEmpty(lastname)) {
      setErrors(prevState => [...prevState, 'Please enter a valid last name!']);
      setLastNameError(true);
      errors = true;
      setTimeout(() => setErrors([]), 3000);
      return errors;
    }

    if (validator.isEmpty(birthday)) {
      setErrors(prevState => [...prevState, 'Please enter a valid birthday!']);
      setBirthdayError(true);
      errors = true;
      setTimeout(() => setErrors([]), 3000);
      return errors;
    }

    if (validator.isEmpty(phonenumber)) {
      setErrors(prevState => [
        ...prevState,
        'Please enter a valid phone number!',
      ]);
      setPhoneError(true);
      errors = true;
      setTimeout(() => setErrors([]), 3000);
      return errors;
    }

    if (validator.isEmpty(birthlocation)) {
      setErrors(prevState => [...prevState, 'Please enter a valid street!']);
      setStreetError(true);
      errors = true;
      setTimeout(() => setErrors([]), 3000);
      return errors;
    }

    return errors;
  };

  const handleRegistration = async () => {
    try {
      if (handleErrors()) return;
      props.handleRegistration();
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
          error={firstNameError}
          value={firstname}
          onChange={e => {
            setFirstNameError(false);
            setFirstName(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <AccountCircle />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={80}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={lastNameError}
          value={lastname}
          onChange={e => {
            setLastNameError(false);
            setLastName(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <AccountCircle />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={80}
        />
      </FormControl>

      <TextField
        id="date"
        className={styles.input}
        label="Birthday"
        value={birthday}
        error={birthdayError}
        onChange={e => {
          setBirthdayError(false);
          setBirthday(e.target.value);
        }}
        type="date"
        variant="outlined"
        defaultValue="2020-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Street</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={streetError}
          value={birthlocation}
          onChange={e => {
            setStreetError(false);
            setStreet(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <HomeIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={42}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Phone Number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={phoneError}
          value={phonenumber}
          onChange={e => {
            setPhoneError(false);
            setPhonenumber(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <PhoneIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={110}
        />
      </FormControl>

      <div className={styles.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          size="large"
          onClick={goBack}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          size="large"
          onClick={handleRegistration}
        >
          Complete
        </Button>
      </div>
    </div>
  );
};

export default form;
