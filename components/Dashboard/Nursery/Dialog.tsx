import React, {useState, useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
const styles = require('./Modal.module.scss');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      backgroundColor: 'rgba(48, 196, 126, 0.9)',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

interface Props {
  nursery: number;
  token: {id: number};
  getnurserydata: () => void;
  getseedlings: () => void;
  showalert: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  nursery,
  token,
  getnurserydata,
  getseedlings,
  showalert,
}: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [seedlings, setSeedlings] = useState([]);

  const handleClickOpen = () => {
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
    getseedlings();
  };

  const plantSeedling = async (name, nurseryid, warehouse_id) => {
    await axios.post('https://gardenhouse.tech/seedling/plant', {
      name,
      nurseryid,
      warehouse_id,
    });
    getnurserydata();
    showalert();
  };

  useEffect(() => {
    getSeedlings();
  }, []);

  return (
    <div>
      <Button
        className={styles.seedlingButton}
        onClick={handleClickOpen}
        startIcon={<FilterVintageIcon className={styles.flower} />}
      >
        Plant
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={styles.seedlingOuterContainer}>
          <p id="transition-modal-title" className={styles.heading}>
            Plant a seed
          </p>
          <div className={styles.seedlingsContainer}>
            {seedlings.length > 0 ? (
              seedlings.map((seedling, index) => {
                return (
                  <div className={styles.seedlingCont} key={index}>
                    <p>{seedling.name}</p>
                    <p>x{seedling.count}</p>
                    <Button
                      variant="contained"
                      className={styles.confirm}
                      onClick={() => {
                        plantSeedling(
                          seedling.name,
                          nursery,
                          seedling.warehouse_id,
                        );
                        handleClose();
                      }}
                    >
                      Plant
                    </Button>
                  </div>
                );
              })
            ) : (
              <p className={styles.emptyParagraph}>
                You don't have any seedlings!
              </p>
            )}
          </div>
          <div className={styles.seedlingsContainer}></div>
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
      </Dialog>
    </div>
  );
}
