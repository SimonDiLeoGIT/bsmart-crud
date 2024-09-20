import { Product, ProductListResponseInterface } from "../interfaces/ProductInterfaces";
import ApiService from "./api.service";

class ProductService {
  static async getProducts(page: number = 1, sortBy: string = 'id', sortOrder: string = 'asc'): Promise<ProductListResponseInterface> {
    const response = await ApiService.makeRequest(`/products/${sortBy}/${sortOrder}?page=${page}`);
    return await response;
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await ApiService.makeRequest('/product'+`/${id}`);
    return await response;
  }
  
  static async updateProduct(product: Product | undefined): Promise<Product> {
    const response = await ApiService.makeRequest('/product'+`/${product?.id}`, 'PUT',  product);
    return await response;
  }

  static async createProduct(product: Product | undefined): Promise<Product> {
    const response = await ApiService.makeRequest('/product', 'POST', product);
    return await response;
  }

  static async deleteProduct(product: number) {
    const response = await ApiService.makeRequest('/product'+`/${product}`, 'DELETE');
    return await response;
  }
}

export default ProductService