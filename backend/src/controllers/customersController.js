import Customer from "../models/Customer.js";
import Order from "../models/Order.js";

/**
 * GET /api/customers
 * Query:
 *  - name (opsiyonel, User Name filtresi)
 *  - page (opsiyonel, default 1)
 *  - limit (opsiyonel, default 10)
 */
export const getCustomers = async (req, res, next) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;

    const query = {};

    // İsim filtresi (User Name)
    if (name) {
      // case-insensitive arama
      query.name = { $regex: name, $options: "i" };
    }

    const pageNumber = Number(page) || 1;
    const pageLimit = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageLimit;

    // Toplam kayıt sayısı (sayfalama için)
    const total = await Customer.countDocuments(query);

    // Liste
    const customers = await Customer.find(query)
      .sort({ createdAt: -1 }) // en yeni üstte
      .skip(skip)
      .limit(pageLimit)
      .select("name email address phone registerDate country createdAt");

    return res.json({
      data: customers,
      pagination: {
        total,
        page: pageNumber,
        limit: pageLimit,
        totalPages: Math.ceil(total / pageLimit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/customers/:customerId
 * Tek müşteri + sipariş geçmişi
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

    // 2) Müşterinin sipariş geçmişi
    // Order şemanda customer ref yok, customerEmail var.
    // Bu yüzden email üzerinden eşleştiriyoruz.
    const orders = await Order.find({ customerEmail: customer.email })
      .sort({ orderDate: -1 }) // şemanda orderDate var
      .select("products totalPrice status orderDate createdAt");

    // 3) Response
    return res.json({
      customer,
      orders,
    });
  } catch (error) {
    next(error);
  }
};
