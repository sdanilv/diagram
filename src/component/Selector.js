import { Select } from "antd";
import React from "react";
import { MONTH, RANGE, WEEK, YEAR } from "../tools/constant";
import DatePanel from "./DatePanel";

const { Option } = Select;

const Selector = ({
  fetchData,
  loadDataInRange,
  setLoading,
  setDateType,
  dateType,
}) => {
  // function onChange(checkedValues) {
  //   setCheckedServices(checkedValues);
  // }
  //
  // function onChangeEndpoints(checkedValues) {
  //   setCheckedEndpoints(checkedValues);
  // }

  const onChangeType = (newType) => {
    if (newType === RANGE) {
      setDateType(newType);
      return;
    }

    fetchData(newType);
  };

  return (
    <>
      <DatePanel {...{ dateType, loadDataInRange, fetchData, setLoading }} />
      <Select value={dateType} onChange={onChangeType}>
        {/*<Option value={DAY}>День</Option>*/}
        <Option value={WEEK}>Неделя</Option>
        <Option value={MONTH}>Месяц</Option>
        <Option value={YEAR}>Год</Option>
        <Option value={RANGE}>Диапазон</Option>
      </Select>
      {/*{services.length !== 1 && (*/}
      {/*  <div>*/}
      {/*    Сервисы:&nbsp;*/}
      {/*    <Checkbox.Group*/}
      {/*      options={services}*/}
      {/*      value={checkedServices}*/}
      {/*      onChange={onChange}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{checkedServices.length === 1 && endpoints.length !== 1 && (*/}
      {/*  <div>*/}
      {/*    Товары:&nbsp;*/}
      {/*    <Checkbox.Group*/}
      {/*      options={endpoints}*/}
      {/*      value={checkedEndpoints}*/}
      {/*      onChange={onChangeEndpoints}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
};

export default Selector;
