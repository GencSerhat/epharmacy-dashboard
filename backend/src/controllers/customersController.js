import Customer from "../models/Customer.js";
import Order from "../models/Order.js";

/**
 * GET /api/customers
 * Customers Data sayfası için müşteri listesi
 */
export const getCustomers = async (req, res, next) => {
  try {
    // İleride name ile filtre ekleyebiliriz ama şimdilik tümünü döndürelim
    const customers = await Customer.find()
      .sort({ createdAt: -1 }) // en yeni üstte
      .select("name email address phone country registerDate createdAt");

    return res.json(customers);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/customers/:customerId
 * Tek müşteri detayı + sipariş/geçmiş bilgisi (Dashboard modal için)
 */
export const getCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    // 1) Müşteriyi bul
    const customer = await Customer.findById(customerId).select(
      "name email address phone country registerDate createdAt"
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // 2) Müşterinin sipariş / işlem geçmişi
    // Order şemasında customer: ObjectId(field) olduğunu varsayıyoruz
    const orders = await Order.find({ customer: customerId })
      .sort({ createdAt: -1 })
      .select("products price status createdAt");

    // 3) Response
    return res.json({
      customer,
      orders,
    });
  } catch (error) {
    next(error);
  }
};
