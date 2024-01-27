import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipes from "./pages/SavedRecipes";

function App() {
  return (
    <div className="h-screen w-full bg-slate-900 text-white">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

/*
  src/
    components/
    layouts/
      AuthLayout.tsx
      RootLayout.tsx
    pages/ 
      CreateRecipe.tsx
      Home.tsx
      Login.tsx
      SavedRecipes.tsx
      Signup.tsx
    App.tsx
    index.css
    main.tsx
*/
