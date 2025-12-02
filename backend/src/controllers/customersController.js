import Customer from "../models/Customer.js";
import Order from "../models/Order.js";


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

export const getCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    //Müşteriyi bul
    const customer = await Customer.findById(customerId).select(
      "name email address phone country registerDate createdAt"
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

  
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

export const createCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
    });

    return res.status(201).json({ data: customer });
  } catch (error) {
    next(error);
  }
};

export const updateCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      req.body,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.json({ data: updatedCustomer });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // 204 – içerik yok
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};