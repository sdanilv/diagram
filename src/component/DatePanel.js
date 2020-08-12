import React from "react";
import locale from "antd/es/date-picker/locale/ru_RU";
import "moment/locale/ru";
import { DatePicker } from "antd";
import moment from "moment";
import { DAY, RANGE, YEAR } from "../tools/constant";

const { RangePicker } = DatePicker;

const DatePanel = ({ dateType, loadDataInRange, fetchData }) => {
  const onChangeRange = (value) => {
      loadDataInRange(value[0]._d, value[1]._d);
  };
  const onChangeDate = (value, date) => {
    if (value === null) return;
    console.log(date);
    fetchData(value._d);
  };

  switch (dateType) {
    case RANGE:
      return (
        <RangePicker
          locale={locale}
          onChange={onChangeRange}
          format={"DD.MM.YYYY"}
        />
      );
    case DAY:
      return (
        <DatePicker
          locale={locale}
          onChange={onChangeDate}
          defaultValue={moment()}
          picker="date"
        />
      );
    case YEAR:
      return (
        <DatePicker
          locale={locale}
          onChange={onChangeDate}
          defaultValue={moment()}
          picker="year"
        />
      );
    default:
      return <></>;
  }
};

export default DatePanel;
