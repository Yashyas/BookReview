import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import PrivateRoute from './Components.jsx/PrivateRoute'
import AdminDashboard from './Pages/AdminDashboard'
import UserDashboard from './Pages/UserDashboard'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Unauthorized from './Pages/Unauthorized'
import HomePage from './Pages/HomePage'
import Navbar from './Components.jsx/Navbar'
import About from './Pages/About'
import BooksList from './Pages/BooksList'
import BookPage from './Pages/BookPage'


function App() {

  return (
    <>
    <Navbar/>
   <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/books" element={<BooksList/>} />
    <Route path="/book/:id" element={<BookPage />} />
    <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/unauthorized" element={<Unauthorized />} />
     <Route path="/admin-dashboard" element={
      <PrivateRoute role="admin">
      <AdminDashboard/>
     </PrivateRoute>} />
     <Route path="/user-dashboard" element={
      <PrivateRoute role="user">
      <UserDashboard/>
     </PrivateRoute>} />
   </Routes>
   </>
  )
}

export default App
