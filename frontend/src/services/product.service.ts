import { ErrorInterface } from "../interfaces/ErrorInterface";
import { Product, ProductListResponseInterface } from "../interfaces/ProductInterfaces";
import ApiService from "./api.service";

class ProductService {
  static async getProducts(page: number = 1, sortBy: string = 'id', sortOrder: string = 'asc', perPage: number = 15): Promise<ProductListResponseInterface> {
    const response = await ApiService.makeRequest(`/products/${sortBy}/${sortOrder}?page=${page}&per_page=${perPage}`);
    return await response;
  }

  static async getProductsWihUrl(url: string): Promise<ProductListResponseInterface> {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    };
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      if (!response.ok) {
        const errorData: ErrorInterface = await responseData;
        throw errorData;
      }
      return await responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
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