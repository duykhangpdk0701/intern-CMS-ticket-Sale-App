import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../Components/SearchInput";
import { getTickets, searchTicket } from "../../State/Actions/TicketActions";
import { RootStore } from "../../State/Store";
import styles from "./ManageTicket.module.scss";
import ModalFilterManageTicket from "./ModalFilterManageTicket";
import TableManageTicket from "./TableManageTicket";
import { CSVLink } from "react-csv";

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

  const onSearch = (e: string) => {
    dispatch(searchTicket(e));
  };

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
            onSearch={onSearch}
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
            <CSVLink filename="ManageTicket.csv" data={ticketsState.current}>
              Xuất file (.csv)
            </CSVLink>
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
