// src/components/DashboardStatistics/DashboardStatistics.jsx
import styles from "./DashboardStatistics.module.css";

function DashboardStatistics() {
  // Şimdilik dummy veriler, sonra backend'ten gelecek
  const items = [
    { id: "products", label: "All products", value: "8,430", active: true },
    { id: "suppliers", label: "All suppliers", value: "211", active: false },
    { id: "customers", label: "All customers", value: "140", active: false },
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
