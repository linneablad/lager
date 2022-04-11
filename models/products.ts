import config from "../config/config.json";
import Product from "../interfaces/product.ts"

const products = {
    getProducts: async function getProducts(): Promise<Product[]> {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },

    updateProduct: async function updateProduct(product: Partial<Product>) {
        product["api_key"] = config.api_key;
        fetch(`${config.base_url}/products`, {
            body: JSON.stringify(product),
            headers: {
              'content-type': 'application/json'
            },
            method: 'PUT'
        });
    }
};

export default products;
