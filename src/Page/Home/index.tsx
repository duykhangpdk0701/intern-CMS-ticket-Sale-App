import { Typography } from "antd";
import React from "react";
import styles from "./Home.module.scss";

const { Title } = Typography;

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
