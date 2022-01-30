import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/authentication/login"
import Logout from "../pages/authentication/logout"
import Register from "../pages/authentication/register"
import ForgetPasswordPage from "../pages/authentication/forget-password"

//Vessel
import VesselComponent from "pages/product-page/product/product-component"
import VesselDetailComponent from "pages/product-page/product-detail/product-detail.component"

//Utility
import Pages404 from "../pages/utility-page/pages-404"
import AppLoader from "pages/utility-page/AppLoader"

import LockScreen from "pages/authentication/auth-lock-screen"

const userRoutes = [
  // Vessels
  { path: "/products", component: VesselComponent },
  { path: "/product-detail/:mode/:id?", component: VesselDetailComponent },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/auth/loader" /> },
  { path: "*", component: Pages404 },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/register", component: Register },
  { path: "/auth/loader", component: AppLoader },
  { path: "/auth-lock-screen", component: LockScreen },
]

export { userRoutes, authRoutes }
