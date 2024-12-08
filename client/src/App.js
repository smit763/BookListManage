import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/AuthPages/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthRoutes from './Routes/AuthRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';
import Register from './Pages/AuthPages/Register/Register';
import Home from './Pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AddBook from './Pages/Home/AddBook';


function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/add-book' element={<AddBook />} />
        </Route>
      </Routes>
      <ToastContainer position='top-right' autoClose={3000} />
    </>
  );
}

export default App;
