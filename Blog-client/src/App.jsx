import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import CreatePost from "./pages/CreatePost";
import Updatepost from "./pages/Updatepost";


const App = () => {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/SignIn" element={<SignIn/>}/>
    <Route path="/SignUp" element={<SignUp/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path="/Dashboard" element={<Dashboard/>}/>
    </Route>
    <Route element={<PrivateRouteAdmin/>}>
    <Route path="/create-post" element={<CreatePost/>}/>
    <Route path="/update-post/:postId" element={<Updatepost/>}/>
    </Route>
  </Routes>
  <FooterCom/>
  </BrowserRouter>
  );
};

export default App;