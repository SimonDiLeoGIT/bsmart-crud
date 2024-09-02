import { Product, ProductListResponseInterface } from "../interfaces/ProductInterfaces";
import ApiService from "./api.service";

class ProductService {
  static async getProducts(page: number = 1): Promise<ProductListResponseInterface> {
    const response = await ApiService.makeRequest('/products'+`?page=${page}`);
    return response;
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await ApiService.makeRequest('/product'+`/${id}`);
    return response;
  }
  
  static async updateProduct(product: Product): Promise<Product> {
    const response = await ApiService.makeRequest('/product'+`/${product.id}`, 'PUT',  product);
    return response;
  }

  static async createProduct(product: Product): Promise<Product> {
    const response = await ApiService.makeRequest('/product', 'POST', product);
    return response;
  }

  static async deleteProduct(product: number) {
    const response = await ApiService.makeRequest('/product'+`/${product}`, 'DELETE');
    return response;
  }
}

export default ProductService