import {useState} from 'react';
import validator from 'validator';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddNursery from './Add-Nursery';
import styles from './Modal.module.scss';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

export default function TransitionsModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAdddress] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [errors, setErrors] = useState('');
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [widthError, setWidthError] = useState(false);

  const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid rgba(0,0,0,0.1)',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  const checkErrors = () => {
    if (validator.isEmpty(name)) {
      setNameError(true);
      setErrors('Please enter a valid name');
      return true;
    }

    if (validator.isEmpty(address)) {
      setAddressError(true);
      setErrors('Please enter a valid address');
      return true;
    }

    if (validator.isEmpty(length) || !validator.isNumeric(length)) {
      setLengthError(true);
      setErrors('Please enter a valid length');
      return true;
    }

    if (validator.isEmpty(width) || !validator.isNumeric(width)) {
      setWidthError(true);
      setErrors('Please enter a valid width');
      return true;
    }
    return false;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName('');
    setAdddress('');
    setLength('');
    setWidth('');
    setOpen(false);
  };

  const addNursery = () => {
    if (!checkErrors()) {
      props.addNursery(name, address, length, width);
      handleClose();
    }
  };

  return (
    <div>
      <AddNursery handleopen={handleOpen} />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={styles.container}>
            {errors ? <Alert severity="error">{errors}</Alert> : null}
            <p id="transition-modal-title" className={styles.heading}>
              Add new nursery
            </p>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              className={styles.input}
              error={nameError}
              value={name}
              onChange={e => {
                setName(e.target.value);
                setNameError(false);
              }}
            />

            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              className={styles.input}
              error={addressError}
              value={address}
              onChange={e => {
                setAdddress(e.target.value);
                setAddressError(false);
              }}
            />

            <TextField
              id="outlined-basic"
              label="Length"
              variant="outlined"
              className={styles.input}
              error={lengthError}
              value={length}
              onChange={e => {
                setLength(e.target.value);
                setLengthError(false);
              }}
            />

            <TextField
              id="outlined-basic"
              label="Width"
              variant="outlined"
              className={styles.input}
              error={widthError}
              value={width}
              onChange={e => {
                setWidth(e.target.value);
                setWidthError(false);
              }}
            />
            <div className={styles.buttonContainer}>
              <Button
                variant="contained"
                className={styles.cancel}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className={styles.confirm}
                onClick={addNursery}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
