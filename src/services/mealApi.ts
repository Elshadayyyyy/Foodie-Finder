import axios from 'axios';
interface AxiosResponse<T = any> { 
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: any;
  request?: any; 
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  strSource: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}
interface MealListResponse {
  meals: Meal[] | null;
}
interface SingleMealResponse {
  meals: [Meal] | null; 
}
interface CategoryListResponse {
  meals: { strCategory: string }[] | null;
}


const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const searchMealsByName = async (name: string): Promise<Meal[] | null> => {
  try {
    const response: AxiosResponse<MealListResponse> = await axios.get(`${BASE_URL}search.php?s=${name}`);
    return response.data.meals;
  } catch (error) {
    console.error('Error searching meals by name:', error);
    throw error;
  }
};

export const searchMealsByIngredient = async (ingredient: string): Promise<Meal[] | null> => {
  try {
    const response: AxiosResponse<MealListResponse> = await axios.get(`${BASE_URL}filter.php?i=${ingredient}`);
    return response.data.meals;
  } catch (error) {
    console.error('Error searching meals by ingredient:', error);
    throw error;
  }
};

export const searchMealsByCategory = async (category: string): Promise<Meal[] | null> => {
  try {
    const response: AxiosResponse<MealListResponse> = await axios.get(`${BASE_URL}filter.php?c=${category}`);
    return response.data.meals;
  } catch (error) {
    console.error('Error searching meals by category:', error);
    throw error;
  }
};

export const getMealById = async (id: string): Promise<Meal | null> => {
  try {
    const response: AxiosResponse<SingleMealResponse> = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Error getting meal by ID:', error);
    throw error;
  }
};

export const listCategories = async (): Promise<{ strCategory: string }[] | null> => {
  try {
    const response: AxiosResponse<CategoryListResponse> = await axios.get(`${BASE_URL}list.php?c=list`);
    return response.data.meals;
  } catch (error) {
    console.error('Error listing categories:', error);
    throw error;
  }
};

export const getRandomMeal = async (): Promise<Meal | null> => {
  try {
    const response: AxiosResponse<SingleMealResponse> = await axios.get(`${BASE_URL}random.php`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Error getting random meal:', error);
    throw error;
  }
};
