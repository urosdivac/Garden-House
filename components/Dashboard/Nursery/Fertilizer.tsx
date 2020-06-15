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
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import getToken from '../../../src/getToken';
const styles = require('./Fertilizer.module.scss');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      backgroundImage: 'linear-gradient(45deg, #34e89de0, #0f3443e7)',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

interface Props {
  id: number;
  showalert: () => void;
  getnurserydata: () => void;
}

interface Token {
  id: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  id,
  showalert,
  getnurserydata,
}: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fertilizers, setFertilizers] = useState([]);
  const [token, setToken] = useState<Token | undefined>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getFertilizers = async () => {
    const data = await axios.post(
      'https://gardenhouse.tech/warehouse/fertilizer',
      {id: token.id},
    );
    setFertilizers(data.data.data);
  };

  const useFertilizer = async fertilizerId => {
     await axios.post('https://gardenhouse.tech/fertilizer/use', {
      seedling: id,
      id: fertilizerId,
    });
    getnurserydata();
    handleClose();
    showalert();
  };

  useEffect(() => {
    if (!token) setToken(getToken());
    if (token) getFertilizers();
  }, [token]);

  return (
    <div>
      <Button
        className={styles.seedlingButton}
        onClick={handleClickOpen}
        startIcon={<FlashOnIcon className={styles.flower} />}
      >
        Use Fertilizer
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
            Use a fertilizer
          </p>
          <div className={styles.seedlingsContainer}>
            {fertilizers.length > 0 ? (
              fertilizers.map((fertilizer, index) => {
                return (
                  <div className={styles.seedlingCont} key={index}>
                    <p>{fertilizer.name}</p>
                    <span className={styles.speedupTimeContainer}>
                      <HourglassEmptyIcon className={styles.hourGlassIcon} />
                      {`${fertilizer.speedup_time} days`}
                    </span>
                    <span className={styles.quantityContainer}>
                      <AllInboxIcon className={styles.quantityIcon} />
                      {`x${fertilizer.count}`}
                    </span>
                    <Button
                      variant="contained"
                      className={styles.confirm}
                      onClick={() => {
                        useFertilizer(fertilizer.ids[0]);
                        handleClose();
                      }}
                    >
                      Use
                    </Button>
                  </div>
                );
              })
            ) : (
              <p className={styles.emptyParagraph}>
                You don't have any fertilizers!
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
