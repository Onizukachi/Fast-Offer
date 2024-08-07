import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@context/AuthContext.jsx";
import axios from "axios";
import { API_BACK_BASE_URL } from "@constants/api.js";
import { useNavigate } from "react-router-dom";
import { showToast } from "@utils/toast.js";
import { SUCCESS_LOGIN } from "@constants/toastMessages.js";

const LoginModal = ({ isOpen, onOpenChange, signUpOnOpen }) => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { setUser, setAuthToken } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setErrors({});
  }, [isOpen]);

  const loginUser = async () => {
    axios
      .post(`${API_BACK_BASE_URL}/login`, {
        user: {
          email: formData.email,
          password: formData.password,
        },
      })
      .then((response) => {
        setAuthToken(response.headers.getAuthorization());
        setUser(response.data.user);
        onOpenChange();
        navigate("/");
        showToast(SUCCESS_LOGIN);
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrors({ common: "Неверный email или пароль" });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault;

    loginUser();
  };

  const onRegister = () => {
    onOpenChange();
    signUpOnOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
      size={"lg"}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Вход</ModalHeader>
            <ModalBody>
              {errors.common && <p className="text-danger">{errors.common}</p>}
              <Input
                autoFocus
                label="Email"
                placeholder="Введите ваш email"
                variant="bordered"
                onChange={handleInputChange}
                name="email"
                isInvalid={!!errors.email || !!errors.common}
                color={errors.email || errors.common ? "danger" : ""}
                errorMessage={errors.email}
              />
              <Input
                label="Пароль"
                placeholder="Введите ваш пароль"
                type="password"
                variant="bordered"
                onChange={handleInputChange}
                name="password"
                isInvalid={!!errors.password || !!errors.common}
                color={errors.password || errors.common ? "danger" : ""}
                errorMessage={errors.password}
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                  name="rememberMe"
                  onValueChange={setRememberMe}
                >
                  Запомнить меня
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Забыли пароль?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button color="default" variant="faded" onPress={onRegister}>
                Зарегистрироваться
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Войти
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  signUpOnOpen: PropTypes.func,
};

export default LoginModal;
