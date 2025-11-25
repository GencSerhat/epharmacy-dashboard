// src/pages/ProductsPage/ProductsPage.jsx
import { useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";
import {
  fetchProducts,
  createProduct,
} from "../../services/productsService.js";
import AddProductModal from "../../components/AddProductModal/AddProductModal.jsx";

function ProductsPage() {
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API'den ürünleri çek
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProducts({
          name: searchName || undefined,
          page: 1,
          limit: 20,
        });

        console.log("ProductsPage API response:", data);

        let apiProducts = [];

        if (Array.isArray(data)) {
          apiProducts = data;
        } else if (Array.isArray(data?.data)) {
          apiProducts = data.data;
        } else if (Array.isArray(data?.products)) {
          apiProducts = data.products;
        } else if (Array.isArray(data?.items)) {
          apiProducts = data.items;
        } else if (Array.isArray(data?.results)) {
          apiProducts = data.results;
        } else {
          apiProducts = [];
        }

        setProducts(apiProducts);
      } catch (err) {
        console.error("Products load error:", err);
        const message =
          err?.response?.data?.message ||
          "Products verileri yüklenirken bir hata oluştu.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchName]);

  // Filter butonu → backend'e name ile istek gitsin
  const handleFilterClick = () => {
    setSearchName(filter.trim());
  };

  // Add modalını aç
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    if (!isSubmitting) {
      setIsAddModalOpen(false);
    }
  };

  // Yeni ürün ekleme submit
  const handleAddProduct = async (payload) => {
    try {
      setIsSubmitting(true);
      setError("");

      await createProduct(payload);

      // Başarılı olursa tekrar liste çek
      const data = await fetchProducts({
        name: searchName || undefined,
        page: 1,
        limit: 20,
      });

      let apiProducts = [];

      if (Array.isArray(data)) {
        apiProducts = data;
      } else if (Array.isArray(data?.data)) {
        apiProducts = data.data;
      } else if (Array.isArray(data?.products)) {
        apiProducts = data.products;
      } else if (Array.isArray(data?.items)) {
        apiProducts = data.items;
      } else if (Array.isArray(data?.results)) {
        apiProducts = data.results;
      } else {
        apiProducts = [];
      }

      setProducts(apiProducts);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Create product error:", err);
      const message =
        err?.response?.data?.message || "Product eklenirken bir hata oluştu.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className={styles.ProductsPage}>
      {/* Filter bar + Add button */}
      <div className={styles.TopBar}>
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
        </div>

        <button
          className={styles.AddButton}
          type="button"
          onClick={openAddModal}
        >
          + Add a new product
        </button>
      </div>

      {/* Hata / Loading mesajları */}
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "#eb5050", fontSize: 13 }}>{error}</p>}

      {/* Tablo */}
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

            {safeProducts.map((product) => (
              <div key={product.id || product._id} className={styles.Row}>
                <div className={styles.Cell}>
                  {product.name || product.productName || "—"}
                </div>
                <div className={styles.Cell}>
                  {product.category || product.categoryName || "—"}
                </div>
                <div className={styles.CellCenter}>
                  {product.stock ?? product.quantity ?? 0}
                </div>
                <div className={styles.Cell}>
                  {product.suppliers || product.supplierName || "—"}
                </div>
                <div className={styles.CellRight}>
                  {(product.price ?? product.amount ?? 0).toFixed
                    ? (product.price ?? product.amount ?? 0).toFixed(2)
                    : Number(product.price ?? product.amount ?? 0).toFixed(2)}
                </div>
                <div className={styles.CellCenter}>
                  <button
                    className={`${styles.ActionButton} ${styles.EditButton}`}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.ActionButton} ${styles.DeleteButton}`}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {safeProducts.length === 0 && (
              <div className={styles.EmptyRow}>No products found.</div>
            )}
          </div>
        </section>
      )}

      {/* Add product modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSubmit={handleAddProduct}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default ProductsPage;
