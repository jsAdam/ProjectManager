import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes, Outlet } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Login from "./components/login";
import CreateUser from "./components/createUser";
import Projects from "./components/projects";
import Board from "./components/board/board";
 
const App = () => {
    return (
        <div className="w-100 h-100 row d-flex justify-content-center align-items-center">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/createUser" element={<CreateUser />} />
                <Route path="/board" element={<Board />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Projects />} />
                </Route>
            </Routes>
            {/* <Routes>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/createUser" element={<CreateUser/>}/>
                <Route exact path="*" element={<MainLayoutRoutes/>} className="w-80 bg-white"/>
            </Routes> */}
        </div>
    );
};

function Layout() {
    return (
        <div className="col-md-10 h-100 bg-white">
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
  }

const MainLayoutRoutes = () => {
    return (
        <>
            <nav>
                <Navbar />
            </nav>{/*This is outside the routes component on purpose read below*/}
            <Routes>
                <Route index element={<Projects />} />
                <Route path="Board"  element={<Board />} />
            </Routes>
        </>
    );
}
 
export default App;