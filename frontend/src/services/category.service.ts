import { CategoryInterface } from "../interfaces/Category";
import ApiService from "./api.service";

class CategoryService {
  static async getCategories(): Promise<CategoryInterface[]> {
    const response = await ApiService.get('/categories');
    return response;
  }
}

export default CategoryService