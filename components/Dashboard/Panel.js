import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'js-cookie';
import styles from './Panel.module.scss';
import PanelItem from './Panel-Item';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import StoreIcon from '@material-ui/icons/Store';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

const Panel = props => {
  const logout = () => {
    Cookies.remove('JWT');
    Router.push('/');
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <img src="/assets/Logo.svg" className={styles.logo} alt="logo" />
        </Link>
      </div>

      {props.isAdmin ? (
        <PanelItem
          icon={
            <VerifiedUserIcon
              className={props.admin ? styles.iconActive : styles.icon}
            />
          }
          text="Admin Dashboard"
          isActive={props.admin}
        />
      ) : null}

      {props.isFarmer ? (
        <PanelItem
          icon={
            <HomeRoundedIcon
              className={props.nursery ? styles.iconActive : styles.icon}
            />
          }
          text="Nursery"
          isActive={props.nursery}
        />
      ) : null}

      {props.isFarmer ? (
        <PanelItem
          icon={
            <FilterVintageIcon
              className={props.seedling ? styles.iconActive : styles.icon}
            />
          }
          text="Seedlings"
          isActive={props.seedling}
        />
      ) : null}

      {props.isFarmer ? (
        <PanelItem
          icon={
            <LocationCityRoundedIcon
              className={props.warehouse ? styles.iconActive : styles.icon}
            />
          }
          text="Warehouse"
          isActive={props.warehouse}
        />
      ) : null}

      <PanelItem
        icon={
          <ShoppingCartRoundedIcon
            className={props.shop ? styles.iconActive : styles.icon}
          />
        }
        text="Shop"
        isActive={props.shop}
      />

      <PanelItem
        icon={
          <LocalShippingIcon
            className={props.orders ? styles.iconActive : styles.icon}
          />
        }
        text="Orders"
        isActive={props.orders}
      />

      {props.isCompany ? (
        <PanelItem
          icon={
            <StoreIcon
              className={props.storeItems ? styles.iconActive : styles.icon}
            />
          }
          text="Store Items"
          isActive={props.storeItems}
        />
      ) : null}

      <PanelItem
        icon={
          <SettingsIcon
            className={props.settings ? styles.iconActive : styles.icon}
          />
        }
        text="Settings"
        isActive={props.settings}
      />

      <PanelItem
        icon={<ExitToAppIcon className={styles.icon} />}
        text="Log out"
        logout={logout}
      />
    </div>
  );
};

export default Panel;
