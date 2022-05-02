import config from "../config/config.json";
import Delivery from "../interfaces/delivery.ts"

const deliveries = {
    getDeliveries: async function getDeliveries(): Promise<Deliverie[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        delivery["api_key"] = config.api_key;
        const response = await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(delivery),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        return {
            title: "Skapad",
            message: "Inleveransen har skapats",
            type: "success",
        };
    },

};

export default deliveries;
