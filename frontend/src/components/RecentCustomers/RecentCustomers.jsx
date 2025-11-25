// src/components/RecentCustomers/RecentCustomers.jsx
import styles from "./RecentCustomers.module.css";

function RecentCustomers() {
  // Şimdilik static, sonra backend verisi gelecek
  const customers = [
    { id: 1, name: "Alex Shatov", email: "alexshatov@gmail.com", spent: "2,890.66" },
    { id: 2, name: "Philip Harbach", email: "philip.h@gmail.com", spent: "2,767.04" },
    { id: 3, name: "Mirko Fisuk", email: "mirkofisuk@gmail.com", spent: "2,996.00" },
    { id: 4, name: "Olga Semklo", email: "olga.s@cool.design", spent: "1,220.66" },
    { id: 5, name: "Burak Long", email: "longburak@gmail.com", spent: "1,890.66" },
  ];

  return (
    <section className={styles.Block}>
      <h2 className={styles.Title}>Recent Customers</h2>

      <div className={styles.Table}>
        <div className={`${styles.Row} ${styles.HeaderRow}`}>
          <div className={styles.Cell}>Name</div>
          <div className={styles.Cell}>Email</div>
          <div className={styles.CellRight}>Spent</div>
        </div>

        {customers.map((customer) => (
          <div key={customer.id} className={styles.Row}>
            <div className={styles.Cell}>{customer.name}</div>
            <div className={styles.Cell}>{customer.email}</div>
            <div className={styles.CellRight}>{customer.spent}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentCustomers;
