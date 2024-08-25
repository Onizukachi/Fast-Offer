import PropTypes from "prop-types";
import { Select, SelectItem } from "@nextui-org/react";
import { memo } from "react";

const DifficultySelector = memo(function SearchInput({
  selectedId,
  onChange,
  grades,
}) {
  return (
    <Select
      label="Уровень сложности"
      defaultSelectedKeys={[selectedId?.toString()]}
      labelPlacement="outside"
      placeholder="Выберите уровень"
      className="max-w-56"
      disableSelectorIconRotation
      onChange={(e) => onChange(e.target.value)}
    >
      {grades.map((grade) => (
        <SelectItem key={grade.id}>{grade.grade}</SelectItem>
      ))}
    </Select>
  );
});

DifficultySelector.propTypes = {
  selectedId: PropTypes.any,
  grades: PropTypes.array,
  onChange: PropTypes.func,
};

export default DifficultySelector;
