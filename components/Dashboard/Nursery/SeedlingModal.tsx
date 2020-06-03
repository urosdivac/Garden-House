import {useState, useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
const styles = require('./Modal.module.scss');

interface Props {
  nursery: number;
  token: {id: number};
}

export default function TransitionsModal({nursery, token}: Props) {
  const [open, setOpen] = useState(true);
  const [seedlings, setSeedlings] = useState([]);

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

  const getSeedlings = async () => {
    const data = await axios.post(
      'https://gardenhouse.tech/warehouse/seedling',
      {id: token.id},
    );
    setSeedlings(data.data.data);
  };

  useEffect(() => {
    getSeedlings();
  }, []);

  return (
    <div>
      <Button
        className={styles.seedlingButton}
        onClick={handleOpen}
        startIcon={<FilterVintageIcon className={styles.flower} />}
      >
        Plant
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
            <p id="transition-modal-title" className={styles.heading}>
              Plant a seed
            </p>
            {seedlings.map((seedling, index) => {
              return (
                <div className={styles.seedlingCont} key={index}>
                  <p>{seedling.name}</p>
                  <p>x{seedling.count}</p>
                  <Button
                    variant="contained"
                    className={styles.confirm}
                    onClick={() => console.log(token.id)}
                  >
                    Use
                  </Button>
                </div>
              );
            })}
            <div className={styles.buttonContainer}>
              <Button
                variant="contained"
                className={styles.cancelButton}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
