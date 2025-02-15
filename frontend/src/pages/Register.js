import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../index.css"; // Import CSS


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  // ✅ Prefill Email & Name if redirected from Google Login
  useEffect(() => {
    if (location.state) {
      if(  location.state.email ){
        alert( "Please Create an account first" );
      }
      setEmail(location.state.email || "");
      setName(location.state.name || "");
    }
  }, [location]);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(login({ user: userCredential.user }));
      navigate("/home");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="Name" type="name" value={name} onChange={(e) => setName(e.target.value)}/>
      <input placeholder="Phone" type="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
      <input placeholder="Address" type="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
      <button onClick={handleRegister}>Register</button>
      <Link to="/login" className="auth-link">Already have an account? Login here</Link>
    </div>
  );
}

export default Register;
