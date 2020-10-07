import React, { useState } from "react";
import locale from "antd/es/date-picker/locale/ru_RU";
import "moment/locale/ru";
import { DatePicker } from "antd";

import { RANGE } from "../tools/constant";
import SwapRightOutlined from "@ant-design/icons/es/icons/SwapRightOutlined";

const DatePanel = ({ dateType, fetchData }) => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const fromHandler = (value) => {
    setFrom(value);
    if (to) fetchData(dateType, { from: value, to });
  };
  const toHandler = (value) => {
    setTo(value);
    if (from) fetchData(dateType, { from, to: value });
  };
  switch (dateType) {
    case RANGE:
      return (
        <>
          <DatePicker
            placeholder="Старт"
            value={from}
            locale={locale}
            onChange={fromHandler}
            format={"DD.MM.YYYY"}
          />
          <SwapRightOutlined />
          <DatePicker
            placeholder="Конец"
            value={to}
            locale={locale}
            onChange={toHandler}
            format={"DD.MM.YYYY"}
          />
        </>
      );
    default:
      return <></>;
  }
};

export default DatePanel;
