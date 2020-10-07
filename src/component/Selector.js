import React from "react";
import { Select, Checkbox } from "antd";
import { MONTH, RANGE, WEEK, YEAR } from "../tools/constant";
import DatePanel from "./DatePanel";

const { Option } = Select;

const Selector = ({
  fetchData,
  loadDataInRange,
  setLoading,
  setDateType,
  dateType,
  selectEndpoints,
  endpoints,
  checkedEndpoints,
}) => {
  const onChangeEndpoints = (checkedValues) => {
    selectEndpoints(checkedValues);
  };
  const onChangeType = (newType) => {
    if (newType === RANGE) {
      setDateType(newType);
      return;
    }

    fetchData(newType);
  };

  return (
    <>
      <div>
        <Select value={dateType} onChange={onChangeType}>
          {/*<Option value={DAY}>День</Option>*/}
          <Option value={WEEK}>Неделя</Option>
          <Option value={MONTH}>Месяц</Option>
          <Option value={YEAR}>Год</Option>
          <Option value={RANGE}>Диапазон</Option>
        </Select>
      </div>
      <DatePanel {...{ dateType, loadDataInRange, fetchData, setLoading }} />
      {endpoints.length > 1 && (
        <div>
          <Checkbox.Group
            options={endpoints}
            value={checkedEndpoints}
            onChange={onChangeEndpoints}
          />
        </div>
      )}
    </>
  );
};

export default Selector;
