import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicketPackage } from "../../State/Actions/TicketPackageAcitons";
import { RootStore } from "../../State/Store";
import { Typography, Button } from "antd";
import styles from "./TicketPackage.module.scss";
import SearchInput from "../../Components/SearchInput";
import TableTicketPackage from "./TableTicketPackage";

const { Title } = Typography;

const TicketPackage = () => {
  const dispatch = useDispatch();
  const ticketPackagesState = useSelector(
    (state: RootStore) => state.ticketPackages,
  );

  useEffect(() => {
    const getData = async () => {
      dispatch(getTicketPackage());
    };
    getData();
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Danh sách gói vé</Title>
      </div>
      <div className={styles.feature}>
        <div>
          <SearchInput />
        </div>

        <div>
          <Button
            size="large"
            type="primary"
            ghost
            style={{ marginRight: "24px" }}>
            Xuất file (.csv)
          </Button>
          <Button size="large" type="primary">
            Thêm gói vé
          </Button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <TableTicketPackage ticketPackagesState={ticketPackagesState} />
      </div>
    </div>
  );
};

export default TicketPackage;