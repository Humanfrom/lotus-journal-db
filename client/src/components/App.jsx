import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector(state => state.user.isAuth);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        {!isAuth && 
        <Routes>
          <Route path="/registration" Component={Registration}/>
          <Route path="/login" Component={Login}/>
        </Routes>
        /*: 
        <Routes>
          <Route path="/journal" Component={Login}/>
        </Routes>*/
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
