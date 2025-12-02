import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js";
import Transaction from "../models/Transaction.js";

export const getDashboard = async (req, res, next) => {
  try {
    // Son 30 gün için başlangıç tarihi
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    //Toplam sayılar

    const [totalProducts, totalSuppliers, totalCustomers] = await Promise.all([
      Product.countDocuments(),
      Supplier.countDocuments(),
      Customer.countDocuments(),
    ]);

    //Son müşteriler (ör: son 5 kayıt)
    const recentCustomers = await Customer.find({
      createdAt: { $gte: thirtyDaysAgo },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email registerDate country");


    // Gelir / gider listesi
    const transactions = await Transaction.find({
      createdAt: { $gte: thirtyDaysAgo },
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("title email amount type createdAt");

    return res.json({
      stats: {
        allProducts: totalProducts,
        allSuppliers: totalSuppliers,
        allCustomers: totalCustomers,
      },
      recentCustomers,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};


