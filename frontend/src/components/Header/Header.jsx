import {Link, useNavigate} from "react-router-dom";
import styles from "./Header.module.css";
import { useState,useEffect } from "react";

function Header() {

      const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("userEmail");
    if (emailFromStorage) {
      setUserEmail(emailFromStorage);
    }
  }, []);



    const navigate = useNavigate();

    const handleLogout = () => {
  
        localStorage.removeItem("accessToken");
        navigate("/login");
    };
    return (
        <header className={styles.Header}>
            <div className={styles.Left}>
                <div className={styles.Logo}>
                    <span className={styles.LogoIcon}/>
                    <span className={styles.LogoText}>Medicine store</span>

                </div>
                <div className={styles.Breadcrumbs}>
                    <Link to="/dashboard" className={styles.BreadcrumbLink}>Dashboard</Link>
                    <span className={styles.BreadcrumbSeparator}>|</span>
                    <span className={styles.BreadcrumbEmail}>{userEmail || "vendor@gmail.com"}</span>

                </div>

            </div>
            <div className={styles.Right}>
        <button className={styles.LogoutButton} onClick={handleLogout}>
          Log out
        </button>
      </div>

        </header>
    );
}
export default Header;