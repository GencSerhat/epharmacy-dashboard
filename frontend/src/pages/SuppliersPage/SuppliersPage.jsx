// src/pages/SuppliersPage/SuppliersPage.jsx
import { useEffect, useState } from "react";
import styles from "./SuppliersPage.module.css";
import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
} from "../../services/suppliersService.js";
import AddSupplierModal from "../../components/AddSupplierModal/AddSupplierModal.jsx";
import EditSupplierModal from "../../components/EditSupplierModal/EditSupplierModal.jsx";

function SuppliersPage() {
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // Hem add hem edit için tek submitting flag (istersen sonra ayırırız)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // -----------------------------------
  // API: Supplier listesini yükle
  // -----------------------------------
  const loadSuppliers = async (nameParam) => {
    try {
      setLoading(true);
      setError("");

    const res = await fetchSuppliers({
  name: (nameParam ?? searchName) || undefined,
  page: 1,
  limit: 20,
});

      const apiSuppliers =
        res?.data || res?.suppliers || res?.items || [];

      setSuppliers(apiSuppliers);
    } catch (err) {
      console.error("Suppliers load error:", err);
      const message =
        err?.response?.data?.message ||
        "Suppliers verileri yüklenirken bir hata oluştu.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  const handleFilterClick = () => {
    setSearchName(filter.trim());
  };

  // -----------------------------------
  // Yeni supplier ekleme
  // -----------------------------------
  const handleAddSupplier = async (values) => {
    try {
      setIsSubmitting(true);

      const payload = {
        name: values.name.trim(),
        address: values.address.trim(),
        company: values.company.trim(),
        deliveryDate: new Date(values.deliveryDate),
        amount: Number(values.amount),
        status: values.status, // "pending" | "delivered" | "cancelled"
      };

      const res = await createSupplier(payload);
      console.log("Create supplier response (page):", res);

      await loadSuppliers();
      setIsAddOpen(false);
    } catch (err) {
      console.error(
        "Create supplier error (page):",
        err?.response?.data || err
      );
      const message =
        err?.response?.data?.message ||
        "Supplier eklenirken bir hata oluştu.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // -----------------------------------
  // Edit modalını aç / kapat
  // -----------------------------------
  const handleEditClick = (supplier) => {
    setEditingSupplier(supplier);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    if (isSubmitting) return;
    setIsEditOpen(false);
    setEditingSupplier(null);
  };

  // -----------------------------------
  // Mevcut supplier güncelleme
  // -----------------------------------
  const handleUpdateSupplier = async (values) => {
    if (!editingSupplier) return;

    try {
      setIsSubmitting(true);

      const payload = {
        name: values.name.trim(),
        address: values.address.trim(),
        company: values.company.trim(),
        deliveryDate: new Date(values.deliveryDate),
        amount: Number(values.amount),
        status: values.status,
      };

      const id = editingSupplier._id || editingSupplier.id;

      const res = await updateSupplier(id, payload);
      console.log("Update supplier response (page):", res);

      await loadSuppliers();
      handleCloseEdit();
    } catch (err) {
      console.error(
        "Update supplier error (page):",
        err?.response?.data || err
      );
      const message =
        err?.response?.data?.message ||
        "Supplier güncellenirken bir hata oluştu.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // -----------------------------------
  // Helper'lar (UI formatlama)
  // -----------------------------------
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

  const formatStatus = (status) => {
    if (status === "pending") return "Pending";
    if (status === "delivered") return "Delivered";
    if (status === "cancelled") return "Cancelled";
    return status || "—";
  };

  const getStatusClass = (status) => {
    if (status === "delivered")
      return `${styles.Status} ${styles.StatusActive}`;
    if (status === "cancelled")
      return `${styles.Status} ${styles.StatusDeactive}`;
    if (status === "pending")
      return `${styles.Status} ${styles.StatusPending}`;
    return styles.Status;
  };

  return (
    <div className={styles.SuppliersPage}>
      {/* Filter alanı */}
      <div className={styles.FilterBar}>
        <input
          type="text"
          placeholder="User Name"
          className={styles.FilterInput}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          className={styles.FilterButton}
          onClick={handleFilterClick}
        >
          Filter
        </button>
        <button
          className={styles.AddButton}
          onClick={() => setIsAddOpen(true)}
        >
          + Add a new supplier
        </button>
      </div>

      {loading && <p>Loading suppliers...</p>}
      {error && <p style={{ color: "#eb5050", fontSize: 13 }}>{error}</p>}

      {!loading && !error && (
        <section className={styles.TableBlock}>
          <h2 className={styles.Title}>All suppliers</h2>

          <div className={styles.Table}>
            <div className={`${styles.Row} ${styles.HeaderRow}`}>
              <div className={styles.Cell}>Suppliers Info</div>
              <div className={styles.Cell}>Address</div>
              <div className={styles.Cell}>Company</div>
              <div className={styles.CellCenter}>Delivery date</div>
              <div className={styles.CellRight}>Amount</div>
              <div className={styles.CellCenter}>Status</div>
              <div className={styles.CellCenter}>Action</div>
            </div>

            {suppliers.map((supplier) => (
              <div
                key={supplier._id || supplier.id}
                className={styles.Row}
              >
                <div className={styles.Cell}>{supplier.name}</div>
                <div className={styles.Cell}>{supplier.address}</div>
                <div className={styles.Cell}>{supplier.company}</div>
                <div className={styles.CellCenter}>
                  {formatDate(supplier.deliveryDate)}
                </div>
                <div className={styles.CellRight}>
                  {Number(supplier.amount).toFixed(2)}
                </div>
                <div className={styles.CellCenter}>
                  <span
                    className={getStatusClass(supplier.status)}
                  >
                    {formatStatus(supplier.status)}
                  </span>
                </div>
                <div className={styles.CellCenter}>
                  <button
                    type="button"
                    className={styles.ActionButton}
                    onClick={() => handleEditClick(supplier)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}

            {suppliers.length === 0 && (
              <div className={styles.EmptyRow}>
                No suppliers found.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Add Supplier Modal */}
      <AddSupplierModal
        isOpen={isAddOpen}
        onClose={() => !isSubmitting && setIsAddOpen(false)}
        onSubmit={handleAddSupplier}
        isSubmitting={isSubmitting}
      />

      {/* Edit Supplier Modal */}
      <EditSupplierModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        onSubmit={handleUpdateSupplier}
        isSubmitting={isSubmitting}
        supplier={editingSupplier}
      />
    </div>
  );
}

export default SuppliersPage;
