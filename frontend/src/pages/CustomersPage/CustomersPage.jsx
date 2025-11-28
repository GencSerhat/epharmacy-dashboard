// src/pages/CustomersPage/CustomersPage.jsx
import { useEffect, useState } from "react";
import styles from "./CustomersPage.module.css";
import {
  fetchCustomers,
  deleteCustomer,
} from "../../services/customersService.js";
import AddCustomerModal from "../../components/AddCustomerModal/AddCustomerModal.jsx";

function CustomersPage() {
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Add/Edit Modal kontrolü
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Düzenlenecek müşteri
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Add modal aç
  const openAddModal = () => {
    setSelectedCustomer(null);
    setIsAddModalOpen(true);
  };

  // Edit modal aç (şimdilik sadece tanımlı, EditModal ekleyince kullanılacak)
  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  // Yeni müşteri eklendiğinde listeyi güncelle
  const handleCustomerAdded = (newCustomer) => {
    // Optimistik olarak liste başına ekliyoruz
    setCustomers((prev) => [newCustomer, ...prev]);

    // İstersen backend'den tekrar çekmek için bunu da kullanabilirsin:
    // loadCustomers(pagination.page, searchName);
  };

  const loadCustomers = async (pageToLoad = 1, nameParam = "") => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchCustomers({
        name: (nameParam ?? searchName) || undefined,
        page: pageToLoad,
        limit: 10,
      });

      console.log("Customers API response:", data);

      const apiCustomers = data?.data || data?.items || data?.results || [];
      const apiPagination = data?.pagination || {
        total: apiCustomers.length,
        page: pageToLoad,
        limit: 10,
        totalPages: 1,
      };

      setCustomers(apiCustomers);
      setPagination(apiPagination);
    } catch (err) {
      console.error("Customers load error:", err);
      const message =
        err?.response?.data?.message ||
        "Customers verileri yüklenirken bir hata oluştu.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // İlk yükleme + filtre değişince tetiklenir
  useEffect(() => {
    loadCustomers(1, searchName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  // Filter butonuna tıklayınca
  const handleFilterClick = () => {
    setSearchName(filter.trim());
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      const newPage = pagination.page - 1;
      setPagination((prev) => ({ ...prev, page: newPage }));
      loadCustomers(newPage);
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      const newPage = pagination.page + 1;
      setPagination((prev) => ({ ...prev, page: newPage }));
      loadCustomers(newPage);
    }
  };

  // ❌ Müşteri silme
  const handleDeleteCustomer = async (id) => {
    const customerId = id;
    if (!customerId) return;

    const confirmDelete = window.confirm(
      "Bu müşteriyi silmek istediğinizden emin misiniz?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(customerId);
      setError("");

      await deleteCustomer(customerId);

      // State'den silinen müşteriyi çıkar
      setCustomers((prev) =>
        prev.filter((c) => (c._id || c.id) !== customerId)
      );
    } catch (err) {
      console.error("Delete customer error:", err);
      const message =
        err?.response?.data?.message || "Müşteri silinirken bir hata oluştu.";
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

  const getUserName = (customer) =>
    customer.name ||
    customer.userName ||
    customer.fullName ||
    customer.user?.name ||
    "—";

  const getEmail = (customer) => customer.email || customer.user?.email || "—";

  const getAddress = (customer) =>
    customer.address || customer.user?.address || "—";

  const getPhone = (customer) =>
    customer.phone || customer.phoneNumber || customer.user?.phone || "—";

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={styles.CustomersPage}>
      {/* Filter + Pagination bar */}
      <div className={styles.TopBar}>
        <div className={styles.FilterGroup}>
          <input
            type="text"
            placeholder="User Name"
            className={styles.FilterInput}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className={styles.FilterButton}
            type="button"
            onClick={handleFilterClick}
          >
            Filter
          </button>

          {/* Yeni müşteri ekleme butonu */}
          <button
            className={styles.FilterButton}
            type="button"
            onClick={openAddModal}
          >
            + Add Customer
          </button>
        </div>

        <div className={styles.Pagination}>
          <button
            type="button"
            className={styles.PageBtn}
            onClick={handlePrevPage}
            disabled={pagination.page <= 1}
          >
            Prev
          </button>
          <span className={styles.PageNumber}>{pagination.page}</span>
          <button
            type="button"
            className={styles.PageBtn}
            onClick={handleNextPage}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {loading && <p>Loading customers...</p>}
      {error && <p className={styles.ErrorText}>{error}</p>}

      {!loading && !error && (
        <section className={styles.TableBlock}>
          <h2 className={styles.Title}>Customers Data</h2>

          <div className={styles.Table}>
            <div className={`${styles.Row} ${styles.HeaderRow}`}>
              <div className={styles.Cell}>User Info</div>
              <div className={styles.Cell}>Email</div>
              <div className={styles.Cell}>Address</div>
              <div className={styles.Cell}>Phone</div>
              <div className={styles.Cell}>Register date</div>
              <div className={styles.Cell}>Action</div>
            </div>

            {customers.map((customer) => {
              const id = customer._id || customer.id;
              return (
                <div key={id} className={styles.Row}>
                  <div className={styles.Cell}>{getUserName(customer)}</div>
                  <div className={styles.Cell}>{getEmail(customer)}</div>
                  <div className={styles.Cell}>{getAddress(customer)}</div>
                  <div className={styles.Cell}>{getPhone(customer)}</div>
                  <div className={styles.Cell}>
                    {formatDate(customer.registerDate || customer.createdAt)}
                  </div>
                  <div className={`${styles.Cell} ${styles.ActionCell}`}>
                    {/* Edit butonu (Edit modalı yazınca buraya bağlayacağız) */}
                    {/* 
                    <button
                      type="button"
                      className={styles.EditBtn}
                      onClick={() => openEditModal(customer)}
                    >
                      Edit
                    </button>
                    */}
                    <button
                      type="button"
                      className={styles.DeleteBtn}
                      onClick={() => handleDeleteCustomer(id)}
                      disabled={deletingId === id}
                    >
                      {deletingId === id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}

            {customers.length === 0 && (
              <div className={styles.EmptyRow}>No customers found.</div>
            )}
          </div>
        </section>
      )}

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCustomerAdded={handleCustomerAdded}
      />
    </div>
  );
}

export default CustomersPage;
