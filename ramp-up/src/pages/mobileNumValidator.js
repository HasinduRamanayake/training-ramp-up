import React from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";

export const MobileNumberValidator = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];

  const handleOnChange = (e) => {
    if (props.onChange) {
      props.onChange({
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value:e.value,
        dataIndex: 0,
      });
    }
  };

  return (
    <td>
      {dataItem.inEdit ? (
        <>
          <NumericTextBox
            required
            spinners={false}
            max={9999999999}
            value={parseInt(dataValue)|| 0}          
            format={""}
            onChange={handleOnChange}
            validationMessage={"Cannot be more than 10 Numbers!!!"}
          />
        </>
      ) : (
        dataValue
      )}
    </td>
  );
};

