import { useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productsService.js";

import AddProductModal from "../../components/AddProductModal/AddProductModal.jsx";
import EditProductModal from "../../components/EditProductModal/EditProductModal.jsx";

function ProductsPage() {
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchProducts({
        search: searchName || undefined,
        page: 1,
        limit: 50,
      });

      const arr = Array.isArray(data?.data) ? data.data : [];
      setProducts(arr);
    } catch (err) {
      console.error("Products load error:", err);
      setError(
        err?.response?.data?.message || "Ürünler yüklenirken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [searchName]);

  const handleFilterClick = () => {
    setSearchName(filter.trim());
  };

  const handleAddProduct = async (formData) => {
    try {
      await createProduct(formData);
      await loadProducts(); // listeyi yenile
      setIsAddOpen(false); // modal kapat
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const id = updatedData.id;

      await updateProduct(id, updatedData);
      await loadProducts(); // listeyi yenile

      setIsEditOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Edit product error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  return (
    <div className={styles.ProductsPage}>
      {/* Filter Bar */}
      <div className={styles.FilterBar}>
        <input
          type="text"
          placeholder="Product Name"
          className={styles.FilterInput}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className={styles.FilterButton} onClick={handleFilterClick}>
          Filter
        </button>
        <button className={styles.AddButton} onClick={() => setIsAddOpen(true)}>
          + Add a new product
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "#eb5050", fontSize: 13 }}>{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <section className={styles.TableBlock}>
          <h2 className={styles.Title}>All products</h2>

          <div className={styles.Table}>
            <div className={`${styles.Row} ${styles.HeaderRow}`}>
              <div className={styles.Cell}>Product Info</div>
              <div className={styles.Cell}>Category</div>
              <div className={styles.CellCenter}>Stock</div>
              <div className={styles.Cell}>Suppliers</div>
              <div className={styles.CellRight}>Price</div>
              <div className={styles.CellCenter}>Action</div>
            </div>

            {products.map((p) => (
              <div key={p._id} className={styles.Row}>
                <div className={styles.Cell}>{p.name}</div>
                <div className={styles.Cell}>{p.category}</div>
                <div className={styles.CellCenter}>{p.stock ?? 0}</div>
                <div className={styles.Cell}>{p.supplier || p.suppliers}</div>
                <div className={styles.CellRight}>${p.price}</div>

                <div className={styles.CellCenter}>
                  <button
                    className={styles.EditBtn}
                    onClick={() => openEditModal(p)}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.DeleteBtn}
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className={styles.EmptyRow}>No products found.</div>
            )}
          </div>
        </section>
      )}

      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddProduct}
      />

      <EditProductModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={selectedProduct}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default ProductsPage;
