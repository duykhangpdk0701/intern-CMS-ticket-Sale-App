import { Space, Table, Typography } from "antd";
import React from "react";
import { formatDate } from "../../helper/formatDate";
import { defaultState } from "../../State/Reducers/InvoiceTicketReducer";
import styles from "./TableInvoiceTicket.module.scss";

type TableInvoiceTicketType = {
  invoiceTicketState: defaultState;
};

const { Column } = Table;
const { Text } = Typography;

const TableInvoiceTicket = (props: TableInvoiceTicketType) => {
  return (
    <Table
      rowClassName={styles.row}
      size="middle"
      loading={props.invoiceTicketState.loading}
      dataSource={props.invoiceTicketState.current}
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
        render={(value, record, index) => (
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
        render={(value, record, index) => {
          const date = formatDate(value);

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
          if (value === true)
            return (
              <Space>
                <Text className={styles.statusTrue}>Đã đối soát</Text>
              </Space>
            );
          return (
            <Space>
              <Text className={styles.statusFalse}>Chưa đối soát</Text>
            </Space>
          );
        }}
      />
    </Table>
  );
};

export default TableInvoiceTicket;
