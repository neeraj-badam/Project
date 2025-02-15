import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/userSlice";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import { requestNotificationPermission } from "./firebase";
import Orders from "./pages/Orders";
import DriverDashboard from "./pages/DriverDashboard";
import OrderTracking from "./pages/OrderTracking";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminRegister from "./pages/AdminRegister";
import DriverLogin from "./pages/DriverLogin";
import DriverDelivery from './pages/DriverDelivery';


const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { driver } = useSelector((state) => state.driver);

  useEffect(() => {
    requestNotificationPermission();
  }, []);


  useEffect(() => {
    // Listen for Firebase authentication changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login({ user }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:orderId/tracking" element={<OrderTracking />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/driver-login" element={driver ? <Navigate to="/driver-dashboard" /> : <DriverLogin />} />
        <Route path="/driver-dashboard" element={driver ? <DriverDashboard /> : <Navigate to="/driver-login" />} />
        <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        <Route path="/driver/delivery/:orderId" element={<DriverDelivery />} />  {/* ✅ Add this route */}
      </Routes>
    </>
  );
}

export default App;