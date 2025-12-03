import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter valid email"),
  password: yup
    .string()
    .required("Password is erquired")
    .min(6, "Password must be at least 6 characters"),
});

function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
      console.log("Login form data:", data);
    }
  };
  return (
    <>
      <form className={styles.Form} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={styles.InputGroup}>
          <label className={styles.Label} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className={`${styles.Input} ${
              errors.email ? styles.InputError : ""
            }`}
            placeholder="Email address"
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.ErrorText}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.InputGroup}>
          <label className={styles.Label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`${styles.Input} ${
              errors.password ? styles.InputError : ""
            }`}
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.ErrorText}>{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={styles.SubmitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
        <p className={styles.SwitchAuthText}>
          Don’t have an account?{" "}
          <Link to="/register" className={styles.SwitchAuthLink}>
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
}
export default LoginForm;
