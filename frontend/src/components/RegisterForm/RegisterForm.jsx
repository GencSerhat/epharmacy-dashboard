import { useState } from "react";
import styles from "../LoginForm/LoginForm.module.css"; 

function RegisterForm({ onSubmit, serverError }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalError("");

    if (!formValues.name || !formValues.email || !formValues.password) {
      setLocalError("All fields are required");
      return;
    }

    if (formValues.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    onSubmit(formValues);
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <h2 className={styles.FormTitle}>Create an account</h2>

      <label className={styles.Label}>
        Name
        <input
          className={styles.Input}
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
      </label>

      <label className={styles.Label}>
        Email address
        <input
          className={styles.Input}
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
      </label>

      <label className={styles.Label}>
        Password
        <input
          className={styles.Input}
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="********"
        />
      </label>

      {(localError || serverError) && (
        <p className={styles.ErrorText}>{localError || serverError}</p>
      )}

      <button type="submit" className={styles.SubmitButton}>
        Sign up
      </button>
    </form>
  );
}

export default RegisterForm;
