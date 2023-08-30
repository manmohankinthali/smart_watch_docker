import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Statistics from "./components/Statistics";
import KnowUs from "./components/KnowUs";
import Useit from "./components/Useit";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/knowUs" element={<KnowUs />} />
          <Route path="/useit" element={<Useit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
