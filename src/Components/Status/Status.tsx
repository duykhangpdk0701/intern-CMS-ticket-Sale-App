import React from "react";
import { returnStatusColor, StatusType } from "./StatusType";
import styles from "./Status.module.scss";

const Status = (props: StatusType) => {
  const getColor = returnStatusColor(props.color);

  return (
    <span className={styles.tagWrapper}>
      <span
        color="success"
        className={styles.tagContainer}
        style={{
          borderColor: getColor.color1,
          backgroundColor: getColor.color2,
        }}>
        <div
          style={{ backgroundColor: getColor.color1 }}
          className={styles.dot}></div>
        <span style={{ color: getColor.color1 }}>{props.title}</span>
      </span>
    </span>
  );
};

export default Status;
