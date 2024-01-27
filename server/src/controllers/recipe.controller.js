import { Recipe } from "../models/Recipe.model.js";
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

export { fetchAllRecipes };
