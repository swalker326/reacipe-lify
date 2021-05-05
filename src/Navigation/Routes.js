import SplashScreen from "../Screens/SplashScreen";
import ProductScreen from "../Screens/ProductScreen";
import LoginScreen from "../Screens/LoginScreen"


export const Routes = [
  {
    title: "Home",
    path: "/",
    component: SplashScreen,
    exact: true,
    private: false
  },
  {
    title: "Products",
    path: "/products",
    component: ProductScreen,
    exact: false,
    private: false
  },
  {
    title: "Login",
    path: "/login",
    component: LoginScreen,
    exact: false,
    private: false
  },
]