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
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
const styles = require('./Cart.module.scss');

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  cart: any[];
}

export default function FullScreenDialog({cart}: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Button
        className={styles.seedlingButton}
        onClick={handleClickOpen}
        startIcon={<ShoppingCartRoundedIcon className={styles.flower} />}
      >
        Cart {cart.length}
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
            Your shopping cart
          </p>
          <div className={styles.seedlingsContainer}>
            {cart.length > 0 ? (
              cart.map(item => {
                <div className={styles.itemContainer}>
                  <p>{item.name}</p>
                </div>;
              })
            ) : (
              <p>Your cart is empty!</p>
            )}

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
        </div>
      </Dialog>
    </div>
  );
}
