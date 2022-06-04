import React, { useMemo } from "react";
import { Layout, Menu, Typography } from "antd";
import styles from "./SideBar.module.scss";
import HomeIcon from "../../Assets/Icon/HomeIcon";
import TicketIcon from "../../Assets/Icon/TicketIcon";
import InvoiceIcon from "../../Assets/Icon/InvoiceIcon";
import SettingIcon from "../../Assets/Icon/SettingIcon";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const SideBar = () => {
  const location = useLocation();
  const selected = useMemo(() => {
    if (location.pathname === "/") return "home";
    return location.pathname.replace("/", "");
  }, [location]);

  return (
    <Sider width={321} className={styles.sidebar}>
      <div className={styles.menuWrapper}>
        <Menu
          className={styles.menu}
          mode="inline"
          defaultSelectedKeys={[selected]}>
          <Menu.Item className={styles.itemMenu} key="home" icon={<HomeIcon />}>
            <Link className={styles.text} to="/">
              Trang chủ
            </Link>
          </Menu.Item>

          <Menu.Item
            className={styles.itemMenu}
            key="management"
            icon={<TicketIcon />}>
            <Link className={styles.text} to="/management">
              Quản lý vé
            </Link>
          </Menu.Item>

          <Menu.Item
            className={styles.itemMenu}
            key="invoice"
            icon={<InvoiceIcon />}>
            <Link className={styles.text} to="/invoice">
              Đối soát vé
            </Link>
          </Menu.Item>

          <Menu.Item
            className={styles.itemMenu}
            key="service"
            title="Cài đặt"
            icon={<SettingIcon />}>
            <Link className={styles.text} to="/service">
              Cài đặt
            </Link>
          </Menu.Item>

          <div className={styles.subItemMenu}>
            <Typography.Text className={styles.subItemMenuText}>
              Gói dịch vụ
            </Typography.Text>
          </div>
        </Menu>

        <div>
          <Typography.Text className={styles.textCopyright}>
            Copyright 2020 &copy; Alta Software
          </Typography.Text>
        </div>
      </div>
    </Sider>
  );
};

export default SideBar;
