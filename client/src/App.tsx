import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"
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
        <Route path="/login" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/registration" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App