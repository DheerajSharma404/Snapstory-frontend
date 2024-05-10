import React from "react";
import { toast } from "sonner";
import { signIn } from "../../../api/ auth";
import { AuthContext } from "../../../contexts/AuthContexts.jsx";
import { ModalContext } from "../../../contexts/ModalContexts";
import { userValidationSchema } from "../../../validations/user.validation.js";
import styles from "./SignInFrom.module.css";

const SignInForm = () => {
  const { login } = React.useContext(AuthContext);
  const { toggleModal } = React.useContext(ModalContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState(null); //[username: "username is required", password: "password is required"
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

  const handleCloseModal = () => {
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    const response = await signIn(formData);
    if (response.success) {
      // Handle successful registration (e.g., navigate to another page)
      login(response.data);
      toggleModal();
      toast.success(response?.message);
    } else {
      toast.error(response?.error?.explanation);
    }
    setFormErrors({});
  };

  return (
    <div className={styles.signInFromWrapper}>
      <h1 className={styles.signInFormHeading}>Login to Snapstory</h1>
      <form onSubmit={handleSubmit} className={styles.signInForm}>
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
          <button type='submit' className={styles.loginBtn}>
            Login
          </button>
        </div>
      </form>
      <div className={styles.modalCloseIcon}>
        <img
          src='/assets/icons/cancel.svg'
          alt='close icon'
          onClick={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default SignInForm;
