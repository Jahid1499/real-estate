import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./components/Header"
import useAuthCheck from "./hooks/useAuthCheck"
import About from "./pages/About"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Profile from "./pages/Profile"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/Signin"


const App = () => {

  const authChecked = useAuthCheck();

  return !authChecked ? (<div>Checking authentication....</div>) : (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App