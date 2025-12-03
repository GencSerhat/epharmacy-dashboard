import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../LoginPage/LoginPage.module.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import { register } from "../../services/authService.js";

function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const handleRegister = async (formData) => {
    try {
      setServerError("");

      const data = await register(formData);

      if (data?.token) {
        localStorage.setItem("accessToken", data.token);
      }

      // Başarılıysa direkt dashboard'a
      navigate("/dashboard");
    } catch (error) {
      console.error("Register error:", error);
      const message =
        error?.response?.data?.message ||
        "Registration failed. Please check your information and try again.";
      setServerError(message);
    }
  };

  return (
    <div className={styles.LoginPage}>
      <div className={styles.Container}>
        <header className={styles.Header}>
          <div className={styles.Logo}>
            <span className={styles.LogoIcon} />
            <span className={styles.LogoText}>E-Pharmacy</span>
          </div>
        </header>

        <main className={styles.Main}>
          <section className={styles.Left}>
            <h1 className={styles.Headline}>
              Create your admin account
              <br />
              and start managing{" "}
              <span className={styles.Highlight}>your pharmacy</span>
              <br />
              in one dashboard
            </h1>
          </section>

          <section className={styles.Right}>
            <div className={styles.FormCard}>
              <RegisterForm onSubmit={handleRegister} serverError={serverError} />

              <p className={styles.SwitchAuthText}>
                Already have an account?{" "}
                <Link to="/login" className={styles.SwitchAuthLink}>
                  Log in
                </Link>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default RegisterPage;
