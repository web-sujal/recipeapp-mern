import { Router } from "express";
import {
  createRecipe,
  fetchAllRecipes,
  fetchSavedRecipeIds,
  fetchSavedRecipes,
  saveRecipe,
} from "../controllers/recipe.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(fetchAllRecipes);

// PROTECTED ROUTES
router.route("/create-recipe").post(verifyJWT, createRecipe);
router.route("/save-recipe").post(verifyJWT, saveRecipe);

router.route("/saved-recipes/ids/:userId").get(verifyJWT, fetchSavedRecipeIds);
router.route("/saved-recipes/:userId").get(verifyJWT, fetchSavedRecipes);

export { router as recipeRouter };
