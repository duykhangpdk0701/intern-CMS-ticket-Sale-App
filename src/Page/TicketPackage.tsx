import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicketPackage } from "../State/Actions/TicketPackageAcitons";
import { RootStore } from "../State/Store";
import { Space, Table, Typography, Button } from "antd";
import styles from "./TicketPackage.module.scss";
import SearchInput from "../Components/SearchInput";
import EditIcon from "../Assets/Icon/EditIcon";
import { formatComboPrice, formatMoney } from "../helper/formatPrice";
import { formatDate } from "../helper/formatDate";

const { Title } = Typography;
const { Column } = Table;

const TicketPackage = () => {
  const dispatch = useDispatch();
  const ticketPackagesState = useSelector(
    (state: RootStore) => state.ticketPackages,
  );

  useEffect(() => {
    const getData = async () => {
      dispatch(getTicketPackage());
    };
    getData();
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Danh sách gói vé</Title>
      </div>
      <div className={styles.feature}>
        <div>
          <SearchInput />
        </div>

        <div>
          <Button
            size="large"
            type="primary"
            ghost
            style={{ marginRight: "24px" }}>
            Xuất file (.csv)
          </Button>
          <Button size="large" type="primary">
            Thêm gói vé
          </Button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <Table
          rowClassName={styles.row}
          size="middle"
          loading={ticketPackagesState.loading}
          dataSource={ticketPackagesState.current}
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
      </div>
    </div>
  );
};

export default TicketPackage;
