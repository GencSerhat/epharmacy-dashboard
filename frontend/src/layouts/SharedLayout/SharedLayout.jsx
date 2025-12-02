import { Outlet } from "react-router-dom";
import styles from "./SharedLayout.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

function SharedLayout() {
  return (
    <div className={styles.Layout}>
     
      <aside className={styles.Sidebar}>
        <div className={styles.SidebarInner}>
          <Sidebar />
        </div>
      </aside>

      
      <div className={styles.MainArea}>
        <Header />
    

        <main className={styles.Content}>
         
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SharedLayout;
