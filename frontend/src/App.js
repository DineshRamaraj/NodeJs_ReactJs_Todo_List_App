import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/index";
import MainTodoList from "./components/MainTodoList/index";
import Register from "./components/Register/index";

import "./App.css";
import OTPVerification from "./components/OTPVerification";

function App() {
  return (
    <div className="font-[roboto]">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        <Route exact path="/" element={<MainTodoList />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/otp-verify" element={<OTPVerification />} />
      </Routes>
    </div>
  );
}

export default App;
