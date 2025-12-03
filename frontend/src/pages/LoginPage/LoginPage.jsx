import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { login } from "../../services/authService.js";

function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const handleLogin = async (formData) => {
    try {
      setServerError("");

      const data = await login(formData);

    
      if (data?.token) {
        localStorage.setItem("accessToken", data.token);
      }

          // karşılama
    if (data?.user?.email) {
      localStorage.setItem("userEmail", data.user.email);
    }
 
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      
      const message =
        error?.response?.data?.message ||
        "Invalid email or password. Please try again.";
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
              Your medication, delivered
              <br />
              Say goodbye to all{" "}
              <span className={styles.Highlight}>your healthcare</span>
              <br />
              worries with us
            </h1>
          </section>

          <section className={styles.Right}>
            <div className={styles.FormCard}>
              <LoginForm onSubmit={handleLogin} />

              {serverError && (
                <p className={styles.ServerError}>{serverError}</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default LoginPage;
