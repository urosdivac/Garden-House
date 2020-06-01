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

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(true);
  const [name, setName] = useState('');
  const [address, setAdddress] = useState('');
  const [length, setLength] = useState();
  const [width, setWidth] = useState();
  const [errors, setErrors] = useState([]);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div onClick={handleOpen}>
      <AddNursery onClick={handleOpen}>react-transition-group</AddNursery>
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
              }}
            />
            <div className={styles.buttonContainer}>
              <Button variant="contained" className={styles.cancel}>
                Cancel
              </Button>
              <Button variant="contained" className={styles.confirm}>
                Confirm
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
