import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./EditSupplierModal.module.css";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const schema = yup.object({
  name: yup.string().required("Suppliers Info is required"),
  address: yup.string().required("Address is required"),
  company: yup.string().required("Company is required"),
  deliveryDate: yup.string().required("Delivery date is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .min(0, "Amount cannot be negative")
    .required("Amount is required"),
  status: yup
    .string()
    .oneOf(
      STATUS_OPTIONS.map((s) => s.value),
      "Invalid status"
    )
    .required("Status is required"),
});

function EditSupplierModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  supplier,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      company: "",
      deliveryDate: "",
      amount: "",
      status: STATUS_OPTIONS[0].value,
    },
  });


  const toInputDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  };

  // Modal açıldığında / supplier değiştiğinde formu doldur
  useEffect(() => {
    if (isOpen && supplier) {
      reset({
        name: supplier.name || "",
        address: supplier.address || "",
        company: supplier.company || "",
        deliveryDate: toInputDate(supplier.deliveryDate),
        amount:
          supplier.amount !== undefined && supplier.amount !== null
            ? String(supplier.amount)
            : "",
        status:
          STATUS_OPTIONS.find((s) => s.value === supplier.status)?.value ||
          STATUS_OPTIONS[0].value,
      });
    }
  }, [isOpen, supplier, reset]);

  if (!isOpen || !supplier) return null;

  const handleFormSubmit = (values) => {
    const payload = {
      name: values.name.trim(),
      address: values.address.trim(),
      company: values.company.trim(),
      deliveryDate: values.deliveryDate, // parent Date'e çevirebilir
      amount: Number(values.amount),
      status: values.status,
    };

    onSubmit && onSubmit(payload);
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
          <h3 className={styles.Title}>Edit supplier</h3>
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
              <label className={styles.Label}>Suppliers Info</label>
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
              <label className={styles.Label}>Address</label>
              <input
                type="text"
                className={styles.Input}
                {...register("address")}
              />
              {errors.address && (
                <p className={styles.Error}>{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className={styles.Row}>
            <div className={styles.Field}>
              <label className={styles.Label}>Company</label>
              <input
                type="text"
                className={styles.Input}
                {...register("company")}
              />
              {errors.company && (
                <p className={styles.Error}>{errors.company.message}</p>
              )}
            </div>

            <div className={styles.Field}>
              <label className={styles.Label}>Delivery date</label>
              <input
                type="date"
                className={styles.Input}
                {...register("deliveryDate")}
              />
              {errors.deliveryDate && (
                <p className={styles.Error}>
                  {errors.deliveryDate.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.Row}>
            <div className={styles.Field}>
              <label className={styles.Label}>Amount</label>
              <input
                type="number"
                step="0.01"
                className={styles.Input}
                {...register("amount")}
              />
              {errors.amount && (
                <p className={styles.Error}>{errors.amount.message}</p>
              )}
            </div>

            <div className={styles.Field}>
              <label className={styles.Label}>Status</label>
              <div className={styles.SelectWrapper}>
                <select
                  className={styles.Select}
                  {...register("status")}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.status && (
                <p className={styles.Error}>{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className={styles.Actions}>
            <button
              type="submit"
              className={styles.SaveBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
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

export default EditSupplierModal;
