import React, { useMemo } from "react";
import { Layout, Menu } from "antd";
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
      <Menu
        className={styles.menu}
        mode="inline"
        defaultSelectedKeys={[selected]}>
        <Menu.Item className={styles.itemMenu} key="home" icon={<HomeIcon />}>
          <Link to="/">Trang chủ</Link>
        </Menu.Item>

        <Menu.Item
          className={styles.itemMenu}
          key="management"
          icon={<TicketIcon />}>
          <Link to="/management">Quản lý vé</Link>
        </Menu.Item>

        <Menu.Item
          className={styles.itemMenu}
          key="invoice"
          icon={<InvoiceIcon />}>
          <Link to="/invoice">Đối soát vé</Link>
        </Menu.Item>

        <Menu.Item
          className={styles.itemMenu}
          key="service"
          title="Cài đặt"
          icon={<SettingIcon />}>
          <Link to="/service">Cài đặt</Link>
        </Menu.Item>

        <Menu.Item disabled className={styles.itemMenu} key="">
          Gói dịch vụ
        </Menu.Item>
      </Menu>

      <div></div>
    </Sider>
  );
};

export default SideBar;
