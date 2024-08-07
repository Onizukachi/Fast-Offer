import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const ActionMenu = ({ onAction, showEdit= true, showDelete = true }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="min-w-0 px-0">
          <CiMenuKebab size="1.4em" className="cursor-pointer" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={onAction}
        variant="faded"
        aria-label="Dropdown menu with description"
      >
        {showEdit && (
          <DropdownItem
            key="edit"
            showDivider
            startContent={<MdEdit size="1.3em" />}
          >
            Редактировать
          </DropdownItem>
        )}
        {showDelete && (
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<FaRegTrashAlt size="1.3em" />}
          >
            Удалить
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

ActionMenu.propTypes = {
  onAction: PropTypes.func,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
};

export default ActionMenu;
