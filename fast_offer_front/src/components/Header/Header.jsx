import {useContext, useState} from "react";
import Auth from "@components/Auth";
import { NavLink, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import queryString from "query-string";
import imgLogo from "./img/logo.svg";
import { useSelector } from "react-redux";
import AuthContext from "@context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const storedPositionId = useSelector((state) => state.positionReducer);
  const currLocation = useLocation().pathname.split("/")[1];
  const menuItems = ["Вопросы", "Собесы", "Избранное"];
  const { user } = useContext(AuthContext);

  const makeQuestionsPageLink = () => {
    if (!storedPositionId) return `/questions`;

    const queryParams = queryString.stringify({
      position_ids: storedPositionId,
    });
    return `/questions?${queryParams}`;
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth={"xl"}
      height={"70px"}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavLink to="/">
          <NavbarBrand>
            <img className="h-11 w-11" src={imgLogo} />
            <p className="font-bold text-inherit flex ml-2 text-lg">
              Simple Offer
            </p>
          </NavbarBrand>
        </NavLink>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavLink to="/">
          <NavbarBrand className="mr-5">
            <img className="h-11 w-11" src={imgLogo} />
            <p className="font-bold text-inherit flex ml-2 text-lg">
              Fast Offer
            </p>
          </NavbarBrand>
        </NavLink>
        <NavbarItem isActive={currLocation === "questions"}>
          <Link
            color={currLocation === "questions" ? "primary" : "foreground"}
            href={makeQuestionsPageLink()}
          >
            Вопросы
          </Link>
        </NavbarItem>
        <NavbarItem isActive={currLocation === "interviews"}>
          <Link
            color={currLocation === "interviews" ? "primary" : "foreground"}
            href="/interviews"
          >
            Собесы
          </Link>
        </NavbarItem>
        { user && (
          <NavbarItem isActive={currLocation === "favorites"}>
            <Link
              color={currLocation === "favorites" ? "primary" : "foreground"}
              href="/favorites"
            >
              Избранное
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Login and Register section */}
      <Auth />

      {/* Burger Menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
