// src/pages/OrdersPage/OrdersPage.jsx
import { useEffect, useState } from "react";
import styles from "./OrdersPage.module.css";
import { fetchOrders } from "../../services/ordersService.js";

function OrdersPage() {
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // API'den veri çek
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchOrders({
          name: searchName || undefined,
          page: 1,
          limit: 20,
        });

        console.log("Orders API response:", data);

    // Gelen cevaptan güvenli şekilde dizi çıkar
let apiOrders = [];

if (Array.isArray(data)) {
  apiOrders = data;
} else if (Array.isArray(data?.data)) {
  // ✅ backend: { data: [...], pagination: {...} }
  apiOrders = data.data;
} else if (Array.isArray(data?.orders)) {
  apiOrders = data.orders;
} else if (Array.isArray(data?.items)) {
  apiOrders = data.items;
} else if (Array.isArray(data?.results)) {
  apiOrders = data.results;
} else {
  apiOrders = [];
}

        setOrders(apiOrders);
      } catch (err) {
        console.error("Orders load error:", err);
        const message =
          err?.response?.data?.message ||
          "Orders verileri yüklenirken bir hata oluştu.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [searchName]);

  // Filter butonuna basınca backend'e name ile istek gitsin
  const handleFilterClick = () => {
    setSearchName(filter.trim());
  };

  // UI'da gösterirken field isimlerini esnek kullan
  const getUserName = (order) =>
    order.userName ||
    order.customerName ||
    order.user?.name ||
    order.customer?.name ||
    "—";

  const getAddress = (order) =>
    order.address ||
    order.shippingAddress ||
    order.customerAddress ||
    "—";

  const getProductsCount = (order) =>
    order.productsCount ||
    order.products?.length ||
    order.quantity ||
    order.itemsCount ||
    0;

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPrice = (order) =>
    order.price || order.totalPrice || order.amount || 0;

  const getStatus = (order) => order.status || "—";

  const getStatusClass = (status) => {
    if (status === "Completed")
      return `${styles.Status} ${styles.StatusCompleted}`;
    if (status === "Confirmed")
      return `${styles.Status} ${styles.StatusConfirmed}`;
    if (status === "Pending")
      return `${styles.Status} ${styles.StatusPending}`;
    if (status === "Cancelled")
      return `${styles.Status} ${styles.StatusCancelled}`;
    if (status === "Processing")
      return `${styles.Status} ${styles.StatusProcessing}`;
    return styles.Status;
  };

  // map öncesi güvenlik: her durumda dizi olsun
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className={styles.OrdersPage}>
      {/* Filter alanı */}
      <div className={styles.FilterBar}>
        <input
          type="text"
          placeholder="User Name"
          className={styles.FilterInput}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className={styles.FilterButton} onClick={handleFilterClick}>
          Filter
        </button>
      </div>

      {/* Hata / Loading mesajları */}
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "#eb5050", fontSize: 13 }}>{error}</p>}

      {/* Tablo */}
      {!loading && !error && (
        <section className={styles.TableBlock}>
          <h2 className={styles.Title}>All orders</h2>

          <div className={styles.Table}>
            <div className={`${styles.Row} ${styles.HeaderRow}`}>
              <div className={styles.Cell}>User Info</div>
              <div className={styles.Cell}>Address</div>
              <div className={styles.CellCenter}>Products</div>
              <div className={styles.Cell}>Order date</div>
              <div className={styles.CellRight}>Price</div>
              <div className={styles.CellCenter}>Status</div>
            </div>

            {safeOrders.map((order) => (
              <div key={order.id || order._id} className={styles.Row}>
                <div className={styles.Cell}>{getUserName(order)}</div>
                <div className={styles.Cell}>{getAddress(order)}</div>
                <div className={styles.CellCenter}>
                  {getProductsCount(order)}
                </div>
                <div className={styles.Cell}>
                  {formatDate(order.orderDate || order.createdAt)}
                </div>
                <div className={styles.CellRight}>
                  {getPrice(order).toFixed
                    ? getPrice(order).toFixed(2)
                    : Number(getPrice(order)).toFixed(2)}
                </div>
                <div className={styles.CellCenter}>
                  <span className={getStatusClass(getStatus(order))}>
                    {getStatus(order)}
                  </span>
                </div>
              </div>
            ))}

            {safeOrders.length === 0 && (
              <div className={styles.EmptyRow}>No orders found.</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default OrdersPage;
