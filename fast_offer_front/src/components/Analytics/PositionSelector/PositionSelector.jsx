import PropTypes from "prop-types";
import { memo } from "react";
import { Select, SelectItem } from "@nextui-org/react";

const PositionSelector = memo(function PositionSelector({
  positions,
  handleChange,
  selectedId,
}) {
  const findRuby = () => {
    const ruby = positions.find((el) => el.id === 77);
    if (!ruby) return

    return String(ruby.id)
  }

  const defaultKey = () => {
    if (selectedId) return selectedId;

    return findRuby(positions);
  }

  return (
    <Select
      label="Язык программирования"
      selectedKeys={positions.length > 0 ? [defaultKey()] : []}
      labelPlacement="outside"
      placeholder="Выберите язык программирования"
      className="max-w-56 self-center"
      disableSelectorIconRotation
      onChange={(e) => handleChange(e.target.value)}
      startContent={
        positions.length > 0 && (
          <img
            alt="Argentina"
            className="w-6 h-6"
            src={positions.find((el) => el.id === Number(defaultKey())).image_url}
          />
        )
      }
    >
      {positions.map((position) => (
        <SelectItem
          startContent={
            <img alt="Argentina" className="w-6 h-6" src={position.image_url} />
          }
          key={position.id}
        >
          {position.title}
        </SelectItem>
      ))}
    </Select>
  );
});

PositionSelector.propTypes = {
  positions: PropTypes.array,
  handleChange: PropTypes.func,
  selectedId: PropTypes.string,
};

export default PositionSelector;
