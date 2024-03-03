import React, { useState } from "react";
import { HeaderImage } from "./HeaderImage";
import { FIREBASE_AUTH } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginAuth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        props.setIsLoggedIn(true);
      })
      .catch((error) => {
        alert("Error", error.message);
      });
  };

  return (
    <main className="h-screen">
        <HeaderImage/>
    <div className="flex flex-col items-center justify-center h-96">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2"
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded"
      >
        Logga in
      </button>
    </div>
    </main>
  );
};

export default LoginAuth;
