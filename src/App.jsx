import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipe from "./pages/EditRecipe";
import Blogs from "./pages/BlogManagement/Blogs";
import BlogList from "./pages/BlogManagement/BlogList";
import AddBlog from "./pages/BlogManagement/AddBlog";
// import BlogDetail from "./pages/BlogDetail";
import SharedRecipeDetail from "./pages/SharedRecipeDetail";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUser";
import AdminLogin from "./pages/Admin/AdminLogin";
import CategoryForm from "./pages/Admin/CategoryForm";
import CategoryList from "./pages/Admin/CategoryList";
import RecipeList from "./pages/Admin/RecipeList";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminRequired>
              {/* <AdminDashboard /> */}
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} /> // This will show at
          /admin
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/new" element={<CategoryForm />} />
          <Route path="categories/:id" element={<CategoryForm />} />
          <Route path="recipes" element={<RecipeList />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<BlogList />} />
        {/* <Route path="/blogs/:id" element={<BlogDetail />} /> */}
        <Route path="/recipes/shared/:id" element={<SharedRecipeDetail />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-recipe" element={<AddRecipe />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
          <Route path="recipe/:id/edit" element={<EditRecipe />} />
        </Route>

        {/* Logout Route */}
        <Route path="/logout" element={<Logout />} />

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
