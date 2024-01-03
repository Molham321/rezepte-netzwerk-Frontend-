
export interface IRecipe {
  _id: string;
  title: string;
  description: string;
  imageURL: string;
  prepTime: number;
  servings: number;
  createdDate: string;
  createdBy: string;
  likes: string;
  category: string[];
  ingredients: IIngredients[];
  steps: ISteps[];
}

interface IIngredients {
  _id: string;
  amount: number;
  unit: string;
  ingredient: string;
}

interface ISteps {
  _id: string;
  order: number;
  description: string;
}