import { Navigate } from "react-router-dom";

import DashboardLayout from "src/layouts/DashboardLayout";
import MainLayout from "src/layouts/MainLayout";
import ParticipantsListView from "src/views/participants/ParticipantsListView";
import DashboardView from "src/views/reports/DashboardView";
import LoginView from "src/views/auth/LoginView";
import NotFoundView from "src/views/errors/NotFoundView";
import RegisterView from "src/views/auth/RegisterView";
import SettingsView from "src/views/settings/SettingsView";
import TeamsListView from "src/views/teams/TeamsListView";
import EventsStore from "src/stores/EventsStore";

const eventsStore = new EventsStore();

const routes = [
  {
    path: "app",
    element: <DashboardLayout events={eventsStore} />,
    children: [
      { path: "dashboard", element: <DashboardView /> },
      { path: "participants", element: <ParticipantsListView /> },
      { path: "teams", element: <TeamsListView events={eventsStore} /> },
      { path: "settings", element: <SettingsView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
