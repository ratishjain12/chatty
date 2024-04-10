import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles.css";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { authData } from "../../types";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleRegister = (values: authData) => {
    axios
      .post(`${backendUrl}/auth/register`, values, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status == 200) {
          toast.success("Registered successfully!!");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
          navigate("/app");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        // Handle login error
        console.error("Registeration failed", error);
      });
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/chat.png" alt="Chat icon" />
      </div>
      <div className={"login-box " + (theme ? "dark" : "")}>
        <h3>Register</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleRegister(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Field
                type="text"
                name="name"
                className="input"
                placeholder="Enter name"
              />
              <ErrorMessage name="name" component="div" />
              <Field
                type="text"
                name="username"
                className="input"
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" />

              <Field
                type="email"
                name="email"
                className="input"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" />

              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className="input"
              />
              <ErrorMessage name="password" component="div" />

              <button
                type="submit"
                className="login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p
          style={{ cursor: "pointer", color: "#7FFFD4" }}
          onClick={() => navigate("/")}
        >
          Already have an account?{" "}
          <span style={{ color: "white", textDecoration: "underline" }}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
