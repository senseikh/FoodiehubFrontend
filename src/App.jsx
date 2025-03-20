// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   Outlet,
//   useLocation,
// } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import NotFound from "./pages/NotFound";
// import LandingPage from "./pages/LandingPage";
// import Home from "./pages/Home";
// import Account from "./pages/Account";
// import Settings from "./pages/Settings";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Dashboard from "./components/Dashboard";
// import AddRecipe from "./pages/Recipe/AddRecipe";
// import EditRecipe from "./pages/EditRecipe";
// import Blogs from "./pages/BlogManagement/Blogs";
// import BlogList from "./pages/BlogManagement/BlogList";
// import AddBlog from "./pages/BlogManagement/AddBlog";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import AdminUsers from "./pages/Admin/AdminUser";
// import AdminLogin from "./pages/Admin/AdminLogin";
// import CategoryForm from "./pages/Admin/CategoryForm";
// import CategoryList from "./pages/Admin/CategoryList";
// import RecipeList from "./pages/Admin/RecipeList";
// import About from "./components/About";
// import CommunityPage from "./pages/Community/Map/Map";
// import PublicRecipes from "./pages/Recipe/PublicRecies";
// import PasswordResetRequest from "./Auth.jsx/PasswordResetRequest";
// import CuatomizedNavbar from "./components/CuatomizedNavbar";
// import PasswordReset from "./Auth.jsx/PasswordReset";
// import Navbar from "./components/Navbar";
// import RecipeDetail from "./pages/Recipe/RecipeDetail";
// import RecipeDetailPublic from "./pages/Recipe/RecipeDetailPublic";
// import HotelList from "./pages/UserDashboard/Hotels";

// function Logout() {
//   localStorage.clear();
//   return <Navigate to="/login" />;
// }

// function App() {
//   const location = useLocation();

//   // Hide Navbar for authentication & password reset routes
//   const noNavbar =
//     ["/login", "/register", "/admin/login", "/request/password-reset"].includes(
//       location.pathname
//     ) || location.pathname.includes("password");

//   return (
//     <>
//       {/* {!noNavbar && <Navbar />}  */}
//       <Routes>
//         {/* Admin Routes */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminRequired>
//               <Outlet />
//             </ProtectedRoute>
//           }
//         >
//           {!noNavbar}
//           <Route index element={<AdminDashboard />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="categories" element={<CategoryList />} />
//           <Route path="categories/new" element={<CategoryForm />} />
//           <Route path="categories/:id" element={<CategoryForm />} />
//           <Route path="recipes" element={<RecipeList />} />
//         </Route>
//         <Route path="/admin/login" element={<AdminLogin />} />

//         {/* Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/blogs" element={<BlogList />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/community" element={<CommunityPage />} />
//         <Route
//           path="/request/password-reset"
//           element={<PasswordResetRequest />}
//         />
//         <Route path="/password-reset/:token" element={<PasswordReset />} />
//         <Route path="/recipes/public" element={<PublicRecipes />} />
//         <Route path="/recipe/:id" element={<RecipeDetailPublic />} />
//         <Route path="/hotels" element={<HotelList />} />

//         {/* Protected Dashboard Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Navigate to="home" />} />
//           <Route path="home" element={<Home />} />
//           <Route path="blogs" element={<Blogs />} />
//           <Route path="add-blog" element={<AddBlog />} />
//           <Route path="account" element={<Account />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="add-recipe" element={<AddRecipe />} />
//           <Route path="recipe/:id" element={<RecipeDetail />} />
//           <Route path="recipe/:id/edit" element={<EditRecipe />} />
          
//         </Route>

//         {/* Logout Route */}
//         <Route path="/logout" element={<Logout />} />

//         {/* Catch-All Route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// }

// // Wrap in BrowserRouter at a higher level (index.js or main.jsx)
// export default function WrappedApp() {
//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import AddRecipe from "./pages/Recipe/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Blogs from "./pages/BlogManagement/Blogs";
import BlogList from "./pages/BlogManagement/BlogList";
import AddBlog from "./pages/BlogManagement/AddBlog";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUser";
import AdminLogin from "./pages/Admin/AdminLogin";
import CategoryForm from "./pages/Admin/CategoryForm";
import CategoryList from "./pages/Admin/CategoryList";
import RecipeList from "./pages/Admin/RecipeList";
import About from "./components/About";
import CommunityPage from "./pages/Community/Map/Map";
import PublicRecipes from "./pages/Recipe/PublicRecies";
import PasswordResetRequest from "./Auth.jsx/PasswordResetRequest";
import CuatomizedNavbar from "./components/CuatomizedNavbar";
import PasswordReset from "./Auth.jsx/PasswordReset";
import Navbar from "./components/Navbar";
import RecipeDetail from "./pages/Recipe/RecipeDetail";
import RecipeDetailPublic from "./pages/Recipe/RecipeDetailPublic";
import HotelList from "./pages/UserDashboard/Hotels";
import BlogDetail from "./pages/BlogManagement/BlogDetail";
import BlogDetail_userDashboard from "./pages/BlogManagement/BlogDetail_UserDashboard";
import PublicBlogs from "./pages/BlogManagement/PublicBlogs";


import Header from "./pages/Community/Header/Header";
import Map from "./pages/Community/Map/Map";
import List from "./pages/Community/List/List";
import GetPlacesData from "./pages/Community/api/GetplacesData";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

// Travel Advisor Component with Tailwind CSS
function TravelAdvisor() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude});
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    if(bounds) {
      GetPlacesData(type, bounds.ne, bounds.sw)
        .then((data) => {
          console.log("Places: ", data);
          setPlaces(data);
          setLoading(false);
        });
    }
  }, [bounds, coordinates, type]);

  return (
    <>
      <Header />
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4">
          <List 
            places={places}  
            childClicked={childClicked} 
            isLoading={isLoading}
            type={type} 
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </div>
        <div className="w-full md:w-2/3 h-[90vh]">
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds} 
            coordinates={coordinates}
            places={places} 
            setChildClicked={setChildClicked} 
          />
        </div>
      </div>
    </>
  );
}

function App() {
  const location = useLocation();

  // Hide Navbar for authentication & password reset routes
  const noNavbar =
    ["/login", "/register", "/admin/login", "/request/password-reset"].includes(
      location.pathname
    ) || location.pathname.includes("password");

  return (
    <>
      {/* {!noNavbar && <Navbar />}  */}
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminRequired>
              <Outlet />
            </ProtectedRoute>
          }
        >
          {!noNavbar}
          <Route index element={<AdminDashboard />} />
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
        <Route path="/about" element={<About />} />
        
        {/* Community Routes - Reorganized */}
        <Route path="/community" element={<Outlet />}>
          <Route index element={<CommunityPage />} />
          <Route path="travel-advisor" element={<TravelAdvisor />} />
          <Route path="hotels" element={<HotelList />} />
          <Route path="map" element={<CommunityPage />} />
        </Route>
        
        <Route
          path="/request/password-reset"
          element={<PasswordResetRequest />}
        />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="/recipes/public" element={<PublicRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetailPublic />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blogs/public" element={<PublicBlogs />} />

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
          <Route path="blogs/:id" element={<BlogDetail_userDashboard />} />
          
        </Route>

        {/* Logout Route */}
        <Route path="/logout" element={<Logout />} />

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// Wrap in BrowserRouter at a higher level (index.js or main.jsx)
export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}