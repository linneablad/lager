import config from "../config/config.json";
import Order from "../interfaces/order.ts"

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern

        // TODO: Ändra status för ordern till packad
    }
};

export default orders;