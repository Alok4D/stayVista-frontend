import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/Common/Statistics";
import AddRoom from "../pages/Dashboard/Host/AddRoom";
import MyListings from "../pages/Dashboard/Host/MyListings";
import Profile from "../pages/Dashboard/Common/Profile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUser";
import AdminRoute from "./AdminRoute";
import HostRoute from "./HostRoute";
import MyBookings from "../pages/Dashboard/Guest/MyBookings";
import ManageBookings from "../pages/Dashboard/Host/ManageBookings";
import Wishlist from "../components/wishlists/Wishlist";
import Trips from "../components/trips/Trips";
import Message from "../components/message/Message";
import ContactUs from "../pages/Contact/ContactUs";
import AboutUs from "../pages/aboutUs/AboutUs";
import AllRooms from "../components/AllRooms/AllRooms";
import BlogDetails from "../components/Home/BlogDetails";
import ContactMessages from "../pages/Dashboard/Admin/ContactMessages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-rooms",
        element: <AllRooms/>,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetails/>,
      },
      {
        path: "/wishlist",
        element: <Wishlist/>,
      },
      {
        path: "/trips",
        element: <Trips/>,
      },
      {
        path: "/message",
        element: <Message/>,
      },
      {
        path: "/contact",
        element: <ContactUs/>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs/>,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics></Statistics>
          </PrivateRoute>
        ),
      },
      {
        path: "add-room",
        element: (
          <PrivateRoute>
            <AddRoom></AddRoom>
          </PrivateRoute>
        ),
      },
      {
        path: "my-listings",
        element: (
          <PrivateRoute>
            <HostRoute>
              <MyListings></MyListings>
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "contact-messages",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ContactMessages />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <PrivateRoute>
            <HostRoute>
              <ManageBookings></ManageBookings>
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
