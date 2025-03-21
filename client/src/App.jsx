import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import User from "./pages/User";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/user-settings",
      element: (
        <>
          <Navbar />
          <User />
        </>
      ),
    },
    {
      path: "/feedback",
      element: (
        <>
          <Navbar />
          <Feedback />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
