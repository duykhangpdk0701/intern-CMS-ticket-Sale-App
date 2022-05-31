import { Button, Space, Table } from "antd";
import React, { useState } from "react";
import EditIcon from "../../Assets/Icon/EditIcon";
import { formatDate } from "../../helper/formatDate";
import { formatComboPrice, formatMoney } from "../../helper/formatPrice";
import { defaultState } from "../../State/Reducers/TicketPackagesReducer";
import styles from "./TableTicketPackage.module.scss";
import ModalUpdateTicketPackage from "./ModalUpdateTicketPackage";
import { TicketPackageTypes } from "../../State/ActionTypes/TicketPackageTypes";
import Status from "../../Components/Status/Status";

type TableTicketPackageType = {
  ticketPackagesState: defaultState;
};

const { Column } = Table;

const TableTicketPackage = (props: TableTicketPackageType) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [invoiceTicket, setInvoiceTicket] = useState<TicketPackageTypes>();

  const handleOnClickEdit =
    (value: any) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setInvoiceTicket(value);
      setModalVisible(true);
    };

  return (
    <>
      <Table
        rowClassName={styles.row}
        size="middle"
        loading={props.ticketPackagesState.loading}
        dataSource={props.ticketPackagesState.current}
        className={styles.table}
        pagination={{
          position: ["bottomCenter"],
        }}
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
            if (text === null) return <></>;
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
            if (text === null) return <></>;
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
          render={(text, record, index) => {
            if (text === null) return <></>;
            return (
              <Space>
                <span>{formatMoney(text)} VNĐ</span>
              </Space>
            );
          }}
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
        <Column
          title="Tình Trạng"
          dataIndex="status"
          key="status"
          render={(value, record, index) => {
            if (value) {
              return <Status color="primary" title="Đang áp dụng" />;
            }
            return <Status color="danger" title="Tắt" />;
          }}
        />
        <Column
          key="action"
          render={(text, record) => (
            <Space>
              <Button
                onClick={handleOnClickEdit(record)}
                type="text"
                className={styles.actionBtn}>
                <EditIcon />
                <span>Cập nhật</span>
              </Button>
            </Space>
          )}
        />
      </Table>
      {invoiceTicket && (
        <ModalUpdateTicketPackage
          valueItem={invoiceTicket}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};

export default TableTicketPackage;
