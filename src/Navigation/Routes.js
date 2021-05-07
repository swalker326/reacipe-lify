import SplashScreen from "../Pages/Splash";
import ProductScreen from "../Pages/Products";
import Login from "../Pages/Auth/Login";
import Profile from "../Pages/Profile";
import Todos from "../Pages/Todos";
import Signup from "../Pages/Auth/Signup";

export const Routes = [
  {
    title: "Home",
    path: "/",
    component: SplashScreen,
    exact: true,
    private: false,
  },
  {
    title: "Products",
    path: "/products",
    component: ProductScreen,
    exact: false,
    private: false,
  },
  {
    title: "Login",
    path: "/login",
    component: Login,
    exact: false,
    private: false,
  },
  {
    title: "Profile",
    path: "/profile",
    component: Profile,
    exact: false,
    private: true,
  },
  {
    title: "Todo's",
    path: "/todos",
    component: Todos,
    exact: false,
    private: false,
  },
  {
    title: "Sign Up",
    path: "/signup",
    component: Signup,
    exact: false,
    private: false,
  },
];
