import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./SearchInput.module.scss";

const SearchInput = () => {
  return (
    <Input
      placeholder="Search"
      suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
      className={styles.searchInput}
    />
  );
};

export default SearchInput;
