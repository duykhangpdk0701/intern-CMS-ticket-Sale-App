import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTicketPackage,
  searchTicketPackage,
} from "../../State/Actions/TicketPackageAcitons";
import { RootStore } from "../../State/Store";
import { Typography, Button } from "antd";
import styles from "./TicketPackage.module.scss";
import SearchInput from "../../Components/SearchInput";
import TableTicketPackage from "./TableTicketPackage";
import ModalAddTicketPackage from "./ModalAddTicketPackage";
import { CSVLink } from "react-csv";

const { Title } = Typography;

const TicketPackage = () => {
  const dispatch = useDispatch();
  const ticketPackagesState = useSelector(
    (state: RootStore) => state.ticketPackages,
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      dispatch(getTicketPackage());
    };
    getData();
  }, [dispatch]);

  const onSearch = (e: string) => {
    dispatch(searchTicketPackage(e));
  };

  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Danh sách gói vé</Title>
      </div>
      <div className={styles.feature}>
        <div>
          <SearchInput
            className={styles.searchInput}
            placeholder="Tìm bằng số vé"
            onSearch={onSearch}
          />
        </div>

        <div>
          <Button
            size="large"
            type="primary"
            ghost
            style={{ marginRight: "24px" }}>
            <CSVLink
              filename="TicketPackage.csv"
              data={ticketPackagesState.current}>
              Xuất file (.csv)
            </CSVLink>
          </Button>

          <ModalAddTicketPackage
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          <Button
            size="large"
            type="primary"
            onClick={() => setModalVisible(true)}>
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
