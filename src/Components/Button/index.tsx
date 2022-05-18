import React from "react";
import styles from "./Button.module.scss";

const Button = (props: any) => {
  const { title, variant } = props;

  let style = styles.outlined;
  if (variant === "fill") style = styles.fill;

  return (
    <button className={`${styles.button} ${style}`} {...props}>
      {title}
    </button>
  );
};

export default Button;
