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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* <Route path="" element={<Home />} /> */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
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
