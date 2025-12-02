// src/layouts/SharedLayout/SharedLayout.jsx
import { Outlet } from "react-router-dom";
import styles from "./SharedLayout.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

function SharedLayout() {
  return (
    <div className={styles.Layout}>
      {/* Sol taraf: sidebar alanı (şimdilik placeholder) */}
      <aside className={styles.Sidebar}>
        <div className={styles.SidebarInner}>
          <Sidebar />
        </div>
      </aside>

      {/* Sağ taraf: header + içerik */}
      <div className={styles.MainArea}>
        <Header />
    

        <main className={styles.Content}>
          {/* İç içe rotalar buradan render edilecek */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SharedLayout;
