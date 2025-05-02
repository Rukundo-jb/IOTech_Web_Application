import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Todo from "./TodoApp/Todo";
import _Navbar from "./Class Task/Navbar";
import Home from "./Class Task/Home";
import User from "./Class Task/Users";
import About from "./Class Task/About";
import Error404 from "./Class Task/Error404";
import LoginParameter from "./Class Task/LoginParameter";
import Dashboard from "./Class Task/Dashboard";
import Gallery from "./Class Task/Gallery";
// import Navbar from "./Revision/Navbar";
// import HomePage from "./Revision/HomePage";
// import AboutPage from "./Revision/About";
// import TestImage from "./Class Task/ImageTest";

export default function App() {
  return (
    <>
 
      <main>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" style={{ textDecoration: "none" }}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/users" style={{ textDecoration: "none" }}>
                  User
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Log In
                </Link>
              </li>
            </ul>
          </nav>
          <div className="contents">
            <Routes>
              <Route path="*" element={<Error404 />} />
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/users" element={<User />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginParameter />} />
              <Route path="/dashboard/:paramValue" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      </main>
    </>
  );
}
