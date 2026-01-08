import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import AllBooks from "../Pages/AllBooks/AllBooks";
import AddBook from "../Pages/AddBook/AddBook";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import BookDetails from "../Pages/BookDetails/BookDetails";
import UpdateBook from "../Pages/UpdateBook/UpdateBook";
import MyBook from "../Pages/MyBook/MyBook";
import Error from "../Components/Error/Error";
import Loader from "../Components/Loader/Loader";

import Dashboard from "../DashBoardLayout/Dashboard";
import Statictis from "../DashBoardLayout/Statictis";
import MyProfile from "../DashBoardLayout/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error></Error>,
    hydrateFallbackElement: <Loader></Loader>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allbooks",
        Component: AllBooks,
      },

      {
        path: "/bookdetails/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "/updatebook/:id",
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-10-server-three-kappa.vercel.app/allbooks/${params.id}`
          ),
      },

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/registration",
        Component: Registration,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/statistics",
        element: <Statictis></Statictis>,
      },

      {
        path: "/dashboard/addbook",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/mybooks",
        element: (
          <PrivateRoute>
            <MyBook> </MyBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myprofile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
]);

export default router;
