import { useState } from "react";
import styles from "./AddCustomerModal.module.css";
import { createCustomer } from "../../services/customersService";

const AddCustomerModal = ({ isOpen, onClose, onCustomerAdded }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      const newCustomer = await createCustomer(formData);

      if (onCustomerAdded) {
        onCustomerAdded(newCustomer);
      }

      // Formu temizle
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      onClose();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Müşteri eklenirken bir hata oluştu. Lütfen tekrar deneyin.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.ModalOverlay}>
      <div className={styles.ModalContent}>
        <div className={styles.ModalHeader}>
          <h2>Yeni Müşteri Ekle</h2>
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
              {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
