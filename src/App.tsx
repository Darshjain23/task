import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Layout from "./pages/layout/Layout";
import "./App.css";
import UserListing from "./pages/userListing/UserListing";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./pages/dashboard/privateRoute/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="UserListing" element={<UserListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
