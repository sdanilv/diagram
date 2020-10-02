import React from "react";
import locale from "antd/es/date-picker/locale/ru_RU";
import "moment/locale/ru";
import { DatePicker } from "antd";

import { RANGE } from "../tools/constant";

const { RangePicker } = DatePicker;

const DatePanel = ({ dateType, fetchData }) => {
  const onChangeRange = (value) => {
    fetchData(dateType, { from: value[0]._d, to: value[1]._d });
  };
  // const onChangeDateType = (value) => {
  //   if (value === null) return;
  //   fetchData(dateType, value._d);
  // };

  switch (dateType) {
    case RANGE:
      return (
        <RangePicker
          locale={locale}
          onChange={onChangeRange}
          format={"DD.MM.YYYY"}
        />
      );
    // case DAY:
    //   return (
    //     <DatePicker
    //       locale={locale}
    //       onChange={onChangeDateType}
    //       defaultValue={moment()}
    //       picker="date"
    //     />
    //   );
    // case YEAR:
    //   return (
    //     <DatePicker
    //       locale={locale}
    //       onChange={onChangeDateType}
    //       defaultValue={moment()}
    //       picker="year"
    //     />
    //   );
    default:
      return <></>;
  }
};

export default DatePanel;
