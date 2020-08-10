import { DatePicker, Select } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import "moment/locale/ru";
import React, { useState } from "react";
import { DAY, MONTH, WEEK, YEAR } from "../tools/constant";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;
const RANGE = "range";

const Selector = ({ fetchImpulses, fetchImpulsesInRange }) => {
  const [type, setType] = useState(WEEK);

  const onChangeType = (newType) => {
    if (newType === RANGE) {
      setType(newType);
      return;
    }
    fetchImpulses(newType);
    setType(newType);
  };

  const onChangeRange = (value) => {
    fetchImpulsesInRange(value[0]._d, value[1]._d);
  };
  const onChangeDate = (value, date) => {
    if (value === null) return;
    console.log(date);
    fetchImpulses(type, value._d);
  };

  return (
    <>
      {type === RANGE ? (
        <RangePicker
          locale={locale}
          onChange={onChangeRange}
          format={"DD.MM.YYYY"}
        />
      ) : (
        <DatePicker
          locale={locale}
          onChange={onChangeDate}
          defaultValue={moment()}
          picker={type === DAY ? "date" : type}
        />
      )}

      <Select defaultValue={type} onChange={onChangeType}>
        <Option value={DAY}>День</Option>
        <Option value={WEEK}>Неделя</Option>
        <Option value={MONTH}>Месяц</Option>
        <Option value={YEAR}>Год</Option>
        <Option value={RANGE}>Диапазон</Option>
      </Select>
    </>
  );
};

export default Selector;
