import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Layouts/Header";
import SideBar from "../Layouts/SideBar";
import Home from "../Page/Home";
import InvoiceTicket from "../Page/InvoiceTicket";
import ManageTicket from "../Page/ManageTicket";
import TicketPackage from "../Page/TicketPackage";
import styles from "./ContextRoute.module.scss";

const { Content } = Layout;

const ContextRoute = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <SideBar />
        <Content className={styles.context}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="management" element={<ManageTicket />} />
            <Route path="service" element={<TicketPackage />} />
            <Route path="invoice" element={<InvoiceTicket />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContextRoute;
