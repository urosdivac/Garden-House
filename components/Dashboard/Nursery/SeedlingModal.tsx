import {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
const styles = require('./Modal.module.scss');

export default function TransitionsModal() {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState('');

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
    <div>
      <Button className={styles.seedlingButton} onClick={handleOpen}>
        <FilterVintageIcon className={styles.flower} />
      </Button>
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
              Plant a seed
            </p>

            <div className={styles.buttonContainer}>
              <Button
                variant="contained"
                className={styles.cancel}
                onClick={handleClose}
              >
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
