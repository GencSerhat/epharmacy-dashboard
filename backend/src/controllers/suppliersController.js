import Supplier from "../models/Supplier.js";
import { isValidObjectId } from "mongoose";

/**
 * GET /api/suppliers
 *
 * Query parametreleri:
 *  - search (opsiyonel, name üzerinde arama)
 *  - status (opsiyonel, durum filtresi)
 *  - minAmount, maxAmount (opsiyonel, miktar aralığı)
 *  - sortBy (opsiyonel, default: "deliveryDate")
 *  - order ("asc" | "desc", default: "asc")
 *  - page (opsiyonel, default: 1)
 *  - limit (opsiyonel, default: 10)
 */
export const getSuppliers = async (req, res, next) => {
  try {
    const {
      search,
      status,
      minAmount,
      maxAmount,
      sortBy = "deliveryDate",
      order = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {};

    // Arama → tedarikçi adı (name alanı)
    if (search) {
      filters.name = { $regex: search, $options: "i" };
    }

    // Durum filtresi
    if (status) {
      filters.status = status;
    }

    // Miktar aralığı (amount)
    if (minAmount || maxAmount) {
      filters.amount = {};
      if (minAmount) {
        filters.amount.$gte = Number(minAmount);
      }
      if (maxAmount) {
        filters.amount.$lte = Number(maxAmount);
      }
    }

    // Sayfalama
    const pageNumber = Number(page) || 1;
    const pageLimit = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageLimit;

    // Sıralama
    const sortOptions = {};
    const sortField = sortBy || "deliveryDate";
    const sortOrder = order === "desc" ? -1 : 1;
    sortOptions[sortField] = sortOrder;

    const total = await Supplier.countDocuments(filters);

    const suppliers = await Supplier.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageLimit);

    return res.json({
      data: suppliers,
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
 * POST /api/suppliers
 * Yeni tedarikçi ekleme
 */
export const createSupplier = async (req, res, next) => {
  try {
    const { name, address, company, deliveryDate, amount, status } = req.body;

    // Zorunlu alanlar
    if (!name || !address || !company || !deliveryDate || amount == null) {
      return res.status(400).json({
        message:
          "name, address, company, deliveryDate ve amount alanları zorunludur.",
      });
    }

    const newSupplier = await Supplier.create({
      name,
      address,
      company,
      deliveryDate,
      amount,
      status, // gelmezse model default "pending" verecek
    });

    return res.status(201).json({
      data: newSupplier,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const { supplierId } = req.params;

    if (!isValidObjectId(supplierId)) {
      return res.status(400).json({
        message: "Geçersiz tedarikçi ID fromatı",
      });
    }

    const { name, address, company, deliveryDate, amount, status } = req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      {
        name,
        address,
        company,
        deliveryDate,
        amount,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSupplier) {
      return res.status(404).json({
        message: "Güncellenecek tedarikçi bulunamadı",
      });
    }
    return res.json({
      message: "Tedarikçi başarıyla güncellendi",
      data: updatedSupplier,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    const { supplierId } = req.params;

    if (!isValidObjectId(supplierId)) {
      return res.status(400).json({
        message: "Geçersiz tedarikçi ID formatı.",
      });
    }

    const deleted = await Supplier.findByIdAndDelete(supplierId);

    if (!deleted) {
      return res.status(404).json({
        message: "Silinecek tedarikçi bulunamadı.",
      });
    }

    return res.json({
      message: "Tedarikçi başarıyla silindi.",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
