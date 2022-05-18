import React from "react";
import Icon from "@ant-design/icons";

const DotSvg = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 9"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4.5" r="4" fill="currentColor" />
  </svg>
);

const DotIcon = (props: any) => <Icon component={DotSvg} {...props} />;

export default DotIcon;
