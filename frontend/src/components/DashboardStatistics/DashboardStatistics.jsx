// src/components/DashboardStatistics/DashboardStatistics.jsx
import styles from "./DashboardStatistics.module.css";

function DashboardStatistics({
  totalProducts = 0,
  totalSuppliers = 0,
  totalCustomers = 0,
}) {
  const items = [
    { id: "products", label: "All products", value: totalProducts, active: true },
    { id: "suppliers", label: "All suppliers", value: totalSuppliers, active: false },
    { id: "customers", label: "All customers", value: totalCustomers, active: false },
  ];

  return (
    <section className={styles.Statistics}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.Card} ${
            item.active ? styles.CardActive : ""
          }`}
        >
          <p className={styles.Label}>{item.label}</p>
          <p className={styles.Value}>{item.value}</p>
        </div>
      ))}
    </section>
  );
}

export default DashboardStatistics;
