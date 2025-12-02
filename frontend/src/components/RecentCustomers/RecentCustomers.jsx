import styles from "./RecentCustomers.module.css";

function RecentCustomers({ customers = [] }) {
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
          <div key={customer.id || customer._id} className={styles.Row}>
            <div className={styles.Cell}>{customer.name}</div>
            <div className={styles.Cell}>{customer.email}</div>
            <div className={styles.CellRight}>
              {customer.spent ?? customer.totalSpent ?? "-"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentCustomers;
