import { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import DashboardStatistics from "../../components/DashboardStatistics/DashboardStatistics.jsx";
import RecentCustomers from "../../components/RecentCustomers/RecentCustomers.jsx";
import IncomeExpenses from "../../components/IncomeExpenses/IncomeExpenses.jsx";
import { fetchDashboard } from "../../services/dashboardService.js";

function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await fetchDashboard();
        console.log("Dashboard API response:", result);
        setData(result);
      } catch (err) {
        console.error("Dashboard load error:", err);
        const message =
          err?.response?.data?.message ||
          "Dashboard verileri yüklenirken bir hata oluştu.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

const totalProducts = data?.stats?.allProducts ?? 0;
const totalSuppliers = data?.stats?.allSuppliers ?? 0;
const totalCustomers = data?.stats?.allCustomers ?? 0;

// listeler
const recentCustomers = data?.recentCustomers ?? [];
const incomeExpenses = data?.transactions ?? [];

  return (
    <div className={styles.DashboardPage}>
      {loading && <p>Loading dashboard...</p>}
      {error && <p style={{ color: "#eb5050", fontSize: 13 }}>{error}</p>}

      {!loading && !error && (
        <>
   
          <DashboardStatistics
            totalProducts={totalProducts}
            totalSuppliers={totalSuppliers}
            totalCustomers={totalCustomers}
          />

          
          <div className={styles.BottomGrid}>
            <RecentCustomers customers={recentCustomers} />
            <IncomeExpenses items={incomeExpenses} />
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
