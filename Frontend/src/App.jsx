import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/authSlice';
import PrivateRoute from './pages/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== '/login') {
      dispatch(checkAuth(navigate));
    }
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-20 md:pt-24"> {/* Adjusted padding for mobile */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
      <ToastContainer 
        position="bottom-right"
        toastClassName="bg-gray-800 text-white"
        progressClassName="bg-[#27c6d9]"
      />
    </div>
  );
}

export default App;