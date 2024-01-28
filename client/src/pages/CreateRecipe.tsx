import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useGetUserId } from "@/hooks/useGetUserId";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const userId = useGetUserId();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    createdBy: userId,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;

    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/recipes/create-recipe",
        recipe
      );

      console.log(res); // remove later
      alert("Recipe Created Successfully.");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-12 pb-20 flex min-h-[85vh] overflow-y-auto flex-col items-start justify-center gap-4 bg-slate-900">
      <h2 className="text-4xl mx-auto font-extrabold tracking-wide">
        Create Recipe
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto items-start justify-center gap-2 w-4/6 md:w-2/5"
      >
        <label className="md:text-lg" htmlFor="name">
          Name
        </label>
        <input
          className="w-full text-black outline-none ring-transparent rounded-sm py-2 px-3 caret-slate-800 mb-2"
          type="text"
          id="name"
          value={recipe.name}
          name="name"
          onChange={handleChange}
        />

        <label className="md:text-lg" htmlFor="ingredients">
          Ingredients
        </label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            key={index}
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
            className="w-full text-black outline-none ring-transparent rounded-sm py-2 px-3 caret-slate-800 mb-2"
          />
        ))}
        <Button
          type="button"
          className="w-full bg-neutral-700 hover:bg-neutral-800 rounded-sm"
          onClick={addIngredient}
        >
          + Add Ingredient
        </Button>

        <label className="md:text-lg" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="w-full text-black outline-none ring-transparent rounded-sm py-2 px-3 caret-slate-800 mb-2"
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        />

        <label className="md:text-lg" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          className="w-full text-black outline-none ring-transparent rounded-sm py-2 px-3 caret-slate-800 mb-2"
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />

        <label className="md:text-lg" htmlFor="cooking-time">
          Cooking Time ( in minutes )
        </label>
        <input
          className="w-full text-black outline-none ring-transparent rounded-sm py-2 px-3 caret-slate-800 mb-2"
          type="number"
          id="cooking-time"
          name="cooking-time"
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 py-6 text-lg"
        >
          Create Recipe
        </Button>
      </form>
    </div>
  );
};

export default CreateRecipe;
