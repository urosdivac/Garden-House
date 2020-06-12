import {useState, useEffect} from 'react';
import validator from 'validator';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import getToken from '../../../src/getToken';
import axios from 'axios';
const styles = require('./NewItem.module.scss');

interface Token {
  id: number;
}

export default function TransitionsModal() {
  const [open, setOpen] = useState(true);
  const [token, setToken] = useState<Token>();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [speeduptime, setSpeedupTime] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState('');
  const [nameError, setNameError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [speedupTimeError, setSpeedupTimeError] = useState(false);

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

  const useStylesz = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }),
  );

  const classes = useStyles();

  const classez = useStylesz();

  const checkErrors = () => {
    if (validator.isEmpty(name)) {
      setNameError(true);
      setErrors('Please enter a valid name');
      return true;
    }

    if (validator.isEmpty(quantity)) {
      setQuantityError(true);
      setErrors('Please enter a valid quantity');
      return true;
    }

    if (type === 'fertilizer' && validator.isEmpty(speeduptime)) {
      setSpeedupTimeError(true);
      setErrors('Please enter a valid speedup time');
      return true;
    }

    return false;
  };

  const addItem = async () => {
    try {
      if (checkErrors()) return;
      await axios.post('https://gardenhouse.tech/shopitem/create', {
        name,
        type,
        quantity,
        firm: token.id,
        speeduptime,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName('');
    setQuantity('');
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
    setType(event.target.value as string);
  };

  useEffect(() => {
    if (!token) setToken(getToken());
  }, []);

  return (
    <div>
      <div className={styles.addButtonSecondContainer} onClick={handleOpen}>
        <Button className={styles.addButtonSecond} size="large">
          +
        </Button>
      </div>
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
              Add new item
            </p>
            <TextField
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
              label="Quantity"
              variant="outlined"
              className={styles.input}
              error={quantityError}
              value={quantity}
              onChange={e => {
                setQuantity(e.target.value);
                setQuantityError(false);
              }}
            />

            <FormControl variant="outlined" className={classez.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={type}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value={'seedling'}>Seedling</MenuItem>
                <MenuItem value={'fertilizer'}>Fertilizer</MenuItem>
              </Select>
            </FormControl>

            {type === 'fertilizer' ? (
              <TextField
                label="Speedup Time"
                variant="outlined"
                className={styles.speeduptime}
                error={speedupTimeError}
                value={speeduptime}
                onChange={e => {
                  setSpeedupTime(e.target.value);
                  setSpeedupTimeError(false);
                }}
              />
            ) : null}
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
                onClick={addItem}
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
