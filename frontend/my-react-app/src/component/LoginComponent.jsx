import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import "../css/loginForm.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function LoginComponent() {
  const handleSubmit = async(values, { resetForm }) => {
   try{

    const response= await axios.post("http://localhost:4000/api/users/signInUsers", values)

     if (response.data && response.data.success) {
        toast.info(`${response.data.message}`);
      } else {
        toast.error("Login failed. Please try again.");
      } 
          resetForm();
    }
   catch(err)
   {
     if (err.response && err.response.status === 400) {
                toast.error(`${err.response.data.message}`);
            } else {
                toast.error("An error occurred. Please try again.");
            }
   }
  
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
        <Form className="form">
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit">Login</button>
          <ToastContainer/>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginComponent;
