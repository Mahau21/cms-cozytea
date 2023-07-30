import { lazy } from "react"
const Dashboard = lazy(() => import("pages/Dashboard"))
const Product = lazy(() => import("pages/Product"))
const UpdateProduct = lazy(() => import("pages/Product/UpdateProduct"))
const CreateProduct = lazy(() => import("pages/Product/CreateProduct"))

const Category = lazy(() => import("pages/Category"))
const Site = lazy(() => import("pages/Site"))
const Region = lazy(() => import("pages/Region"))
const Tag = lazy(() => import("pages/Tag"))
//____ListPage
function pageList(__role) {
  return [
    {
      path: "dashboard",
      Element: Dashboard,
      code: "HOME_CONTROLLER"
    },
    {
      path: "product/new",
      Element: CreateProduct,
      code: "PRODUCT_CONTROLLER"
    },
    {
      path: "product/edit/:product_id",
      Element: UpdateProduct,
      code: "PRODUCT_CONTROLLER"
    },
    {
      path: "product",
      Element: Product,
      code: "PRODUCT_CONTROLLER"
    },
    {
      path: "category",
      Element: Category,
      code: "CATEGORY_CONTROLLER"
    },
    {
      path: "site",
      Element: Site,
      code: "SITE_CONTROLLER"
    },
    {
      path: "region",
      Element: Region,
      code: "REGION_CONTROLLER"
    },
    {
      path: "tag",
      Element: Tag,
      code: "TAG_CONTROLLER"
    } //next_component
  ]
}

export default pageList
