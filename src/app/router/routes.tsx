import { createBrowserRouter, Navigate } from "react-router-dom";
import AppShell from "../layout/AppShell";
import DashboardPage from "../../pages/DashboaardPage";
import SettingsPage from "../../pages/SettingsPage";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);
