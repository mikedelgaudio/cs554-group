import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { Discover } from "./components/Discover";
import { E404 } from "./components/E404";
import { Favorited } from "./components/Favorited";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { FirebaseProvider } from "./firebase/firebase.context";

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter basename="/">
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/favorited" element={<Favorited />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<E404 />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
