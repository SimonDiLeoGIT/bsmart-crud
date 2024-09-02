import { CategoryInterface } from "../interfaces/Category";
import ApiService from "./api.service";

class CategoryService {
  static async getCategories(): Promise<CategoryInterface[]> {
    const response = await ApiService.makeRequest('/categories');
    return await response;
  }

  static async createCategory(category: CategoryInterface): Promise<CategoryInterface> {
    const response = await ApiService.makeRequest('/category', 'POST', category);
    return await response;
  }

  static async deleteCategory(category_id: number) {
    const response = await ApiService.makeRequest('/category'+`/${category_id}`, 'DELETE');
    return await response;
  }

  static async updateCategory(category: CategoryInterface) {
    const response = await ApiService.makeRequest('/category'+`/${category.id}`, 'PUT', category);
    return await response;
  }
}

export default CategoryService