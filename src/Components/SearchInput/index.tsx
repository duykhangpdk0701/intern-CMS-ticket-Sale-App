import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./SearchInput.module.scss";
import lodash from "lodash";

interface IProps {
  onChange?: (value: string) => void;
  onClick?: (value: any) => void;
  className?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchInput = (props: IProps) => {
  const { className, placeholder } = props;
  const [valueInput, setValueInput] = useState<string | undefined>();

  const onSearch = React.useMemo(() => {
    return lodash.debounce((text: string) => {
      if (props.onSearch) {
        props.onSearch(text);
      }
    }, 800);
  }, [props]);

  useEffect(() => {
    if (valueInput == null) {
      return;
    }
    onSearch(valueInput);
    return () => {
      onSearch.cancel();
    };
  }, [onSearch, valueInput]);

  const onClickKeyDown = (event: any) => {
    if (event.keyCode === 13 && props.onClick) {
      props.onClick(valueInput);
    }
  };

  const onChange = (e: any) => {
    const text = e.target.value;
    setValueInput(text);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <Input
      type="text"
      onChange={onChange}
      onKeyDown={onClickKeyDown}
      suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
      className={`${styles.searchInput} ${className}`}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
