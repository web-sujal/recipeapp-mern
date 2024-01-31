import { Router } from "express";
import {
  createRecipe,
  fetchAllRecipes,
  fetchSavedRecipeIds,
  fetchSavedRecipes,
  saveRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();

router.route("/").get(fetchAllRecipes);
router.route("/create-recipe").post(createRecipe);
router.route("/save-recipe").post(saveRecipe);

router.route("/saved-recipes/ids/:userId").get(fetchSavedRecipeIds);
router.route("/saved-recipes/:userId").get(fetchSavedRecipes);

export { router as recipeRouter };
