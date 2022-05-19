import { Space, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Components/Button";
import SearchInput from "../Components/SearchInput";
import { formatDate } from "../helper/formatDate";
import { getInvoiceTickets } from "../State/Actions/InvoiceTicketActions";
import { RootStore } from "../State/Store";
import styles from "./InvoiceTicket.module.scss";

const { Title } = Typography;
const { Column } = Table;

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
            <SearchInput />
          </div>

          <div>
            <Button variant="fill" title="Chốt đối soát" />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <Table
            rowClassName={styles.row}
            size="middle"
            loading={invoiceTicketState.loading}
            dataSource={invoiceTicketState.current}
            className={styles.table}
            pagination={{ size: "small", position: ["bottomCenter"] }}
            onHeaderRow={(columns, index) => ({
              className: styles.header,
            })}>
            <Column
              align="center"
              title="STT"
              dataIndex="stt"
              key="stt"
              render={(text, record, index) => (
                <Space>
                  <span>{index + 1}</span>
                </Space>
              )}
            />

            <Column title="Số vé" dataIndex="id" key="id" />

            <Column
              title="Ngày sử dụng"
              dataIndex="dateUse"
              key="dateUse"
              render={(text, record, index) => {
                const date = formatDate(text);

                return (
                  <>
                    <div>{date.date}</div>
                    <div>{date.time}</div>
                  </>
                );
              }}
            />
            <Column title="Tên loại vé" dataIndex="name" key="name" />

            <Column
              title="Cổng check - in"
              dataIndex="checkIn"
              key="checkIn"
              render={(value, record, index) => {
                if (value === null) {
                  return (
                    <Space>
                      <span>_</span>
                    </Space>
                  );
                }
                return (
                  <Space>
                    <span>{value}</span>
                  </Space>
                );
              }}
            />

            <Column
              dataIndex="status"
              key="status"
              render={(value, record, index) => {
                if (value == true)
                  return (
                    <Space>
                      <span>Đã đối soát</span>
                    </Space>
                  );
                return (
                  <Space>
                    <span>Chưa đói soát</span>
                  </Space>
                );
              }}
            />
          </Table>
        </div>
      </div>

      <div className={styles.filterContainer}></div>
    </div>
  );
};

export default InvoiceTicket;
