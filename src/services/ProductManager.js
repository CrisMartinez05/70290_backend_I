import fs from "fs/promises";
import path from "path";

export default class ProductManager {
  #products;
  #path;

  constructor() {
    this.#products = [];
    this.#path = path.join("data", "Product.json");
    this.#init();
  }

  // Método de arranque
  #init = async () => {
    try {
      const data = await fs.readFile(this.#path, "utf-8");
      this.#products = JSON.parse(data);
    } catch (error) {
      this.#products = [];
    }
  };

  // Método para guardar en el archivo
  saveToFile() {
    fs.writeFile(this.#path, JSON.stringify(this.#products, null, "\t"));
  }

  // Método para generar un nuevo ID (autoincrementable)
  #generarId = () => {
    let idMayor = 0;

    this.#products.forEach((product) => {
      if (product.id > idMayor) {
        idMayor = product.id;
      }
    });
    return idMayor + 1;
  };

  // Método para validar que el código no se repita
  validarCode = (cod) => {
    let codeExist = this.#products.some((prod) => prod.code === cod);
    console.log(codeExist);

    return codeExist;
  };
  // Método para validar que no falten parámetros (producto completo)
  validarProductoCompleto = (producto) => {
    return Object.values(producto).every(
      (valor) => valor !== null && valor !== "" && valor !== undefined
    );
  };

  // Método para mostrar la lista completa de productos.
  getProducts(limit) {
    if (limit) {
      return this.#products.slice(0, limit);
    }
    return this.#products;
  }

  // Método para buscar en la lista un producto por "Id" y mostrarlo por consola...
  getProductById(pId) {
    const productPorId = this.#products.find((prod) => prod.id === pId);

    return productPorId;
  }

  // Método para agregar un producto al array "products" y mostrar por consola junto con una leyenda de "creado correctamente".

  addProduct = (product) => {
    // Estructura del producto
    const newProduct = {
      id: this.#generarId(),
      ...product,
      thumbnail: "#",
      status: true,
    };

    // Agrego el producto al array "products"
    this.#products.push(newProduct);

    // Escribo el archivo
    this.saveToFile();

    //Muestro el producto por consola para controlar
    console.log(product);
    console.log("Producto creado correctamente.");
    // retorno el nuevo producto
    return newProduct;
  };

  // Método para modificar un producto
  updateProduct(id, updatedFields) {
    const productIndex = this.#products.findIndex((p) => p.id === id);
    if (productIndex === -1) return null;

    const updatedProduct = {
      ...this.#products[productIndex],
      ...updatedFields,
      id: this.#products[productIndex].id,
    };
    this.#products[productIndex] = updatedProduct;
    this.saveToFile();
    return updatedProduct;
  }

  // Método  para eliminar un producto de la lista.
  deleteProductById(id) {
    const productIndex = this.#products.findIndex((p) => p.id === id);

    if (productIndex === -1) return null;

    const deletedProduct = this.#products.splice(productIndex, 1);

    this.saveToFile();

    return deletedProduct[0];
  }
}
