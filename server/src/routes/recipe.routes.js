import { Router } from "express";
import {
  createRecipe,
  fetchAllRecipes,
} from "../controllers/recipe.controller.js";

const router = Router();

router.route("/").get(fetchAllRecipes);

export { router as recipeRouter };
