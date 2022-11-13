import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { E404 } from "./components/E404";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter basename="/">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<E404 />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}

export default App;
