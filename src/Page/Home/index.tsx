import { DatePicker, Typography } from "antd";
import React from "react";
import { Legend } from "recharts";
import ChartLine from "../../Components/ChartLine";
import ChartPie from "../../Components/ChartPie";
import { chartLineData } from "../../DummyData/chartLineData";
import { chartLineData1, chartLineData2 } from "../../DummyData/chartPieData";
import styles from "./Home.module.scss";

const { Title, Text } = Typography;

const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Thống kê</Title>
      </div>
      <div className={styles.chartLineTitleContainer}>
        <Title level={5}>Doanh thu</Title>
      </div>
      <div className={styles.chartLineContainer}>
        <ChartLine chartLineData={chartLineData} />
      </div>
      <div className={styles.totalContainer}>
        <Text className={styles.totalValueLabel}>Tổng doanh thu theo tuần</Text>
        <div className={styles.totalValueContainer}>
          <Text className={styles.totalValue}>525.145.000</Text>
          <Text className={styles.totalValueUnit}>đồng</Text>
        </div>
      </div>
      <div className={styles.chartPieContainer}>
        <div>
          <DatePicker picker="month" />
        </div>

        <div className={styles.chartPieWrapper}>
          <ChartPie chartPieData={chartLineData1} />
        </div>
        <div className={styles.chartPieWrapper}>
          <ChartPie chartPieData={chartLineData2} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
