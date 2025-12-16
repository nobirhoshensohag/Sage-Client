import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PublicLessons from "../pages/PublicLessons";
import Contact from "../pages/Contact";
import AddLessons from "../pages/ProtectedPages/AddLessons";
import PrivateRoute from "../routes/PrivateRoute/PrivateRoute";
import LessonDetails from "../pages/LessonDetails";
import PaymentCancelled from "../pages/Payment/PaymentCancelled";
import UpgradePremium from "../pages/Payment/UpgradePremium";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import DashboardLayout from "../layouts/DashboardLayout";
import MyLessons from "../pages/ProtectedPages/Dashboard/MyLessons";
import DashboardHome from "../pages/ProtectedPages/Dashboard/DashboardHome";
import MyFavorites from "../pages/ProtectedPages/Dashboard/MyFavorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "public-lessons",
        element: <PublicLessons />,
      },
       { path: "contact", element: <Contact /> },
        
      {
        path: "/lesson-details/:id",
        element: <LessonDetails />,
      },
      {
        path: "/payment-cancelled",
          element: <PaymentCancelled />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
             <UpgradePremium />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
   {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "add-lessons",
        element: <AddLessons />,
      },
      {
        path: "my-lessons",
        element: <MyLessons />,
      },
      {
        path: "my-favorites",
        element: <MyFavorites />,
      },
    ],
  },
]);