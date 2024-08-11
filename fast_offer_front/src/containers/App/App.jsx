import { Routes, Route } from "react-router-dom";
import routesConfig from "@routes/routesConfig.js";
import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "@context/AuthContext";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "./App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/min/moment-with-locales";
import PrivateRoute from "@utils/privateRoute.jsx";

function App() {
  moment.locale("ru"); // Устанавливаем глобально локаль для moment
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <ToastContainer />
      <AuthProvider>
        <div className={styles.bodyWrapper}>
          <Header />

          <div className={styles.main}>
            <Routes>
              {routesConfig.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route.private ? (
                      <PrivateRoute>{route.element}</PrivateRoute>
                    ) : (
                      <route.element />
                    )
                  }
                />
              ))}
            </Routes>
          </div>

          <Footer />
        </div>
      </AuthProvider>
    </NextUIProvider>
  );
}

export default App;
