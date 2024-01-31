import { useGetUserId } from "@/hooks/useGetUserId";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginFirstPage from "./LoginFirstPage";
// import { FaRegBookmark } from "react-icons/fa6";
// import { useToast } from "@/components/ui/use-toast";

type Recipe = {
  _id: string;
  name: string;
  instructions: string;
  ingredients: string[];
  imageUrl: string;
  createdBy: string;
  cookingTime: number;
};

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  const userId = useGetUserId();
  // const { toast } = useToast();

  useEffect(() => {
    const fetchSavedRecipeIds = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/recipes/saved-recipes/${userId}`,
          { withCredentials: true },
        );

        setSavedRecipes(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedRecipeIds();
  }, [userId]);

  // unsave recipe fn

  if (!userId) {
    return <LoginFirstPage />;
  }

  return (
    <ul className="flex flex-col items-center gap-4 bg-slate-900 px-6 py-10 lg:px-20">
      {savedRecipes.map((recipe) => {
        return (
          <li
            key={recipe._id}
            className="flex w-5/6 flex-col items-start justify-center gap-1 rounded-sm bg-gray-700 p-6 md:max-w-[600px]"
          >
            {/* name */}
            <div className="flex w-full items-center justify-between">
              <h4 className="text-4xl font-bold">{recipe.name}</h4>
              {/* <div onClick={() => saveRecipe(recipe._id)}>
                {savedRecipes.includes(recipe._id) ? (
                  <FaBookmark className="cursor-pointer text-3xl" />
                ) : (
                  <FaRegBookmark className="cursor-pointer text-3xl" />
                )}
              </div> */}
            </div>

            {/* instructions */}
            <p className="opacity-90">{recipe.instructions}</p>

            {/* ingredients */}
            <div className="flex flex-col items-start justify-center">
              <h4 className="mt-2 text-lg font-bold">Ingredients:</h4>
              <ul className="flex flex-wrap items-center justify-start gap-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient},</li>
                ))}
              </ul>
            </div>

            {/* image */}
            <img
              className="mt-4 cursor-pointer rounded-sm object-cover"
              src={recipe.imageUrl}
              alt={`${recipe.name}-image`}
            />

            {/* cooking time */}
            <p>
              Cooking time: {recipe.cookingTime}{" "}
              <span className="italic">(minutes)</span>
            </p>

            {/* Post Stats ( coming soon ) */}
          </li>
        );
      })}
    </ul>
  );
};

export default SavedRecipes;
