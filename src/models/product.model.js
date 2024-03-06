const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    img: {
        type: String
    }, 
    code: {
        type:String, 
        unique: true, 
        required: true
    },
    stock: {
        type: Number, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    status: {
        type: Boolean, 
        required: true
    },
    thumbnails: {
        type: [String]
    }
});

productSchema.statics.findWithPagination = async function({ query = {}, limit = 10, page = 1, sort = null }) {
    try {
        let skip = (page - 1) * limit;
        let sortQuery = sort ? { price: sort === 'asc' ? 1 : -1 } : {};

        const products = await this.find(query)
            .limit(limit)
            .skip(skip)
            .sort(sortQuery);

        const totalProducts = await this.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevPage = hasPrevPage ? page - 1 : null;

        return {
            products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage
        };
    } catch (error) {
        throw error;
    }
};

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;