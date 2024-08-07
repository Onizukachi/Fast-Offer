import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";

const FiltersBlock = ({
  isLoading,
  selectedGradeId,
  handleGradeChange,
  grades,
  selectedPositionIds,
  handlePositionsChange,
  positions,
}) => {
  return (
    <>
      <Select
        isDisabled={isLoading}
        label="Уровень сложности"
        defaultSelectedKeys={[selectedGradeId?.toString()]}
        labelPlacement="outside"
        placeholder="Выберите уровень"
        className="max-w-56"
        disableSelectorIconRotation
        onChange={(e) => handleGradeChange(e.target.value)}
      >
        {grades.map((grade) => (
          <SelectItem key={grade.id}>{grade.grade}</SelectItem>
        ))}
      </Select>
      <Select
        isDisabled={isLoading}
        label="Языки программирования"
        defaultSelectedKeys={selectedPositionIds}
        labelPlacement="outside"
        selectionMode="multiple"
        placeholder="Выберите языки"
        className="max-w-56"
        onChange={(e) =>
          handlePositionsChange(new Set(e.target.value.split(",")))
        }
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
    </>
  );
};

FiltersBlock.propTypes = {
  isLoading: PropTypes.bool,
  selectedGradeId: PropTypes.any,
  handleGradeChange: PropTypes.func,
  selectedPositionIds: PropTypes.array,
  handlePositionsChange: PropTypes.func,
  positions: PropTypes.array,
  grades: PropTypes.array,
};

export default FiltersBlock;
