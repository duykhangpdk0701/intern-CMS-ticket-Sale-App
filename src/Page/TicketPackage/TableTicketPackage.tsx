import { Button, Space, Table } from "antd";
import React from "react";
import EditIcon from "../../Assets/Icon/EditIcon";
import { formatDate } from "../../helper/formatDate";
import { formatComboPrice, formatMoney } from "../../helper/formatPrice";
import { defaultState } from "../../State/Reducers/TicketPackagesReducer";
import styles from "./TableTicketPackage.module.scss";

type TableTicketPackageType = {
  ticketPackagesState: defaultState;
};

const { Column } = Table;

const TableTicketPackage = (props: TableTicketPackageType) => {
  return (
    <Table
      rowClassName={styles.row}
      size="middle"
      loading={props.ticketPackagesState.loading}
      dataSource={props.ticketPackagesState.current}
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
      <Column title="Mã gói" dataIndex="id" key="id" />
      <Column title="Tên gói vé" dataIndex="name" key="name" />
      <Column
        title="Ngày áp dụng"
        dataIndex="validDate"
        key="validDate"
        align="right"
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
      <Column
        align="right"
        title="Ngày hết hạn"
        dataIndex="expiryDate"
        key="expiryDate"
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
      <Column
        title="Giá vé (VNĐ/Vé)"
        dataIndex="price"
        key="price"
        align="right"
        render={(text, record, index) => (
          <Space>
            <span>{formatMoney(text)} VNĐ</span>
          </Space>
        )}
      />
      <Column
        title="Giá Combo(VNĐ/Combo)"
        dataIndex="comboPrice"
        key="comboPrice"
        render={(text, record, index) => {
          if (text === null) return <></>;
          const combo = formatComboPrice(text);
          return (
            <Space>
              <span>
                {combo.money} VNĐ/{combo.amount} Vé
              </span>
            </Space>
          );
        }}
      />
      <Column title="Tình Trạng" dataIndex="status" key="status" />
      <Column
        key="action"
        render={(text, record) => (
          <Space>
            <Button type="text" className={styles.actionBtn}>
              <EditIcon />
              <span>Cập nhật</span>
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default TableTicketPackage;
