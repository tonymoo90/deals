export type Unit = 'serving' | 'tbsp' | 'tsp';

export interface Ingredient {
  id: number;
  name: string;
  baseValues: {
    salt: number;
    fat: number;
    acid: number;
    heat: number;
  };
  unit: Unit;
  ratios: {
    saltPerUnit: number;
    fatPerUnit: number;
    acidPerUnit: number;
    heatPerUnit: number;
  };
  category: string;
  servingSize: string;
}