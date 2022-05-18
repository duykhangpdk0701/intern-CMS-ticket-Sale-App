import React from "react";
import DotIcon from "../../Assets/Icon/DotIcon";
import { StatusType } from "./StatusType";
import styles from "./Status.module.scss";

const StatusOpen = (props: StatusType) => {
  return (
    <span
      color="success"
      className={styles.tagContainer}
      style={{ borderColor: "#03AC00", backgroundColor: "#DEF7E0" }}>
      <div>
        <DotIcon className={styles.icon} style={{ color: "#03AC00" }} />
        <span style={{ color: "#03AC00" }}>{props.title}</span>
      </div>
    </span>
  );
};

export default StatusOpen;
