import productsModel from "./models/products.js";

export default class ProductManager {
    constructor(){
        console.log("Working products with Database persistence in mongodb");        
    };

    getProducts = async () => {

        let products = await productsModel.find();
        return products.map(product => product.toObject());

    };

    getProductsById = async (pId) => {

        let productPorId = await productsModel.findById(pId)
        return (productPorId.toObject());

    }

    addProduct = async (product) => {

        let newProduct= await productsModel.create(product);
        return newProduct;

    };

    updateProduct = async (pId, updatedFields) => {

        let updatedProduct = await productsModel.updateOne({pId}, updatedFields);
        return updatedProduct;
        
    }

    deleteProductById = async (pId) => {
        
        let deletedProduct = await productsModel.deleteOne({pId});
        return deletedProduct;
    }




}