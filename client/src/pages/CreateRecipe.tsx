import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useGetUserId } from "@/hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import LoginFirstPage from "./LoginFirstPage";

const CreateRecipe = () => {
  const userId = useGetUserId();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    createdBy: userId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
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
        recipe,
      );

      console.log(res); // remove later
      alert("Recipe Created Successfully.");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!userId) {
    return <LoginFirstPage />;
  }

  return (
    <div className="flex min-h-[85vh] flex-col items-start justify-center gap-4 overflow-y-auto bg-slate-900 pb-20 pt-12">
      <h2 className="mx-auto text-4xl font-extrabold tracking-wide">
        Create Recipe
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-4/6 flex-col items-start justify-center gap-2 md:w-2/5"
      >
        <label className="md:text-lg" htmlFor="name">
          Name
        </label>
        <input
          className="mb-2 w-full rounded-sm px-3 py-2 text-black caret-slate-800 outline-none ring-transparent"
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
            className="mb-2 w-full rounded-sm px-3 py-2 text-black caret-slate-800 outline-none ring-transparent"
          />
        ))}
        <Button
          type="button"
          className="w-full rounded-sm bg-neutral-700 hover:bg-neutral-800"
          onClick={addIngredient}
        >
          + Add Ingredient
        </Button>

        <label className="md:text-lg" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="mb-2 w-full rounded-sm px-3 py-2 text-black caret-slate-800 outline-none ring-transparent"
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        />

        <label className="md:text-lg" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          className="mb-2 w-full rounded-sm px-3 py-2 text-black caret-slate-800 outline-none ring-transparent"
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />

        <label className="md:text-lg" htmlFor="cookingTime">
          Cooking Time ( in minutes )
        </label>
        <input
          className="mb-2 w-full rounded-sm px-3 py-2 text-black caret-slate-800 outline-none ring-transparent"
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="w-full bg-teal-600 py-6 text-lg hover:bg-teal-700"
        >
          Create Recipe
        </Button>
      </form>
    </div>
  );
};

export default CreateRecipe;
