import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import {memo} from "react";

const ORDER_OPTIONS = [
  { key: "desc", label: "По возрастанию" },
  { key: "asc", label: "По убыванию" },
];

const Sorting = memo(function Sorting ({ sortBy, sortOrder, handleSortingChange}) {
  return (
    <>
      <Select
        label="Сортировать по дате"
        defaultSelectedKeys={sortBy === "created_at" ? [sortOrder] : []}
        selectedKeys={sortBy === "created_at" ? [sortOrder] : []}
        labelPlacement="outside"
        placeholder="Направление"
        className="max-w-44"
        disableSelectorIconRotation
        onChange={(e) => handleSortingChange("created_at", e.target.value)}
      >
        {ORDER_OPTIONS.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
      <Select
        label="Сортировать по популярности"
        selectedKeys={sortBy === "answers_count" ? [sortOrder] : []}
        defaultSelectedKeys={sortBy === "answers_count" ? [sortOrder] : []}
        labelPlacement="outside"
        placeholder="Направление"
        className="max-w-56"
        disableSelectorIconRotation
        onChange={(e) => handleSortingChange("answers_count", e.target.value)}
      >
        {ORDER_OPTIONS.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </>
  );
});

Sorting.propTypes = {
  sortBy: PropTypes.string,
  sortOrder: PropTypes.string,
  handleSortingChange: PropTypes.func,
};

export default Sorting;
