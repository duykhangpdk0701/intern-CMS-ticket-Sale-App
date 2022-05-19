import { Space, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EllipsisIcon from "../Assets/Icon/EllipsisIcon";
import Button from "../Components/Button";
import SearchInput from "../Components/SearchInput";
import { formatDate } from "../helper/formatDate";
import { getTickets } from "../State/Actions/TicketActions";
import { RootStore } from "../State/Store";
import styles from "./ManageTicket.module.scss";

const { Title } = Typography;
const { Column } = Table;

const ManageTicket = () => {
  const dispatch = useDispatch();
  const ticketsState = useSelector((state: RootStore) => state.tickets);

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
          <SearchInput />
        </div>

        <div>
          <Button style={{ marginRight: "24px" }} title="Lọc Vé" />
          <Button title="Xuất file (.csv)" />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <Table
          rowClassName={styles.row}
          size="middle"
          loading={ticketsState.loading}
          dataSource={ticketsState.current}
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
          />

          <Column
            title="Ngày sử dụng"
            dataIndex="dateTicketRelease"
            key="dateTicketRelease"
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
            title="Ngày xuất vé"
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
            key="action"
            render={(text, record, index) => {
              if (ticketsState.current !== undefined) {
                if (ticketsState.current[index].statusUsage === 1) {
                  return (
                    <Space>
                      <EllipsisIcon />
                    </Space>
                  );
                }
              }
              return <></>;
            }}
          />
        </Table>
      </div>
    </div>
  );
};

export default ManageTicket;
