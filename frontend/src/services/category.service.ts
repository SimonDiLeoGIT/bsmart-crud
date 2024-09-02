import { CategoryInterface } from "../interfaces/Category";
import ApiService from "./api.service";

class CategoryService {
  static async getCategories(): Promise<CategoryInterface[]> {
    const response = await ApiService.makeRequest('/categories');
    return response;
  }

  static async createCategory(category: CategoryInterface): Promise<CategoryInterface> {
    const response = await ApiService.makeRequest('/category', 'POST', category);
    return response;
  }

  static async deleteCategory(category_id: number) {
    const response = await ApiService.makeRequest('/category'+`/${category_id}`, 'DELETE');
    return response;
  }
}

export default CategoryService