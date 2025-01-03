import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import type { Ingredient } from './types.ts';
import { ingredients } from './ingredients.ts'

interface SelectedIngredient extends Ingredient {
  amount: number;
}

const RecipeBuilder = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipe, setRecipe] = useState({
    name: '',
    salt: 0,
    fat: 0,
    acid: 0,
    heat: 0
  });


  const calculateIngredientImpact = (ingredient: Ingredient, amount: number) => {
    return {
      salt: ingredient.baseValues.salt * ingredient.ratios.saltPerUnit * amount,
      fat: ingredient.baseValues.fat * ingredient.ratios.fatPerUnit * amount,
      acid: ingredient.baseValues.acid * ingredient.ratios.acidPerUnit * amount,
      heat: ingredient.baseValues.heat * ingredient.ratios.heatPerUnit * amount
    };
  };

  const calculateTotals = (ingredients: SelectedIngredient[]) => {
    return ingredients.reduce((acc, curr) => {
      const impact = calculateIngredientImpact(curr, curr.amount);
      return {
        salt: acc.salt + impact.salt,
        fat: acc.fat + impact.fat,
        acid: acc.acid + impact.acid,
        heat: acc.heat + impact.heat
      };
    }, { salt: 0, fat: 0, acid: 0, heat: 0 });
  };

  useEffect(() => {
    const totals = calculateTotals(selectedIngredients);
    setRecipe(prev => ({ ...prev, ...totals }));
  }, [selectedIngredients]);

  const addIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients([...selectedIngredients, { ...ingredient, amount: 1 }]);
  };

  const updateAmount = (id: number, amount: number) => {
    setSelectedIngredients(prev =>
      prev.map(ing => ing.id === id ? { ...ing, amount } : ing)
    );
  };

  const removeIngredient = (id: number) => {
    setSelectedIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const data = [
    { subject: 'Salt', value: recipe.salt },
    { subject: 'Fat', value: recipe.fat },
    { subject: 'Acid', value: recipe.acid },
    { subject: 'Heat', value: recipe.heat }
  ];

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Recipe Name"
        className="w-full p-2 mb-4 border rounded"
        value={recipe.name}
        onChange={(e) => setRecipe(prev => ({ ...prev, name: e.target.value }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Ingredients</h2>
          <div className="grid grid-cols-1 gap-4">
            {['protein', 'vegetable', 'seasoning'].map(category => (
              <div key={category}>
                <h3 className="text-lg font-semibold capitalize mb-2">{category}s</h3>
                <div className="grid grid-cols-2 gap-2">
                  {ingredients
                    .filter(i => i.category === category)
                    .map(ingredient => (
                      <button
                        key={ingredient.id}
                        onClick={() => addIngredient(ingredient)}
                        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        {ingredient.name}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Selected Ingredients</h3>
            <div className="space-y-2">
              {selectedIngredients.map(ingredient => (
                <div 
                  key={ingredient.id} 
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2">
                    <span>{ingredient.name}</span>
                    <span className="text-sm text-gray-500">({ingredient.servingSize})</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={ingredient.amount}
                      onChange={(e) => updateAmount(ingredient.id, parseFloat(e.target.value))}
                      className="w-20 p-1 border rounded"
                    />
                    <span>{ingredient.unit}</span>
                  </div>
                  <button 
                    onClick={() => removeIngredient(ingredient.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <RadarChart width={400} height={400} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar name="Recipe" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Recipe Analysis</h3>
            <div className="space-y-2">
              <div>Salt Level: {recipe.salt.toFixed(1)}/10</div>
              <div>Fat Level: {recipe.fat.toFixed(1)}/10</div>
              <div>Acid Level: {recipe.acid.toFixed(1)}/10</div>
              <div>Heat Level: {recipe.heat.toFixed(1)}/10</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Cooking Recommendations</h3>
            {recipe.heat > 7 && <p>🌶️ Consider serving with cooling sides</p>}
            {recipe.salt > 7 && <p>🧂 You may want to reduce salt content</p>}
            {recipe.acid < 3 && <p>🍋 Could benefit from some acid (citrus, vinegar)</p>}
            {recipe.fat < 3 && <p>🫒 Consider adding healthy fats</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeBuilder;