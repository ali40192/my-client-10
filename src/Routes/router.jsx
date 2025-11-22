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
        loader: () =>
          fetch(
            "https://assignment-10-server-three-kappa.vercel.app/leatest-six"
          ),
      },
      {
        path: "/allbooks",
        Component: AllBooks,
        loader: () =>
          fetch("https://assignment-10-server-three-kappa.vercel.app/allbooks"),
      },

      {
        path: "/addbook",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/bookdetails/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-10-server-three-kappa.vercel.app/allbooks/${params.id}`
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
        path: "/mybooks",
        element: (
          <PrivateRoute>
            <MyBook> </MyBook>
          </PrivateRoute>
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
]);

export default router;
