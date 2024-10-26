import axios from "axios"

const API_URL = "http://localhost:8080";

class ProductService {
    saveProduct(product) {
        return axios.post(API_URL + "/products", product);
    }

    getAllProducts() {
        return axios.get(API_URL + "/products");
    }

    getProductById(id) {
        return axios.get(API_URL + "/products/" + id);
    }

    deleteProduct(id) {
        return axios.delete(API_URL + "/products/" + id);
    }

    updateProduct(product, id) {
        return axios.put(API_URL + "/products/" + id, product);
    }
}

export default new ProductService