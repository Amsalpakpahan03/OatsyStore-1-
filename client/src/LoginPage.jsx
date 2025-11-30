import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    // LOGIN SEDERHANA (ganti sesuai kebutuhan)
    if (username === "bodat" && password === "123") {
      localStorage.setItem("admin_token", "LOGIN_SUCCESS");
      window.location.href = "/admin";
    } else {
      setError("Username atau Password salah!");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#F4EFE7]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-xl rounded-xl w-96"
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Admin Login</h2>

        {error && (
          <p className="text-red-600 text-center mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-[#5E4A3A] text-white py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
