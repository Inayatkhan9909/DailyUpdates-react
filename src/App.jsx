import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignInForm from "./auth/forms/SignInForm"
import SignUpForm from "./auth/forms/SignUpForm"
import Home from "./pages/Home"
import About from "./pages/About"
import { Toaster } from "./components/ui/toaster"


const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  )
}

export default App
