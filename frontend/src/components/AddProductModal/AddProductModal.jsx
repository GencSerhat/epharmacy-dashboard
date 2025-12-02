import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AddProductModal.module.css";


const CATEGORIES = [
  "Medicine",
  "Head",
  "Hand",
  "Dental Care",
  "Skin Care",
  "Eye Care",
  "Vitamins & Supplements",
  "Orthopedic Products",
  "Baby Care",
];

const schema = yup.object({
  name: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  suppliers: yup.string().required("Suppliers is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
});

function AddProductModal({ isOpen, onClose, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      stock: "",
      suppliers: "",
      price: "",
    },
  });

  // Modal her açıldığında formu resetle
  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        category: "",
        stock: "",
        suppliers: "",
        price: "",
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (values) => {
    // sayı alanlarını number'a çevir
    const payload = {
      name: values.name.trim(),
      category: values.category,
      stock: Number(values.stock),
      suppliers: values.suppliers.trim(),
      price: Number(values.price),
    };
    onSubmit(payload);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div className={styles.Backdrop} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <div className={styles.Header}>
          <h3 className={styles.Title}>Add a new product</h3>
          <button
            type="button"
            className={styles.CloseBtn}
            onClick={onClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form
          className={styles.Form}
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <div className={styles.Row}>
            <div className={styles.Field}>
              <label className={styles.Label}>Product info</label>
              <input
                type="text"
                className={styles.Input}
                {...register("name")}
              />
              {errors.name && (
                <p className={styles.Error}>{errors.name.message}</p>
              )}
            </div>

            <div className={styles.Field}>
              <label className={styles.Label}>Category</label>
              <div className={styles.SelectWrapper}>
                <select className={styles.Select} {...register("category")}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className={styles.Error}>{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className={styles.Row}>
            <div className={styles.Field}>
              <label className={styles.Label}>Stock</label>
              <input
                type="number"
                className={styles.Input}
                {...register("stock")}
              />
              {errors.stock && (
                <p className={styles.Error}>{errors.stock.message}</p>
              )}
            </div>

            <div className={styles.Field}>
              <label className={styles.Label}>Suppliers</label>
              <input
                type="text"
                className={styles.Input}
                {...register("suppliers")}
              />
              {errors.suppliers && (
                <p className={styles.Error}>{errors.suppliers.message}</p>
              )}
            </div>
          </div>

          <div className={styles.Row}>
            <div className={styles.Field}>
              <label className={styles.Label}>Price</label>
              <input
                type="number"
                step="0.01"
                className={styles.Input}
                {...register("price")}
              />
              {errors.price && (
                <p className={styles.Error}>{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className={styles.Actions}>
            <button
              type="submit"
              className={styles.AddBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add"}
            </button>
            <button
              type="button"
              className={styles.CancelBtn}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
