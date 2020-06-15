import React, {useState, useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Router from 'next/router';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import getToken from '../../../src/getToken';
const styles = require('./Cart.module.scss');

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  cart: any[];
  setcart: (value) => void;
}

interface Token {
  id: number;
}

export default function FullScreenDialog({cart, setcart}: Props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<Token | undefined>();

  const sendOrder = async () => {
    await axios.post('https://gardenhouse.tech/order/create', {
      buyer: token.id,
      items: cart,
    });
    setcart([]);
    Router.push('/successfulorder');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!token) setToken(getToken());
  }, []);
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
            Shopping cart
          </p>
          <div className={styles.seedlingsContainer}>
            {cart.length > 0 ? (
              <div className={styles.innerContainer}>
                <div className={styles.labelsContainer}>
                  <div>
                    <p>ID</p>
                  </div>
                  <div>
                    <p>Name</p>
                  </div>
                  <div>
                    <p>Quantity</p>
                  </div>
                </div>

                {cart.map(item => {
                  return (
                    <div
                      className={styles.itemContainer}
                      key={item.shopitem_id}
                    >
                      <div>
                        <p>{item.shopitem_id}</p>
                      </div>

                      <div>
                        <p>{item.name}</p>
                      </div>

                      <div>
                        <p>{item.quantity}</p>
                      </div>
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

                  <Button
                    variant="contained"
                    className={styles.confirm}
                    onClick={sendOrder}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.emptyContainer}>
                <p>Your cart is empty!</p>
                <Button
                  variant="contained"
                  className={styles.cancelButton}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
