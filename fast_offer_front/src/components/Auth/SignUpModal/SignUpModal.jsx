import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@context/AuthContext.jsx";
import { showToast } from "@utils/toast.js";
import { SUCCESS_SIGN_UP } from "@constants/toastMessages.js";
import axios from "axios";
import { API_BACK_BASE_URL } from "@constants/api.js";
import { useNavigate } from "react-router-dom";

const SignUpModal = ({ isOpen, onOpenChange, loginModalOnOpen }) => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const { setUser, setAuthToken } = useContext(AuthContext);

  const onLogin = () => {
    onOpenChange();
    loginModalOnOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setErrors({});
    setFormData({
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  }, [isOpen]);

  const signUpUser = async () => {
    axios
      .post(`${API_BACK_BASE_URL}/signup`, {
        user: {
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.passwordConfirmation,
          username: formData.username,
        },
      })
      .then((response) => {
        setAuthToken(response.headers.getAuthorization());
        setUser(response.data.user);
        onOpenChange();
        navigate("/");
        showToast(SUCCESS_SIGN_UP);
      })
      .catch((error) => {
        setErrors(error.response.data.status.errors);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault;

    signUpUser();
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
            <ModalHeader className="flex flex-col gap-1">
              Регистрация
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Никнейм"
                placeholder="Введите никнейм"
                variant="bordered"
                onChange={handleInputChange}
                name="username"
                isInvalid={!!errors.username}
                color={errors.username ? "danger" : ""}
                errorMessage={errors.username
                  ?.map((error) => `Никнейм ${error}`)
                  ?.join(". ")}
              />
              <Input
                label="Email"
                placeholder="Введите email"
                variant="bordered"
                onChange={handleInputChange}
                name="email"
                isInvalid={!!errors.email}
                color={errors.email ? "danger" : ""}
                errorMessage={errors.email
                  ?.map((error) => `Email ${error}`)
                  ?.join(". ")}
              />
              <Input
                label="Пароль"
                placeholder="Введите пароль"
                type="password"
                variant="bordered"
                onChange={handleInputChange}
                name="password"
                isInvalid={!!errors.password}
                color={errors.password ? "danger" : ""}
                errorMessage={errors.password
                  ?.map((error) => `Пароль ${error}`)
                  ?.join(". ")}
              />
              <Input
                label="Подтверждение пароля"
                placeholder="Повторите пароль"
                type="password"
                variant="bordered"
                onChange={handleInputChange}
                name="passwordConfirmation"
                isInvalid={!!errors.password_confirmation}
                color={errors.password_confirmation ? "danger" : ""}
                errorMessage={errors.password_confirmation
                  ?.map((error) => `Пароль подтверждения ${error}`)
                  ?.join(". ")}
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Запомнить меня
                </Checkbox>
              </div>
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button color="default" onPress={onLogin}>
                Войти
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Зарегистрироваться
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

SignUpModal.propTypes = {
  isOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  loginModalOnOpen: PropTypes.func,
};

export default SignUpModal;
