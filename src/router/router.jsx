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
import UserProfile from "../pages/ProtectedPages/Dashboard/UserProfile";
import ApproveLessons from "../pages/ProtectedPages/Dashboard/Admin/ApproveLessons";
import AdminHome from "../pages/ProtectedPages/Dashboard/Admin/AdminHome";
import ReportedLessons from "../pages/ProtectedPages/Dashboard/Admin/ReportedLessons";
import AdminProfile from "../pages/ProtectedPages/Dashboard/Admin/AdminProfile";
import ManageUsers from "../pages/ProtectedPages/Dashboard/Admin/ManageUsers";
import AdminRoute from "../routes/AdminRoute/AdminRoute";
import Error404 from "../components/Shared/Error404";
import CaseStudies from "../pages/CaseStudies";
import DeveloperDocs from "../pages/DeveloperDocs";
import CommunityForum from "../pages/CommunityForum";
import KnowledgeBase from "../pages/KnowledgeBase";
import About from "../pages/About";
import Careers from "../pages/Careers";
import Press from "../pages/Press";
import Blog from "../pages/Blog";

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
        path: "/case-studies",
       element: <CaseStudies />
      },
      {
        path: "/developer-docs",
        element: <DeveloperDocs/>
      },
      {
      path: "/community-forum",
       element: <CommunityForum />
      },
      {
        path: "/knowledge-base",
         element: <KnowledgeBase />
      },
      {
  path: "about",
  element:   (
    <PrivateRoute>  
      <About />
      </PrivateRoute>
  ),
  
},
{
  path: "careers",
  element: (
    <PrivateRoute>
      <Careers />
    </PrivateRoute>
  ),
},
{
  path: "press",
  element: (
    <PrivateRoute>
      <Press />
    </PrivateRoute>
  ),
},
{
  path: "blog",
  element: (
    <PrivateRoute>
      <Blog />
    </PrivateRoute>
  ),
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
        path: "*",
        element: <Error404 />,
      },
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
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "approve-lessons",
        element: (
          <AdminRoute>
            <ApproveLessons />
          </AdminRoute>
        ),
      },
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "reported-lessons",
        element: (
          <AdminRoute>
            <ReportedLessons />
          </AdminRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);