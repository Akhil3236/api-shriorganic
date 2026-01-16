import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";
import cloudinary from "../utils/cloudinary.js";

// to add all the prodcuts
export const addproduct = async (req, res) => {
    try {
        let images = [];

        if (req.files && req.files.length > 0) {
            images = req.files.map((file) => file.path);
        }

        const imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                image: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
            mesaage: "Product added sucessfull !!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// to get the product deatils by id
export const getproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("reviews.user", "FirstName LastName");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const similarProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        }).limit(4);

        res.status(200).json({
            success: true,
            product: product,
            remondedProducts: similarProducts,
            message: "Product fetched successfully !!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// to get all the products 
export const getallproducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            message: "Products fetched successfully !!",
            totalProducts: products.length,
            products,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// to edit the product
export const updateproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            success: true,
            product,
            message: "Product updated successfully !!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// to delete product 
export const deleteproduct = async (req, res) => {

    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            product,
            message: "Product deleted successfully !!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// To search products by names , cartgories
export const searchproduct = async (req, res) => {

    try {

        const { name, category } = req.query;
        const products = await Product.find({
            name: { $regex: name, $options: "i" },
            category: { $regex: category, $options: "i" },
        })

        res.status(200).json({
            success: true,
            products,
            message: "Products fetched successfully !!"
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}



// to make the product active or inactive 
export const changeProductStatus = async (req, res) => {

    const {id}=req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        product.isActive = !product.isActive;
        await product.save();
        res.status(200).json({
            success: true,
            status:product.isActive,
            message: "Product status changed successfully !!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// to bulk delete the products 
export const bulkDeleteProduct = async (req, res) => {
    try {
        const { ids } = req.body;
        const products = await Product.updateMany({ _id: { $in: ids } }, { is_deleted: true });
        res.status(200).json({
            success: true,
            products,
            message: "Products deleted successfully !!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// soft delete the product 
export const softDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { is_deleted: true });
        res.status(200).json({
            success: true,
            product,
            message: "Product soft deleted successfully !!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// to permanently delete the soft deleted products 
export const deleteHardDeletedProducts = async (req, res) => {
    try {
        const products = await Product.deleteMany({ is_deleted: true });
        res.status(200).json({
            success: true,
            products,
            message: "Permanently deleted products successfully !!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// to get the best selling products 
export const getBestSellingProducts = async (req, res) => {
    try {
        const products = await Order.aggregate([
            {
                $unwind: "$cartItems"
            },
            {
                $group: {
                    _id: "$cartItems.product",
                    totalSold: { $sum: "$cartItems.quantity" }
                }
            },
            {
                $sort: { totalSold: -1 }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $project: {
                    _id: "$product._id",
                    name: "$product.name",
                    description: "$product.description",
                    price: "$product.price",
                    images: "$product.images",
                    category: "$product.category",
                    stock: "$product.stock",
                    ratings: "$product.ratings",
                    numOfReviews: "$product.numOfReviews",
                    totalSold: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            products,
            message: "Best selling products fetched successfully !!"
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}




// get product for website where is active is false
export const getActiveProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.status(200).json({
            success: true,
            products,
            message: "Active products fetched successfully !!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
} 

// if the user added the product is certifred then there must be image to it 
export const addCertifiedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        product.is_certified = true;
        await product.save();
        res.status(200).json({
            success: true,
            status:product.is_certified,
            message: "Product status changed successfully !!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
