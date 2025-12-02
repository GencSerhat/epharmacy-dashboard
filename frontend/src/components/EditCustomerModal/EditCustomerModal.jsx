import { useEffect, useState } from "react";
import styles from "./EditCustomerModal.module.css";
import { updateCustomer } from "../../services/customersService";

const EditCustomerModal = ({
  isOpen,
  onClose,
  customer,
  onCustomerUpdated,
}) => {
  if (!isOpen || !customer) return null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Modal her açıldığında seçili müşteriyi forma doldur
  useEffect(() => {
    if (customer) {
      setFormData({
        name:
          customer.name ||
          customer.userName ||
          customer.fullName ||
          customer.user?.name ||
          "",
        email: customer.email || customer.user?.email || "",
        phone:
          customer.phone ||
          customer.phoneNumber ||
          customer.user?.phone ||
          "",
        address: customer.address || customer.user?.address || "",
      });
    }
  }, [customer]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const customerId = customer._id || customer.id;
      const updatedCustomer = await updateCustomer(customerId, formData);

      if (onCustomerUpdated) {
        onCustomerUpdated(updatedCustomer);
      }

      onClose();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Müşteri güncellenirken bir hata oluştu. Lütfen tekrar deneyin.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.ModalOverlay}>
      <div className={styles.ModalContent}>
        <div className={styles.ModalHeader}>
          <h2>Müşteri Düzenle</h2>
          <button
            type="button"
            className={styles.CloseButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.ModalForm}>
          <div className={styles.FormRow}>
            <label className={styles.Label} htmlFor="name">
              İsim Soyisim
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={styles.Input}
              value={formData.name}
              onChange={handleChange}
              placeholder="Müşteri adı"
              required
            />
          </div>

          <div className={styles.FormRow}>
            <label className={styles.Label} htmlFor="email">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.Input}
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@mail.com"
            />
          </div>

          <div className={styles.FormRow}>
            <label className={styles.Label} htmlFor="phone">
              Telefon
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className={styles.Input}
              value={formData.phone}
              onChange={handleChange}
              placeholder="05xx xxx xx xx"
            />
          </div>

          <div className={styles.FormRow}>
            <label className={styles.Label} htmlFor="address">
              Adres
            </label>
            <textarea
              id="address"
              name="address"
              className={`${styles.Input} ${styles.Textarea}`}
              value={formData.address}
              onChange={handleChange}
              placeholder="Adres bilgisi"
              rows={3}
            />
          </div>

          {errorMessage && (
            <p className={styles.ErrorMessage}>{errorMessage}</p>
          )}

          <div className={styles.ModalActions}>
            <button
              type="button"
              className={styles.CancelButton}
              onClick={onClose}
              disabled={isSubmitting}
            >
              İptal
            </button>
            <button
              type="submit"
              className={styles.SaveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Güncelleniyor..." : "Güncelle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;
