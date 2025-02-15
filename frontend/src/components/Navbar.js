import { Link } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { auth } from "../firebase";
import { adminLogout } from "../redux/adminSlice";
import { driverLogout } from "../redux/driverSlice";

function Navbar() {
  const { user } = useSelector((state) => state.user); // ✅ Get user from Redux
  const { admin } = useSelector((state) => state.admin); // ✅ Get admin from Redux
  const { driver } = useSelector((state) => state.driver); // ✅ Get driver from Redux
  const dispatch = useDispatch();
  console.log( driver );

  console.log("Admin State:", admin); // ✅ Debug: Check if admin is detected

  const handleLogout = async () => {
    if (user) {
      await auth.signOut();
      dispatch(logout());
    }
    if (admin) {
      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
      dispatch(adminLogout());
    }
    if( driver ){
      dispatch(driverLogout());
    }
  };

  return (
    <nav style={{ padding: "10px", background: "#333", color: "white", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/" style={{ color: "white", marginRight: "15px", textDecoration: "none", fontSize: "18px" }}>Home</Link>

        {/* ✅ Show Cart & Orders only if a User is logged in (not Admin) */}
        {user && !admin && (
          <>
            <Link to="/checkout" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Cart</Link>
            <Link to="/orders" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>My Orders</Link>
          </>
        )}

        {/* ✅ Show Admin Panel only if an Admin is logged in */}
        {admin && (
          <Link to="/admin" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Admin Panel</Link>
        )}
      </div>

      <div>
        {/* ✅ Hide Login, Register, and Admin Login if a User OR an Admin is logged in */}
        {!user && !admin  && !driver ?(
          <>
            <Link to="/login" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
            <Link to="/admin-login" style={{ color: "white", marginLeft: "15px", textDecoration: "none" }}>Admin Login</Link>
            <Link to="/driver-login" style={{ color: "white", marginLeft: "15px", textDecoration: "none" }}>Driver Login</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: "10px" }}>Welcome, {user?.displayName || driver?.name || admin?.email || "Admin"}</span>
            <button onClick={handleLogout} style={{ background: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
