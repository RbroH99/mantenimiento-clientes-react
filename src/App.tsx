import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">{/* <Route path="login" element={<Login />} /> */}</Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
