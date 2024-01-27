import { Router } from "express";
import {
  createRecipe,
  fetchAllRecipes,
} from "../controllers/recipe.controller.js";

const router = Router();

router.route("/").get(fetchAllRecipes);
router.route("/create-recipe").post(createRecipe);

export { router as recipeRouter };
