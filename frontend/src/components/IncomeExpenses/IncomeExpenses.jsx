// src/components/IncomeExpenses/IncomeExpenses.jsx
import styles from "./IncomeExpenses.module.css";

function IncomeExpenses() {
  // Şimdilik static liste; sonra backend'e bağlayacağız
  const items = [
    { id: 1, type: "Expense", title: "Qonto billing", amount: -49.88 },
    {
      id: 2,
      type: "Income",
      title: "Cruip.com Market Ltd 70 Wilson St London",
      amount: 249.88,
    },
    { id: 3, type: "Income", title: "Notion Labs Inc", amount: 99.99 },
    { id: 4, type: "Income", title: "Market Cap Ltd", amount: 1200.88 },
    {
      id: 5,
      type: "Error",
      title: "App.com Market Ltd 70 Wilson St London",
      amount: 99.99,
    },
    { id: 6, type: "Expense", title: "App.com Market Ltd 70 Wilson St London", amount: -49.88 },
  ];

  const getBadgeClass = (type) => {
    if (type === "Income") return `${styles.Badge} ${styles.BadgeIncome}`;
    if (type === "Expense") return `${styles.Badge} ${styles.BadgeExpense}`;
    if (type === "Error") return `${styles.Badge} ${styles.BadgeError}`;
    return styles.Badge;
  };

  const formatAmount = (value) =>
    `${value > 0 ? "+" : ""}${value.toFixed(2)}`;

  const getAmountClass = (value) =>
    `${styles.Amount} ${
      value > 0 ? styles.AmountPositive : styles.AmountNegative
    }`;

  return (
    <section className={styles.Block}>
      <div className={styles.Header}>
        <h2 className={styles.Title}>Income/Expenses</h2>
        <span className={styles.Subtitle}>Today</span>
      </div>

      <ul className={styles.List}>
        {items.map((item) => (
          <li key={item.id} className={styles.Item}>
            <span className={getBadgeClass(item.type)}>{item.type}</span>
            <span className={styles.Description}>{item.title}</span>
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
