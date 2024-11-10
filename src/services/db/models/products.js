import mongoose from "mongoose";

const collectionName = 'products';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};

const productSchema = new mongoose.Schema({
    title: stringTypeSchemaNonUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    code: stringTypeSchemaUniqueRequired,
    price: numberTypeSchemaNonUniqueRequired,
    stock: numberTypeSchemaNonUniqueRequired,
    category: stringTypeSchemaNonUniqueRequired
 
});

const productsModel = mongoose.model(collectionName, productSchema);

export default productsModel;