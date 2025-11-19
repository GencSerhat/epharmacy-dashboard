import Supplier from "../models/Supplier.js";

/**
 * GET /api/suppliers
 * Tüm tedarikçilerin listesini döndürür.
 * (Sonraki adımlarda filtreleme, sıralama, sayfalama eklenecek.)
 */

export const getSuppliers = async (req,res,next) => {
    try {
        const suppliers = await Supplier.find();

        return res.json({
            data:suppliers,
        });
    } catch (error) {
        next(error);
    }
}