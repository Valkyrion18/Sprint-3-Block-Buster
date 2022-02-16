import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from '../components/Login';
import {Register} from '../components/Register';
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { useDispatch } from 'react-redux';
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { loginEmailPassword } from "../actions/actionLogin";

export const AppRouter = () => {

  const dispatch = useDispatch()

  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user?.uid){
          dispatch(loginEmailPassword(user.uid, user.displayName));
         setIsLoggedIn(true)
        }
        else{
         setIsLoggedIn(false)
        }

        setChecking(false)
    })

 
}, [dispatch, setIsLoggedIn,setChecking])


if(checking){
  return(
      <h1>Espere...</h1>
  )
}

  return (
    <Router>
        <Routes>
         
        <Route path="/login" element={
                    <PublicRoute isAuthenticated={isLoggedIn}>
                        <Login/>                         
                    </PublicRoute>
                } />

                <Route path="/registro" element={
                    <PublicRoute isAuthenticated={isLoggedIn}>
                       <Register/>
                    </PublicRoute>
                } />

                
                <Route path="/*" element={
                    <PrivateRoute isAuthenticated={isLoggedIn}>
                        <DashboardRoutes/>
                    </PrivateRoute>
                }/>
        </Routes>
    </Router>
  );
}


// import React from 'react'
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import { Home } from '../components/Home'
// import { NavBar } from '../components/NavBar'

// export const AppRouter = () => {
//   return (
//     <BrowserRouter>
//         <NavBar />
//         <Routes>
//             <Route path="/" element={<Home/>} />
//             <Route path='*' element={<Navigate to="/" />} />
//         </Routes>
//     </BrowserRouter>
// )
// }

