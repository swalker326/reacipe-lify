import SplashScreen from "../screens/SplashScreen";
import ProductScreen from "../screens/ProductScreen";
import LoginScreen from "../screens/LoginScreen"


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