import PropTypes from "prop-types";
import { Input } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";
import { memo } from "react";

const SearchInput = memo(function SearchInput({ inputRef, onFocus, onChange }) {
  return (
    <Input
      ref={inputRef}
      type="search"
      size="lg"
      onFocus={onFocus}
      onValueChange={onChange}
      placeholder="Поиск по вопросам"
      startContent={
        <IoSearchOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
  );
});

SearchInput.propTypes = {
  inputRef: PropTypes.object,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
};

export default SearchInput;
