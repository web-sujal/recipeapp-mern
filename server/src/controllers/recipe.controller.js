import { Recipe } from "../models/Recipe.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const fetchAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});

    if (!recipes)
      throw new ApiError(500, "failed to fetch recipes from the server.");

    return res.status(200).json(new ApiResponse(200, recipes));
  } catch (error) {
    throw new ApiError(500, "couldn't fetch recipes from the server.");
  }
};

const createRecipe = async (req, res) => {
  const recipe = req.body;
  try {
    await Recipe.create(recipe);

    return res
      .status(200)
      .json(new ApiResponse(200, recipe, "recipe created successfully"));
  } catch (error) {
    throw new ApiError(500, "failed to create the recipe.");
  }
};

const saveRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    const user = await User.findById(req.body.userId);
    user.savedRecipes.push(recipe);
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { savedRecipes: user.savedRecipes },
          "recipe saved successfully."
        )
      );
  } catch (error) {
    throw new ApiError(500, "couldn't save the recipe.");
  }
};

export { fetchAllRecipes, createRecipe, saveRecipe };
