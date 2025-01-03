export const ingredients: Ingredient[] = [
 // Proteins
 {
   id: 1, name: 'Chicken Breast',
   baseValues: { salt: 2, fat: 3, acid: 1, heat: 0 },
   unit: 'serving',
   ratios: { saltPerUnit: 0.2, fatPerUnit: 0.3, acidPerUnit: 0.1, heatPerUnit: 0 },
   category: 'protein', servingSize: '4 oz'
 },
 {
   id: 2, name: 'Salmon',
   baseValues: { salt: 3, fat: 7, acid: 1, heat: 0 },
   unit: 'serving',
   ratios: { saltPerUnit: 0.3, fatPerUnit: 0.7, acidPerUnit: 0.1, heatPerUnit: 0 },
   category: 'protein', servingSize: '6 oz'
 },
 {
   id: 3, name: 'Ground Beef',
   baseValues: { salt: 2, fat: 8, acid: 0, heat: 0 },
   unit: 'serving', 
   ratios: { saltPerUnit: 0.2, fatPerUnit: 0.8, acidPerUnit: 0, heatPerUnit: 0 },
   category: 'protein', servingSize: '4 oz'
 },
 {
   id: 25, name: 'Chicken Thighs',
   baseValues: { salt: 2, fat: 6, acid: 1, heat: 0 },
   unit: 'serving',
   ratios: { saltPerUnit: 0.2, fatPerUnit: 0.6, acidPerUnit: 0.1, heatPerUnit: 0 },
   category: 'protein', servingSize: '4 oz'
 },

 // Vegetables
 {
   id: 7, name: 'Lemon',
   baseValues: { salt: 0, fat: 0, acid: 9, heat: 0 },
   unit: 'tbsp',
   ratios: { saltPerUnit: 0, fatPerUnit: 0, acidPerUnit: 0.9, heatPerUnit: 0 },
   category: 'vegetable', servingSize: '1 tbsp juice'
 },
 {
   id: 8, name: 'Lime',
   baseValues: { salt: 0, fat: 0, acid: 8, heat: 0 },
   unit: 'tbsp',
   ratios: { saltPerUnit: 0, fatPerUnit: 0, acidPerUnit: 0.8, heatPerUnit: 0 },
   category: 'vegetable', servingSize: '1 tbsp juice'
 },
 {
   id: 10, name: 'Onion',
   baseValues: { salt: 1, fat: 0, acid: 2, heat: 1 },
   unit: 'serving',
   ratios: { saltPerUnit: 0.1, fatPerUnit: 0, acidPerUnit: 0.2, heatPerUnit: 0.1 },
   category: 'vegetable', servingSize: '1/4 cup chopped'
 },
 {
   id: 11, name: 'Garlic',
   baseValues: { salt: 1, fat: 0, acid: 1, heat: 2 },
   unit: 'tsp',
   ratios: { saltPerUnit: 0.1, fatPerUnit: 0, acidPerUnit: 0.1, heatPerUnit: 0.2 },
   category: 'vegetable', servingSize: '1 tsp minced'
 },
 {
   id: 13, name: 'Jalapeño',
   baseValues: { salt: 0, fat: 0, acid: 1, heat: 6 },
   unit: 'tsp',
   ratios: { saltPerUnit: 0, fatPerUnit: 0, acidPerUnit: 0.1, heatPerUnit: 0.6 },
   category: 'vegetable', servingSize: '1 tsp minced'
 },

 // Seasonings & Sauces
 {
   id: 15, name: 'Soy Sauce',
   baseValues: { salt: 9, fat: 0, acid: 2, heat: 0 },
   unit: 'tbsp',
   ratios: { saltPerUnit: 0.9, fatPerUnit: 0, acidPerUnit: 0.2, heatPerUnit: 0 },
   category: 'seasoning', servingSize: '1 tbsp'
 },
 {
   id: 17, name: 'Olive Oil',
   baseValues: { salt: 0, fat: 9, acid: 0, heat: 0 },
   unit: 'tbsp',
   ratios: { saltPerUnit: 0, fatPerUnit: 0.9, acidPerUnit: 0, heatPerUnit: 0 },
   category: 'seasoning', servingSize: '1 tbsp'
 },
 {
   id: 18, name: 'Butter',
   baseValues: { salt: 1, fat: 10, acid: 0, heat: 0 },
   unit: 'tbsp',
   ratios: { saltPerUnit: 0.1, fatPerUnit: 1.0, acidPerUnit: 0, heatPerUnit: 0 },
   category: 'seasoning', servingSize: '1 tbsp'
 },
 {
   id: 19, name: 'Vinegar',
   baseValues: { salt: 0, fat: 0, acid: 9, heat: 0 },
   unit: 'tbsp',
   ratios: { saltPerUnit: 0, fatPerUnit: 0, acidPerUnit: 0.9, heatPerUnit: 0 },
   category: 'seasoning', servingSize: '1 tbsp'
 },
 {
   id: 21, name: 'Gochujang',
   baseValues: { salt: 6, fat: 1, acid: 1, heat: 7 },
   unit: 'tbsp',
   ratios: { saltPerUnit: 0.6, fatPerUnit: 0.1, acidPerUnit: 0.1, heatPerUnit: 0.7 },
   category: 'seasoning', servingSize: '1 tbsp'
 },
 {
   id: 22, name: 'Sriracha',
   baseValues: { salt: 3, fat: 0, acid: 2, heat: 6 },
   unit: 'tsp',
   ratios: { saltPerUnit: 0.3, fatPerUnit: 0, acidPerUnit: 0.2, heatPerUnit: 0.6 },
   category: 'seasoning', servingSize: '1 tsp'
 }
];