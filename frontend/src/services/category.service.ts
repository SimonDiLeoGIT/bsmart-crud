import { CategoryInterface, CategoryProductsInterface } from "../interfaces/Category";
import ApiService from "./api.service";

class CategoryService {
  static async getCategories(sortBy: string = 'id', sortOrder: string = 'asc'): Promise<CategoryInterface[]> {
    const response = await ApiService.makeRequest(`/categories/${sortBy}/${sortOrder}`);
    return await response;
  }

  static async getCategoryProducs(): Promise<CategoryProductsInterface[]> {
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