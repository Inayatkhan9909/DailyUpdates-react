import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignInForm from "./auth/forms/SignInForm"
import SignUpForm from "./auth/forms/SignUpForm"
import Home from "./pages/Home"
import About from "./pages/About"
import { Toaster } from "./components/ui/toaster"
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"
import ScrollToTop from "./components/shared/ScrollToTop"
import PrivateRoute from "./components/shared/PrivateRoute"
import Dashboard from "./pages/Dashboard"
import AdminPrivateRoute from "./components/shared/AdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
import EditPost from "./pages/EditPost"
import Search from "./pages/Search"
import PostDetails from "./pages/PostDetails"
 

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <ScrollToTop/>
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/search" element={<Search/>} />

        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>

        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<EditPost />} />
        </Route>

        <Route path="/news" element={<Search/>} />
        <Route path="/post/:postSlug" element={<PostDetails />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
          <Footer/>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
