import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminScreen from "./screens/AdminScreen";
import Landingscreen from "./screens/LandingScreen";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<HomeScreen />} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            element={<BookingScreen />}
          />
          <Route path="/register" exact element={<RegisterScreen />} />
          <Route path="/login" exact element={<LoginScreen />} />
          <Route path="/profile" exact element={<ProfileScreen />} />
          <Route path="/admin" exact element={<AdminScreen />} />
          <Route path="/" exact element={<Landingscreen />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
