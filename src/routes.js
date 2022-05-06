
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Products from "pages/product/products";
import ProductCrud from "pages/product/productCrud";
import ProductAdd from "pages/product/productAdd";
import Categories from "pages/categories";
import CategoryDetail from "pages/categoryDetail";
import CategoryAdd from "pages/categoryAdd";
import SubCategories from "pages/subcategories";
import SubCategoryDetail from "pages/subcategoryDetail";
import SubCategoryAdd from "pages/subcategoryAdd";
import Orders from "pages/orders";
import OrderDetail from "pages/orderDetail";
import Partners from "pages/partners";
import PartnerDetail from "pages/partnerDetail";
import News from "pages/news";
import NewsDetail from "pages/newsDetail";
import NewsAdd from "pages/newsAdd";

const routes = [
  {
    type: "collapse",
    name: "Панель управления",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Товары",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    name: "DetailP",
    key: "detail-p",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "products/:id",
    component: <ProductCrud />,
  },
  {
    name: "ProductAdd",
    key: "vadd-po",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "products/add/:slug",
    component: <ProductAdd />,
  },
  {
    type: "collapse",
    name: "Категории",
    key: "categories",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/categories",
    component: <Categories />,
  },
  {
    name: "categoryDetail",
    key: "categorysEdit",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/categories/:id",
    component: <CategoryDetail />,
  },
  {
    name: "categoryAdd",
    key: "categorysAdd",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/categories/add",
    component: <CategoryAdd />,
  },
  {
    type: "collapse",
    name: "Суб категории",
    key: "subcategories",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/subcategories",
    component: <SubCategories />,
  },
  {
    name: "subcategoryDetail",
    key: "subcategorysEdit",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/subcategories/:id",
    component: <SubCategoryDetail />,
  },
  {
    name: "subcategoryAdd",
    key: "subcategorysAdd",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/subcategories/add",
    component: <SubCategoryAdd />,
  },
  {
    type: "collapse",
    name: "Заказы",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Orders />,
  },
  { 
    name: "orderDetail",
    key: "ordersEdit",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/billing/:id",
    component: <OrderDetail />,
  },
  {
    type: "collapse",
    name: "Партнёры",
    key: "partners",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/partners",
    component: <Partners />,
  },
  {
    name: "partnerDetail",
    key: "partnersEdit",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/partners/:id",
    component: <PartnerDetail />,
  },
  {
    type: "collapse",
    name: "Новости",
    key: "news",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/news",
    component: <News />,
  },
  {
    name: "newsDetail",
    key: "newsEdit",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/news/:id",
    component: <NewsDetail />,
  },
  {
    name: "newsAdd",
    key: "newsAdd",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/news/add",
    component: <NewsAdd />,
  },
];

export default routes;
