import DataProvider from "./context/DataProvider";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from "react";

//components
import Login from "./components/account/Login";
import Home from "./components/home/Home";
import Header from "./components/Header/Header";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? <>
    <Header />
    <Outlet />
  </>
    :
    <Navigate replace to='/login'></Navigate>
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: '70px' }}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}></PrivateRoute>} >
              <Route path='/' element={<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>

  );
}

export default App;
