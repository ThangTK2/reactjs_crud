import './App.css';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import { Route, Routes } from 'react-router-dom';
import Users from './pages/user/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from './pages/user/AddUser';
import EditUser from './pages/user/EditUser';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/users/:id" exact element={<Users/>} />
        <Route path="/add-user" exact element={<AddUser/>} />
        <Route path="/edit-user/:id" exact element={<EditUser/>} />
      </Routes>

      {/* Toastify */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App;
