import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './AuthContext';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Weather from './components/Weather';
import DiseaseDetection from './components/DiseaseDetection';
import CropManagement from './components/CropManagement';
import TaskManager from './components/TaskManager';
import Analytics from './components/Analytics';
import LandingPage from './components/LandingPage';
import ChatBot from './components/ChatBot';
import { LanguageProvider } from './context/LanguageContext';

function ProtectedRouteWrapper() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function App() {
  const { token, setToken } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
    setChecking(false);
  }, [setToken]);

  if (checking) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRouteWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/crop-management" element={<CropManagement />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ChatBot />
        <Toaster position="top-right" />
      </Router>
    </LanguageProvider>
  );
}

export default App;
