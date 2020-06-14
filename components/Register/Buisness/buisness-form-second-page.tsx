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
import Alert from '@material-ui/lab/Alert';
const styles = require('../register.module.scss');

const form = props => {
  const {
    fullname,
    shortname,
    location,
    foundeddate,
    setfullname,
    setshortname,
    setlocation,
    setfoundeddate,
  } = props;

  const [fullNameError, setFullNameError] = useState(false);
  const [shortNameError, setShortNameError] = useState(false);
  const [locationError, setLocationErropr] = useState(false);
  const [foundedDateError, setFoundedDateError] = useState(false);
  const [errors, setErrors] = useState([]);

  // Checks if user is logged in and redicrects him
  useEffect(() => {
    const cookie = Cookies.get('JWT');
    if (cookie) Router.push('/');
  }, []);

  const goBack = () => {
    props.changeStep(1);
  };

  const handleErrors = () => {
    let errors = false;

    if (validator.isEmpty(fullname)) {
      setErrors(prevState => [...prevState, 'Please enter a valid full name!']);
      setFullNameError(true);
      errors = true;
      return errors;
    }

    if (validator.isEmpty(shortname)) {
      setErrors(prevState => [
        ...prevState,
        'Please enter a valid short name!',
      ]);
      setShortNameError(true);
      errors = true;
      return errors;
    }

    if (validator.isEmpty(foundeddate)) {
      setErrors(prevState => [...prevState, 'Please enter a valid date!']);
      setFoundedDateError(true);
      errors = true;
      return errors;
    }

    if (validator.isEmpty(location)) {
      setErrors(prevState => [...prevState, 'Please enter a valid location!']);
      setLocationErropr(true);
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
        <InputLabel htmlFor="outlined-adornment-password">Full Name</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={fullNameError}
          value={fullname}
          onKeyPress={handleEnter}
          onChange={e => {
            setFullNameError(false);
            setErrors([]);
            setfullname(e.target.value);
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
        <InputLabel htmlFor="outlined-adornment-password">
          Short Name
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={shortNameError}
          value={shortname}
          onKeyPress={handleEnter}
          onChange={e => {
            setShortNameError(false);
            setErrors([]);
            setshortname(e.target.value);
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
        label="Founded date"
        value={foundeddate}
        error={foundedDateError}
        onKeyPress={handleEnter}
        onChange={e => {
          setFoundedDateError(false);
          setErrors([]);
          setfoundeddate(e.target.value);
        }}
        type="date"
        variant="outlined"
        defaultValue="2020-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Location</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className={styles.input}
          error={locationError}
          value={location}
          onKeyPress={handleEnter}
          onChange={e => {
            setLocationErropr(false);
            setErrors([]);
            setlocation(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <HomeIcon />
            </InputAdornment>
          }
          labelWidth={42}
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
