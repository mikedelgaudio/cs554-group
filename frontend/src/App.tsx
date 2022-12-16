import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./components/Auth/Login";
import { Logout } from "./components/Auth/Logout";
import { Register } from "./components/Auth/Register";
import { Discover } from "./components/Discover";
import { E404 } from "./components/E404";
import { Favorited } from "./components/Favorited";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { FirebaseGuards, FirebaseProvider } from "./firebase/firebase.context";

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter basename="/">
        <header>
          <Navbar />
        </header>
        <main>
          <ToastContainer role="alert" />
          <Routes>
            <Route
              path="/"
              element={
                <FirebaseGuards.RequireAuth>
                  <Discover />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <FirebaseGuards.RequireUnAuth>
                  <Login />
                </FirebaseGuards.RequireUnAuth>
              }
            />
            <Route
              path="/logout"
              element={
                <FirebaseGuards.RequireAuth>
                  <Logout />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route
              path="/register"
              element={
                <FirebaseGuards.RequireUnAuth>
                  <Register />
                </FirebaseGuards.RequireUnAuth>
              }
            />
            <Route
              path="/discover"
              element={
                <FirebaseGuards.RequireAuth>
                  <Discover />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route
              path="/favorited"
              element={
                <FirebaseGuards.RequireAuth>
                  <Favorited />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <FirebaseGuards.RequireAuth>
                  <Profile />
                </FirebaseGuards.RequireAuth>
              }
            />
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
