import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./UI/Home";
import Menu from "./features/menu/Menu";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/menu", element: <Menu /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
