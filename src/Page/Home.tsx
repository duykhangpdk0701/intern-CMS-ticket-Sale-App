import { Space, Table, Typography } from "antd";
import React from "react";
import Button from "../Components/Button";
import SearchInput from "../Components/SearchInput";
import styles from "./Home.module.scss";

const { Title } = Typography;
const { Column } = Table;

const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Thống kê</Title>
      </div>
    </div>
  );
};

export default Home;
