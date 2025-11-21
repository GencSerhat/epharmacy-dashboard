// src/pages/DashboardPage/DashboardPage.jsx
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  return (
    <div className={styles.DashboardPage}>
      {/* Sonraki adımlarda buraya Statistics, RecentCustomers, IncomeExpenses bileşenlerini ekleyeceğiz */}
      <h1 className={styles.Title}>Dashboard</h1>
      <p className={styles.Subtitle}>
        Here will be your pharmacy statistics, recent customers and income/expenses.
      </p>
    </div>
  );
}

export default DashboardPage;
