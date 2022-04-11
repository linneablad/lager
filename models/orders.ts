import config from "../config/config.json";
import Order from "../interfaces/order.ts"
import productModel from "../models/products.ts";

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    updateOrder: async function updateOrder(order: Partial<Order>) {
        order["api_key"] = config.api_key;
        fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(order),
            headers: {
              'content-type': 'application/json'
            },
            method: 'PUT'
        });
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        order.order_items.map(async (order_item) => {
            let changedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
            }
            await productModel.updateProduct(changedProduct)
        })
        order["status_id"] = 200;
        await orders.updateOrder(order)
    }
};

export default orders;
