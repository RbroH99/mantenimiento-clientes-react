import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { SiteNotificationProvider } from "./context/SiteNotificationContext";
import NotFound from "./pages/NotFound";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import ClientsConsultation from "./pages/ClientsConsultation/ClientConsultation";
import ClientMaintenance from "./pages/ClientMaintenance/ClientMaintenance";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path=""
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="clients" element={<ClientsConsultation />} />
        <Route path="client-maintenance/:id?" element={<ClientMaintenance />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <SiteNotificationProvider>
      <RouterProvider router={router} />
    </SiteNotificationProvider>
  );
}

export default App;
