import Order from "../models/Order.js";
import { isValidObjectId } from "mongoose";

/**
 * GET /api/orders
 * Query:
 *  - name (opsiyonel, User Name filtresi için)
 *  - page (opsiyonel, default 1)
 *  - limit (opsiyonel, default 10)
 */
export const getOrders = async (req, res, next) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;

    const query = {};

    // User Name Filter → müşteri adı ile filtre
    if (name) {
      query.customerName = { $regex: name, $options: "i" };
    }

    const pageNumber = Number(page) || 1;
    const pageLimit = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageLimit;

    // Toplam kayıt sayısı
    const total = await Order.countDocuments(query);

    // Liste
    const orders = await Order.find(query)
      .sort({ orderDate: -1 }) // en yeni sipariş en üstte
      .skip(skip)
      .limit(pageLimit)
      .select(
        "customerName customerEmail address products orderDate totalPrice status createdAt"
      );

    return res.json({
      data: orders,
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

export const createOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      customerEmail,
      address,
      products,
      totalPrice,
      status,
      orderDate,
    } = req.body;

    // Basit zorunlu alan kontrolleri
    if (!customerName || !customerEmail || !address || !products || !products.length) {
      return res.status(400).json({
        message:
          "customerName, customerEmail, address ve en az 1 ürün (products) zorunludur.",
      });
    }

    const newOrder = await Order.create({
      customerName,
      customerEmail,
      address,
      products,
      totalPrice: totalPrice ?? 0,
      status: status ?? "pending",
      orderDate: orderDate ?? new Date(),
    });

    return res.status(201).json({
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Geçersiz ObjectId kontrolü
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Geçersiz sipariş ID formatı.",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Sipariş bulunamadı.",
      });
    }

    return res.json({
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Geçersiz ID formatı
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Geçersiz sipariş ID formatı.",
      });
    }

    // Status alanı boş mu?
    if (!status) {
      return res.status(400).json({
        message: "status alanı zorunludur.",
      });
    }

    // Güncelleme işlemi
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Sipariş bulunamadı.",
      });
    }

    return res.json({
      message: "Sipariş durumu güncellendi.",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Geçersiz sipariş ID formatı.",
      });
    }

    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Silinecek sipariş bulunamadı.",
      });
    }

    return res.json({
      message: "Sipariş başarıyla silindi.",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
