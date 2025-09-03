import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup({ setToken, setUserEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      setToken(idToken);
      setUserEmail(user.email); // ✅ save user’s email
    } catch (err) {
      console.error("Firebase signup error:", err.message);
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="auth-form">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
    </form>
  );
}
