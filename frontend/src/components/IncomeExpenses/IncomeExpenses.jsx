import styles from "./IncomeExpenses.module.css";

function IncomeExpenses({ items = [] }) {
  const getBadgeClass = (type) => {
    if (type === "Income") return `${styles.Badge} ${styles.BadgeIncome}`;
    if (type === "Expense") return `${styles.Badge} ${styles.BadgeExpense}`;
    if (type === "Error") return `${styles.Badge} ${styles.BadgeError}`;
    return styles.Badge;
  };

  const formatAmount = (value) => {
    const num = Number(value) || 0;
    return `${num > 0 ? "+" : ""}${num.toFixed(2)}`;
  };

  const getAmountClass = (value) =>
    `${styles.Amount} ${
      Number(value) > 0 ? styles.AmountPositive : styles.AmountNegative
    }`;

  return (
    <section className={styles.Block}>
      <div className={styles.Header}>
        <h2 className={styles.Title}>Income/Expenses</h2>
        <span className={styles.Subtitle}>Today</span>
      </div>

      <ul className={styles.List}>
        {items.map((item) => (
          <li key={item.id || item._id} className={styles.Item}>
            <span className={getBadgeClass(item.type)}>{item.type}</span>
            <span className={styles.Description}>
              {item.title || item.description}
            </span>
            <span className={getAmountClass(item.amount)}>
              {formatAmount(item.amount)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default IncomeExpenses;
