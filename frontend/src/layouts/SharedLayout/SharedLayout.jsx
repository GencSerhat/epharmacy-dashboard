// src/layouts/SharedLayout/SharedLayout.jsx
import { Outlet } from "react-router-dom";
import styles from "./SharedLayout.module.css";

function SharedLayout() {
  return (
    <div className={styles.Layout}>
      {/* Sol taraf: sidebar alanı (şimdilik placeholder) */}
      <aside className={styles.Sidebar}>
        <div className={styles.SidebarInner}>
          {/* Buraya bir sonraki adımlarda gerçek Sidebar bileşenini koyacağız */}
          <p className={styles.SidebarPlaceholder}>Sidebar</p>
        </div>
      </aside>

      {/* Sağ taraf: header + içerik */}
      <div className={styles.MainArea}>
        <header className={styles.Header}>
          {/* Buraya bir sonraki adımlarda gerçek Header bileşenini koyacağız */}
          <h1 className={styles.HeaderTitle}>Medicine store</h1>
          <p className={styles.HeaderSubtitle}>Dashboard | vendor@gmail.com</p>
        </header>

        <main className={styles.Content}>
          {/* İç içe rotalar buradan render edilecek */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SharedLayout;
