import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { authData } from "../../types";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Cookies from "js-cookie";
const Login = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token cookie exists
    const token = Cookies.get("token");
    if (token) {
      navigate("/app");
    }
  }, [navigate]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleLogin = (values: authData) => {
    // Handle login logic here, for example, making an API call
    axios
      .post(`${backendUrl}auth/login`, values, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status == 200) {
          toast.success("Logged in!!");
          localStorage.setItem("id", response.data.id);
          navigate("/app");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        // Handle login error
        console.error("Login failed", error);
      });
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/chat.png" alt="Chat icon" />
      </div>
      <div className={"login-box " + (theme ? "dark" : "")}>
        <img style={{ width: "100px" }} src="/chat.png" alt="Chat icon" />
        <h3>Login with your account</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Field
                type="text"
                className="input"
                name="username"
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" />

              <Field
                type="password"
                name="password"
                className="input"
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" />

              <button
                type="submit"
                className="login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p
          style={{ cursor: "pointer", color: "#7FFFD4" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account?{" "}
          <span style={{ color: "white", textDecoration: "underline" }}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
