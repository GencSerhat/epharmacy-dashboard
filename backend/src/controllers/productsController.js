import Product from "../models/Product.js";
import { isValidObjectId } from "mongoose";

/**
 * GET /api/products
 *
 * Query parametreleri:
 *  - search (opsiyonel, name üzerinde arama)
 *  - category (opsiyonel, kategori filtresi)
 *  - minPrice, maxPrice (opsiyonel, fiyat aralığı)
 *  - sortBy (opsiyonel, default: "createdAt")
 *  - order (opsiyonel, "asc" | "desc", default: "desc")
 *  - page (opsiyonel, default: 1)
 *  - limit (opsiyonel, default: 10)
 */

export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {};
    //arama: ürün adı (name alanında)

    if (search) {
      filters.name = { $regex: search, $options: "i" };
    }
    //Kategori filtresi
    if (category) {
      filters.category = category;
    }
    //Fiyat aralığı
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) {
        filters.price.$gte = Number(minPrice);
      }
    }

    //Sayfalama
    const pageNumber = Number(page) || 1;
    const pageLimit = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageLimit;

    //Sıralama
    const sortOptions = {};
    const sortField = sortBy || "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;
    sortOptions[sortField] = sortOrder;

    //Toplam kayıt sayısı
    const total = await Product.countDocuments(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageLimit);

    return res.json({
      data: getProducts,
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

export const createProduct = async (req, res, next) => {
  try {
    const { name, category, price, stock, supplier, description, image } =
      req.body;

    //Zorunlu alan kontrolü - projeye göre istersen genişletiebiliriz
    if (!name || !category || price == null) {
      return res.status(400).json({
        message: "name, category ve price alanları zorunludur.",
      });
    }

    const newProduct = await Product.create({
      name,
      category,
      price,
      stock: stock ?? 0,
      supplier,
      description,
      image,
    });

    return res.status(201).json({
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Geçersiz ürün ID formatı.",
      });
    }

    const {
      name,
      category,
      price,
      stock,
      suppliers,
      description,
      image,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        category,
        price,
        stock,
        suppliers,
        description,
        image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Güncellenecek ürün bulunamadı.",
      });
    }

    return res.json({
      message: "Ürün başarıyla güncellendi.",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Geçersiz ürün ID formatı.",
      });
    }

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({
        message: "Silinecek ürün bulunamadı.",
      });
    }

    return res.json({
      message: "Ürün başarıyla silindi.",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
