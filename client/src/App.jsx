import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import SinglePage from './pages/SinglePage';
import { AuthContextProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile/:subpage?/:action?/:id?"
            element={<ProfilePage />}
          />
          <Route path="/place/:id" element={<SinglePage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
