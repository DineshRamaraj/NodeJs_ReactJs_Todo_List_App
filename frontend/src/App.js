import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/index";
import Todo from "./components/Todo/index";
import Register from "./components/Register/index";

import "./App.css";

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        <Route exact path="/" element={<Todo />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
