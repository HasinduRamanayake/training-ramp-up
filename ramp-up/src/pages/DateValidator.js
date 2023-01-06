import React, { useEffect, useState } from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";

export const DateValidator = (props) => {
  const [value, setValue] = useState(new Date());
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field];

  useEffect(() => {
    setValue(dataValue);
  }, []);

  const handleOnChange = (e) => {
    if (props.onChange) {
      setValue(e.value);

      props.onChange({
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.value,
        dataIndex: 0,
      });
    }
  };
  const year = value.getFullYear();
  const month = value.getMonth();
  const date = value.getDate();
  const max = new Date();

  return (
    <td>
      {dataItem.inEdit ? (
        <DatePicker value={value} onChange={handleOnChange} max={max} />
      ) : (
        `${1 + month}/${date}/${year}`
      )}
    </td>
  );
};
