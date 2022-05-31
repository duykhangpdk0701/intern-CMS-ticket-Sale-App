import { Typography, Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../Components/SearchInput";
import { getInvoiceTickets } from "../../State/Actions/InvoiceTicketActions";
import { RootStore } from "../../State/Store";
import styles from "./InvoiceTicket.module.scss";
import InvoiceTicketForm from "./InvoiceTicketForm";
import TableInvoiceTicket from "./TableInvoiceTicket";

const { Title } = Typography;

const InvoiceTicket = () => {
  const dispatch = useDispatch();
  const invoiceTicketState = useSelector(
    (state: RootStore) => state.invoiceTickets,
  );

  useEffect(() => {
    const getData = async () => {
      dispatch(getInvoiceTickets());
    };
    getData();
  }, [dispatch]);

  return (
    <div className={styles.mainContext}>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <Title className={styles.title}>Đối soát vé</Title>
        </div>

        <div className={styles.feature}>
          <div>
            <SearchInput
              className={styles.searchInput}
              placeholder="Tìm bằng số vé"
            />
          </div>

          <div>
            <Button size="large" type="primary">
              Chốt đối soát
            </Button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <TableInvoiceTicket invoiceTicketState={invoiceTicketState} />
        </div>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.titleFilterContainer}>
          <Title level={3} className={styles.titleFilter}>
            Lọc vé
          </Title>
        </div>
        <InvoiceTicketForm />
      </div>
    </div>
  );
};

export default InvoiceTicket;
