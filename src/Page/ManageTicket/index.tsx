import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../Components/SearchInput";
import { getTickets } from "../../State/Actions/TicketActions";
import { RootStore } from "../../State/Store";
import styles from "./ManageTicket.module.scss";
import ModalFilterManageTicket from "./ModalFilterManageTicket";
import TableManageTicket from "./TableManageTicket";

const { Title } = Typography;

const ManageTicket = () => {
  const dispatch = useDispatch();
  const ticketsState = useSelector((state: RootStore) => state.tickets);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      dispatch(getTickets());
    };
    getData();
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Danh sách vé</Title>
      </div>

      <div className={styles.feature}>
        <div>
          <SearchInput
            className={styles.searchInput}
            placeholder="Tìm bằng số vé"
          />
        </div>

        <div>
          <Button
            style={{ marginRight: "24px" }}
            size="large"
            type="primary"
            ghost
            onClick={() => setModalVisible(true)}>
            Lọc vé
          </Button>
          <ModalFilterManageTicket
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          <Button size="large" type="primary" ghost>
            Xuất file (.csv)
          </Button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <TableManageTicket ticketsState={ticketsState} />
      </div>
    </div>
  );
};

export default ManageTicket;
