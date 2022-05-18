import React from "react";
import { Header as AntHeader } from "antd/lib/layout/layout";
import styles from "./Header.module.scss";
import logo from "../../Assets/logo.svg";
import { Link } from "react-router-dom";
import SearchInput from "../../Components/SearchInput";
import { Avatar } from "antd";
import avatarImg from "../../Assets/avatarImg.svg";
import Icon from "@ant-design/icons";
import BellIcon from "../../Assets/Icon/BellIcon";
import MailIcon from "../../Assets/Icon/MailIcon";

const Header = () => {
  return (
    <AntHeader className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.featureContainer}>
        <div className={styles.searchContainer}>
          <SearchInput />
        </div>
        <div className={styles.profileContainer}>
          <Icon component={MailIcon} className={styles.icon} />
          <Icon component={BellIcon} className={styles.icon} />
          <Avatar src={avatarImg} size={48} />
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
