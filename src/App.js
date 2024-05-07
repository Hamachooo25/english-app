import React from "react";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/Login"
import Home from "./pages/home/Home";
/*import Landing from './pages/landing/Landing';
import Post from "./pages/postTest/PostTest";*/
import Talk from "./pages/talk/Talk"
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import ScrollTop from "./components/ScrollTop";
import './App.css';
import { Toaster } from "react-hot-toast";
/*import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy";
import TermOfUse from "./pages/privacypolicy/TermOfUse";
import Legal from "./pages/privacypolicy/Legal";*/
import {Page404} from './pages/404/404'


function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/signup" />;
}

export default function App() {
  const [user] = useAuthState(auth);
  return (
      <Router>
        <Toaster
        position="top-center"
        toastOptions={{
          duration:2000,
        }}

        />
        <ScrollTop />
        <Routes>
        <Route path="/signup" element={user? <Navigate to ="/"/> : <SignUp/>} />
        <Route path="/login" element={user? <Navigate to ="/"/> : <LogIn/>} />

        <Route path="/" element={<Home />} />
        <Route 
          path="/talk"
          element={<Talk />}
        />

        <Route 
          path="/profile"
          element={<PrivateRoute element={<Profile />} 
          isAuthenticated={!!user} />}
        />
        {/*
        <Route
          path="post"
          element={<Post/>}
        />

        <Route
        path="/privacy_policy"
        element={<PrivacyPolicy/>}
        />
        <Route
        path="/term_of_use"
        element={<TermOfUse/>}
        />
        <Route
        path="/legal"
        element={<Legal/>}
        />*/}
      <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
  );
}