import config from "../config/config.json";
import storage from "./storage";
import Invoice from "../interfaces/invoice.ts"

const invoices = {
    getInvoices: async function getInvoices(): Promise<Invoice[]> {
        const token = await storage.readToken();
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token.token
            },
        });
        const result = await response.json();
        return result.data;
    },
    addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
        const token = await storage.readToken();
        invoice["api_key"] = config.api_key;
        fetch(`${config.base_url}/invoices`, {
            body: JSON.stringify(invoice),
            headers: {
              'content-type': 'application/json',
              'x-access-token': token.token
            },
            method: 'POST'
        });
    },

};

export default invoices;
