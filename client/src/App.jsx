import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import { AuthContextProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile/:subpage?" element={<ProfilePage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
