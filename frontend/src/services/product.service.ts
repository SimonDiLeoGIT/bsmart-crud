import { ProductListResponseInterface } from "../interfaces/ProductInterfaces";
import ApiService from "./api.service";

class ProductService {
  static async getProducts(): Promise<ProductListResponseInterface> {
    const response = await ApiService.get('/products');
    return response;
  }
}

export default ProductService