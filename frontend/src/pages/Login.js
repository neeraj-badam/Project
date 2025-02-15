import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { auth, googleProvider, facebookProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "../index.css"; // Import CSS


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Email Login
  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login({ user: userCredential.user }));
      navigate("/home");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      console.log( userCredential );
      dispatch(login({ user: userCredential.user }));
      navigate("/home");
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  };

  // Handle Facebook Login
  const handleFacebookLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, facebookProvider);
      dispatch(login({ user: userCredential.user }));
      navigate("/home");
    } catch (error) {
      alert("Facebook login failed: " + error.message);
    }
  };

  // Handle Phone OTP Login
  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setConfirmationResult(confirmation);
      alert("OTP Sent!");
    } catch (error) {
      alert("OTP Sending failed: " + error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const userCredential = await confirmationResult.confirm(otp);
      dispatch(login({ user: userCredential.user }));
      navigate("/home");
    } catch (error) {
      alert("OTP Verification failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {/* Email Login */}
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleEmailLogin}>Login with Email</button>

      {/* Social Logins */}
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>

      {/* Phone OTP Login */}
      <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={sendOtp}>Send OTP</button>
      <div id="recaptcha-container"></div>

      {confirmationResult && (
        <>
          <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

    <Link to="/register" className="auth-link">Don't have an account? Register here</Link>
    </div>
  );
}

export default Login;
