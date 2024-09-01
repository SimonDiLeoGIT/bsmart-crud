import { Product, ProductListResponseInterface } from "../interfaces/ProductInterfaces";
import ApiService from "./api.service";

class ProductService {
  static async getProducts(page: number = 1): Promise<ProductListResponseInterface> {
    const response = await ApiService.get('/products'+`?page=${page}`);
    return response;
  }

  static async getProduct(id: string = '1'): Promise<Product> {
    const response = await ApiService.get('/product'+`/${id}`);
    return response;
  }
}

export default ProductService