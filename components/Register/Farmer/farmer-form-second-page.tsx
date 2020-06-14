import {useState, useEffect} from 'react';
import Router from 'next/router';
import validator from 'validator';
import Cookies from 'js-cookie';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import Alert from '@material-ui/lab/Alert';
const styles = require('../register.module.scss');

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
      return errors;
    }

    if (validator.isEmpty(lastname)) {
      setErrors(prevState => [...prevState, 'Please enter a valid last name!']);
      setLastNameError(true);
      errors = true;
      return errors;
    }

    if (validator.isEmpty(birthday)) {
      setErrors(prevState => [...prevState, 'Please enter a valid birthday!']);
      setBirthdayError(true);
      errors = true;
      return errors;
    }

    if (validator.isEmpty(phonenumber)) {
      setErrors(prevState => [
        ...prevState,
        'Please enter a valid phone number!',
      ]);
      setPhoneError(true);
      errors = true;
      return errors;
    }

    if (validator.isEmpty(birthlocation)) {
      setErrors(prevState => [...prevState, 'Please enter a valid street!']);
      setStreetError(true);
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
      props.handleRegistration();
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
        <InputLabel htmlFor="outlined-adornment-password">
          First Name
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={firstNameError}
          value={firstname}
          onKeyPress={handleEnter}
          onChange={e => {
            setFirstNameError(false);
            setErrors([]);
            setFirstName(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <AccountCircle />
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
          onKeyPress={handleEnter}
          onChange={e => {
            setLastNameError(false);
            setErrors([]);
            setLastName(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <AccountCircle />
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
        onKeyPress={handleEnter}
        onChange={e => {
          setBirthdayError(false);
          setErrors([]);
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
          onKeyPress={handleEnter}
          onChange={e => {
            setStreetError(false);
            setErrors([]);
            setStreet(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <HomeIcon />
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
          onKeyPress={handleEnter}
          onChange={e => {
            setPhoneError(false);
            setErrors([]);
            setPhonenumber(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <PhoneIcon />
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
