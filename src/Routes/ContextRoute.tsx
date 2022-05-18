import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Layouts/Header";
import SideBar from "../Layouts/SideBar";
import Home from "../Page/Home";
import ManageTicket from "../Page/ManageTicket";
import TicketPackage from "../Page/TicketPackage";

const { Content } = Layout;

const ContextRoute = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <SideBar />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="manage" element={<ManageTicket />} />
            <Route path="service" element={<TicketPackage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContextRoute;
