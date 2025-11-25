// src/pages/DashboardPage/DashboardPage.jsx
import styles from "./DashboardPage.module.css";
import DashboardStatistics from "../../components/DashboardStatistics/DashboardStatistics.jsx";
import RecentCustomers from "../../components/RecentCustomers/RecentCustomers.jsx";
import IncomeExpenses from "../../components/IncomeExpenses/IncomeExpenses.jsx";

function DashboardPage() {
  return (
    <div className={styles.DashboardPage}>
      {/* Üst istatistik kartları */}
      <DashboardStatistics />

      {/* Alt iki kolon: Recent Customers + Income/Expenses */}
      <div className={styles.BottomGrid}>
        <RecentCustomers />
        <IncomeExpenses />
      </div>
    </div>
  );
}

export default DashboardPage;
