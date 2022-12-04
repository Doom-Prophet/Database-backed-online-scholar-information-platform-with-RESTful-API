import './App.css';
import './css/custom.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from './pages/NoMatch';
import Search from "./pages/Search";
import Discuss from "./pages/Discuss";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Paper from "./pages/Paper";



function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="search" element={<Search />} />
          <Route path="discuss" element={<Discuss />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="paper/:id" element={<Paper />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
