import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

function ListSelect(props) {
  if (!props.id) {
    console.log("No id for", props);
    throw new Error(`no id for props ${JSON.stringify(props)}`);
  }
  const { value, id, onChange, onBlur, schema } = props;

  const _onChange = ({ value }) => {
    return onChange(value);
  };

  const { list } = schema;

  let defaultOption = {};

  const options = Object.keys(list).map(listItemValue => {
    const option = {
      value: listItemValue,
      label: list[listItemValue],
    };

    if (value === listItemValue) {
      defaultOption = option;
    }

    return option;
  });

  return (
    <Select
      id={id}
      onChange={_onChange}
      onBlur={onBlur}
      options={options}
      defaultValue={defaultOption}
    />
  );
}

if (process.env.NODE_ENV !== "production") {
  ListSelect.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default ListSelect;
