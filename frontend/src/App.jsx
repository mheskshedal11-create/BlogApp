import "./App.css";
import MainLayout from "./Layouts/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginSingup from "./utils/LoginSingup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginSingup />} />
          <Route path="/signup" element={<LoginSingup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
