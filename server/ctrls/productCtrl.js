const Products = require('../model/productModel.js');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

// API features class for filtering, sorting, and pagination
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        this.query.find(JSON.parse(queryStr));
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt'); 
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
const successResponse = (res, message, data) => {
    return res.status(200).json({ success: true, message, data });
};

const errorResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message });
};
const productCtrl = {
    getproducts: asyncHandler(async (req, res) => {
        const features = new APIfeatures(Products.find(), req.query)
            .filtering()
            .sorting()
            .pagination();
        const products = await features.query;
        successResponse(res, 'Products retrieved successfully', products);
    }),
    getProductById: asyncHandler(async (req, res) => {
        const product = await Products.findById(req.params.id);
        if (!product) return errorResponse(res, 'Product not found', 404);
        successResponse(res, 'Product retrieved successfully', product);
    }),    

    createproducts: [

        asyncHandler(async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return errorResponse(res, errors.array().map(err => err.msg).join(', '), 400);
            }

            const { product_id, title, price, description, content, images, category } = req.body;

            const product = await Products.findOne({ product_id });
            if (product) return errorResponse(res, "Product already exists", 400);

            const newproduct = new Products({
                product_id,
                title,
                price,
                description,
                content,
                images,
                category
            });
            await newproduct.save();
            successResponse(res, "Product created successfully", newproduct);
        })
    ],

    deleteproducts: asyncHandler(async (req, res) => {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) return errorResponse(res, "Product not found", 404);
        successResponse(res, "Product deleted successfully");
    }),

    updateproducts: asyncHandler(async (req, res) => {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return errorResponse(res, "Product not found", 404);
        successResponse(res, "Product updated successfully", product);
    })
};

module.exports = productCtrl;
