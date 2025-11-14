import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <div>About Page</div> },
      { path: "/contact", element: <div>Contact Page</div> },
    ],
  },
]);

export default router;
