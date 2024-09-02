import { Product, ProductListResponseInterface } from "../interfaces/ProductInterfaces";
import ApiService from "./api.service";

class ProductService {
  static async getProducts(page: number = 1): Promise<ProductListResponseInterface> {
    const response = await ApiService.get('/products'+`?page=${page}`);
    return response;
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await ApiService.get('/product'+`/${id}`);
    return response;
  }
  
  static async updateProduct(product: Product): Promise<Product> {
    const response = await ApiService.put('/product'+`/${product.id}`, product);
    return response;
  }

  static async createProduct(product: Product): Promise<Product> {
    const response = await ApiService.post('/product', product);
    return response;
  }
}

export default ProductService