import { Select, Checkbox } from "antd";
import React from "react";
import { DAY, MONTH, RANGE, WEEK, YEAR } from "../tools/constant";
import DatePanel from "./DatePanel";

const { Option } = Select;

const Selector = ({
  fetchData,
                    loadDataInRange,
  services,
  setCheckedServices,
  checkedServices,
  setDateType,
  dateType,
  impulses,
  checkedImpulses,
  setCheckedImpulses,
}) => {
  function onChange(checkedValues) {
    setCheckedServices(checkedValues);
  }

  function onChangeEndpoints(checkedValues) {
    setCheckedImpulses(checkedValues);
  }

  const onChangeType = (newType) => {
    if (newType === RANGE) {
      setDateType(newType);
      return;
    }
    setDateType(newType);
    fetchData();
  };

  return (
    <>
      <DatePanel {...{ dateType, loadDataInRange, fetchData }} />

      <Select value={dateType} onChange={onChangeType}>
        <Option value={DAY}>День</Option>
        <Option value={WEEK}>Неделя</Option>
        <Option value={MONTH}>Месяц</Option>
        <Option value={YEAR}>Год</Option>
        <Option value={RANGE}>Диапазон</Option>
      </Select>
      {services.length !== 1 && (
        <div>
          Сервисы:&nbsp;
          <Checkbox.Group
            options={services}
            value={checkedServices}
            onChange={onChange}
          />
        </div>
      )}
      {checkedServices.length === 1 && impulses.length !== 1 && (
        <div>
          Товары:&nbsp;
          <Checkbox.Group
            options={impulses}
            value={checkedImpulses}
            onChange={onChangeEndpoints}
          />
        </div>
      )}
    </>
  );
};

export default Selector;
