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
}

export default CategoryService