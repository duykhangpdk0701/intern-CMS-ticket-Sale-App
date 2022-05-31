import { Button, Space, Table } from "antd";
import React, { useState } from "react";
import EllipsisIcon from "../../Assets/Icon/EllipsisIcon";
import Status from "../../Components/Status/Status";
import { formatDate } from "../../helper/formatDate";
import { TicketTypes } from "../../State/ActionTypes/TicketTypes";
import { defaultState } from "../../State/Reducers/TicketReducer";
import ModalChangeDateManageTicket from "./ModalChangeDateManageTicket";
import styles from "./TableManage.module.scss";

type TableManageTicketType = {
  ticketsState: defaultState;
};

const { Column } = Table;

const TableManageTicket = (props: TableManageTicketType) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketTypes>();

  const handleOnClickButtonMore = (value: any) => () => {
    setTicket(value);
    setModalVisible(true);
  };

  return (
    <>
      <Table
        rowClassName={styles.row}
        size="middle"
        loading={props.ticketsState.loading}
        dataSource={props.ticketsState.current}
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
            <Space key={index}>
              <span>{index + 1}</span>
            </Space>
          )}
        />

        <Column
          title="Booking code"
          dataIndex="bookingCode"
          key="bookingCode"
        />

        <Column title="Số vé" dataIndex="id" key="id" />
        <Column
          title="Tình trạng sử dụng"
          dataIndex="statusUsage"
          key="statusUsage"
          render={(value, record, index) => {
            if (value === 1) {
              return (
                <Status color="primary" title="Chưa sử dụng" key={index} />
              );
            } else if (value === 2) {
              return <Status color="normal" title="Đã sử dụng" key={index} />;
            }

            return <Status color="danger" title="Hết hạn" key={index} />;
          }}
        />

        <Column
          title="Ngày sử dụng"
          dataIndex="dateUse"
          key="dateUse"
          render={(value, record, index) => {
            const date = formatDate(value);

            return (
              <>
                <div key={index}>{date.date}</div>
              </>
            );
          }}
        />

        <Column
          title="Ngày xuất vé"
          dataIndex="dateTicketRelease"
          key="dateTicketRelease"
          render={(value, record, index) => {
            const date = formatDate(value);

            return (
              <>
                <div key={index}>{date.date}</div>
              </>
            );
          }}
        />

        <Column
          title="Cổng check - in"
          dataIndex="checkIn"
          key="checkIn"
          render={(value, record, index) => {
            if (value === null) {
              return (
                <Space key={index}>
                  <span>_</span>
                </Space>
              );
            }
            return (
              <Space key={index}>
                <span>{value}</span>
              </Space>
            );
          }}
        />

        <Column
          key="action"
          render={(value, record, index) => {
            if (props.ticketsState.current !== undefined) {
              if (props.ticketsState.current[index].statusUsage === 1) {
                return (
                  <Space key={index}>
                    <Button
                      onClick={handleOnClickButtonMore(record)}
                      type="text">
                      <EllipsisIcon />
                    </Button>
                  </Space>
                );
              }
            }
            return <></>;
          }}
        />
      </Table>
      {ticket && (
        <ModalChangeDateManageTicket
          valueItem={ticket}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};

export default TableManageTicket;
