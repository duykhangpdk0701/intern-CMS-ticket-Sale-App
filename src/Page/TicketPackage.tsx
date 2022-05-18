import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicketPackage } from "../State/Actions/TicketPackageAcitons";
import { RootStore } from "../State/Store";
import { Typography } from "antd";
import StatusOpen from "../Components/Status/StatusOpen";

const { Title } = Typography;

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
    <div>
      <StatusOpen title="Đang mở" />
      {ticketPackagesState.current &&
        ticketPackagesState.current.map((value, index) => (
          <div key={index}>
            <div>{value.id}</div>
            <Title level={4}>{value.name}</Title>
          </div>
        ))}
    </div>
  );
};

export default TicketPackage;
