import React from "react";

import { toast } from "sonner";
import { signUp } from "../../../api/ auth.js";
import { ModalContext } from "../../../contexts/ModalContexts";
import { userValidationSchema } from "../../../validations/user.validation.js";
import styles from "./SignUpFrom.module.css";

const SignUpForm = () => {
  const { toggleModal } = React.useContext(ModalContext);
  const [showPassword, setShowPassword] = React.useState(false);

  const [formErrors, setFormErrors] = React.useState({}); //[username: "username is required", password: "password is required"
  const [formData, setFromData] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClick = () => {
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validation = userValidationSchema.safeParse(formData);

      if (!validation.success) {
        const error = validation.error;
        let newError = {};
        for (const issue of error.issues) {
          newError = { ...newError, [issue.path[0]]: issue.message };
        }
        return setFormErrors(newError);
      }
      // If validation is successful, send a request to the backend
      const response = await signUp(formData);
      if (response.success) {
        // Handle successful registration (e.g., navigate to another page)
        toggleModal();
        toast.success(response?.message);
      }
      // Handle failed registration (e.g., show an error message)

      setFormErrors({});
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className={styles.signInFromWrapper}>
      <h1 className={styles.signInFormHeading}>Register to Snapstory</h1>
      <form className={styles.signInForm}>
        <div className={styles.formFieldWrapper}>
          <div className={styles.formInputWrapper}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              placeholder='Enter username'
              onChange={handleChange}
            />
          </div>

          <div className={styles.formInputWrapper}>
            <label htmlFor='password'>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              value={formData.password}
              placeholder='Enter password'
              onChange={handleChange}
            />
            <img
              src='/assets/icons/eye.svg'
              alt='passswor visible toggle image'
              className={styles.passwordVisibilityToggleIcon}
              onClick={handleShowPassword}
            />
          </div>
        </div>
        <div className={styles.formError}>
          {formErrors ? (
            formErrors.username ? (
              <p>{formErrors.username}</p>
            ) : (
              <p>{formErrors.password}</p>
            )
          ) : null}
        </div>

        <div className={styles.loginBtnWrapper}>
          <button
            type='submit'
            className={styles.loginBtn}
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
      <div className={styles.modalCloseIcon}>
        <img
          src='/assets/icons/cancel.svg'
          alt='close icon'
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SignUpForm;
