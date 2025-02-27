import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import AdminPage from "./pages/Admin";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import User from "./pages/User";
import DashboardPage from "./routes/dashboard/page";
import { ThemeProvider } from "./contexts/theme-context";

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
      path: "/admin",
      element: <AdminPage />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "analytics",
          element: <h1 className="title">Analytics</h1>,
        },
        {
          path: "reports",
          element: <h1 className="title">Reports</h1>,
        },
        {
          path: "customers",
          element: <h1 className="title">Customers</h1>,
        },
        {
          path: "new-customer",
          element: <h1 className="title">New Customer</h1>,
        },
        {
          path: "verified-customers",
          element: <h1 className="title">Verified Customers</h1>,
        },
        {
          path: "products",
          element: <h1 className="title">Products</h1>,
        },
        {
          path: "new-product",
          element: <h1 className="title">New Product</h1>,
        },
        {
          path: "inventory",
          element: <h1 className="title">Inventory</h1>,
        },
        {
          path: "settings",
          element: <h1 className="title">Settings</h1>,
        },
      ],
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

  return (
    <ThemeProvider storageKey="theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
