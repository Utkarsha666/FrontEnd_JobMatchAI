import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "tailwindcss/tailwind.css";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-end bg-center bg-cover" style={{backgroundImage: "url('/intro.jpeg')"}}>
      <form onSubmit={handleSubmit} className="m-auto p-5 rounded-lg shadow-md max-w-md bg-white bg-opacity-75 mr-10">
        <h1 className="text-2xl font-bold mb-5">{name}</h1>
        <input
          className="w-11/12 p-2 m-2 border border-gray-300 rounded-md"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          className="w-11/12 p-2 m-2 border border-gray-300 rounded-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button className="w-11/12 p-2 m-5 bg-blue-500 text-white rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-700" type="submit">
          {name}
        </button>
      </form>
    </div>
  );
}

export default Form;
