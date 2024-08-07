import {
  Button,
  useDisclosure,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { MdAccountCircle } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import LoginModal from "@components/Auth/LoginModal/index.js";
import SignUpModal from "@components/Auth/SignUpModal/index.js";
import AuthContext from "@context/AuthContext.jsx";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
  const navigate = useNavigate();
  const {
    isOpen: loginModalIsOpen,
    onOpen: loginModalOnOpen,
    onOpenChange: loginModalOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: signUpIsOpen,
    onOpen: signUpOnOpen,
    onOpenChange: signUpOnOpenChange,
  } = useDisclosure();
  const { user, setUser, setAuthToken } = useContext(AuthContext);

  const successToast = () => {
    toast.success("Выход из системы выполнен.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const logoutUser = (e) => {
    e.preventDefault();
    setAuthToken(null)
    setUser(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigate('/')
    successToast();
  }

  return (
    <NavbarContent justify="end">
      <NavbarItem>
        { user ? (
          <Button
            onClick={logoutUser}
            color="warning"
            variant="flat"
            size={"lg"}
          >
            <IoMdExit size={"1.6em"} />
            Выйти
          </Button>
        ) : (
          <Button
            onClick={loginModalOnOpen}
            color="warning"
            variant="flat"
            size={"lg"}
          >
            <MdAccountCircle size={"1.6em"} />
            Войти
          </Button>
        )}
      </NavbarItem>

      <LoginModal
        isOpen={loginModalIsOpen}
        onOpenChange={loginModalOnOpenChange}
        signUpOnOpen={signUpOnOpen}
      />
      <SignUpModal
        isOpen={signUpIsOpen}
        onOpenChange={signUpOnOpenChange}
        loginModalOnOpen={loginModalOnOpen}
      />
    </NavbarContent>
  );
};

export default Auth;
