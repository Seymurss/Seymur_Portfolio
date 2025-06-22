import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/admin";
    } catch (err) {
      setError("Email və ya şifrə səhvdir.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-md shadow-md w-[22%] max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">🔐 Admin Giriş</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-[10px] mb-[20px] px-3 py-2 border border-gray-300 rounded focus:outline-none"
        />

        <input
          type="password"
          placeholder="Şifrə"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-[20px] px-3 py-2 border border-gray-300 rounded focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-[#367088] hover:bg-[#28556a] text-white py-2 rounded font-medium transition"
        >
          Daxil ol
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
