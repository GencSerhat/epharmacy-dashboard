import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./EditProductModal.module.css";

function EditProductModal({ isOpen, product, onClose, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      stock: 0,
      supplier: "",
      price: 0,
    },
  });

  // Modal açıldığında seçili ürün bilgilerini forma doldur
  useEffect(() => {
    if (isOpen && product) {
      reset({
        name: product.name || "",
        category: product.category || "",
        stock: product.stock ?? 0,
        supplier: product.supplier || product.suppliers || "",
        price: product.price ?? 0,
      });
    }
  }, [isOpen, product, reset]);

  if (!isOpen) {
    return null;
  }

  const onSubmit = (formData) => {
    
    const payload = {
      ...formData,
      id: product._id || product.id,
    };
    onSave(payload);
  };

  const handleBackdropClick = (e) => {
    
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.Backdrop} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <button className={styles.CloseBtn} type="button" onClick={onClose}>
          ×
        </button>

        <h2 className={styles.Title}>Edit product</h2>

        <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.Label}>
            Product Info
            <input
              className={styles.Input}
              type="text"
              {...register("name", { required: "Product name is required" })}
            />
            {errors.name && (
              <span className={styles.Error}>{errors.name.message}</span>
            )}
          </label>

          <label className={styles.Label}>
            Category
            <input
              className={styles.Input}
              type="text"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && (
              <span className={styles.Error}>{errors.category.message}</span>
            )}
          </label>

          <label className={styles.Label}>
            Stock
            <input
              className={styles.Input}
              type="number"
              {...register("stock", {
                valueAsNumber: true,
                min: { value: 0, message: "Stock cannot be negative" },
              })}
            />
            {errors.stock && (
              <span className={styles.Error}>{errors.stock.message}</span>
            )}
          </label>

          <label className={styles.Label}>
            Suppliers
            <input
              className={styles.Input}
              type="text"
              {...register("supplier")}
            />
          </label>

          <label className={styles.Label}>
            Price
            <input
              className={styles.Input}
              type="number"
              step="0.01"
              {...register("price", {
                valueAsNumber: true,
                min: { value: 0, message: "Price cannot be negative" },
              })}
            />
            {errors.price && (
              <span className={styles.Error}>{errors.price.message}</span>
            )}
          </label>

          <div className={styles.Actions}>
            <button
              type="button"
              className={styles.CancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.SaveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
