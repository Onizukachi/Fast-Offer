import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";
import { memo } from "react";

const PositionSelector = memo(function SearchInput({
  selectedIds,
  onChange,
  positions,
}) {
  return (
    <Select
      label="Языки программирования"
      defaultSelectedKeys={selectedIds}
      labelPlacement="outside"
      selectionMode="multiple"
      placeholder="Выберите языки"
      className="max-w-56"
      onChange={(e) => onChange(new Set(e.target.value.split(",")))}
    >
      {positions.map((position) => (
        <SelectItem
          key={position.id}
          startContent={
            <img
              className="w-6 h-6"
              src={position.image_url}
              alt={position.title}
            ></img>
          }
        >
          {position.title}
        </SelectItem>
      ))}
    </Select>
  );
});

PositionSelector.propTypes = {
  selectedIds: PropTypes.any,
  positions: PropTypes.array,
  onChange: PropTypes.func,
};

export default PositionSelector;
