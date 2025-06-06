import { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Layout as LayoutIcon,
  Cloud,
  Microscope,
  Plane as Plant,
  Calendar,
  BarChart2,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';
import { useAuth } from '../AuthContext';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout(); 
    toast.success(getTranslation(language, 'signedOutSuccessfully') || 'Signed out successfully');
    navigate('/auth', { replace: true });
  };

  const menuItems = [
    { path: '/dashboard', icon: <LayoutIcon className="h-5 w-5" />, label: getTranslation(language, 'dashboard') },
    { path: '/weather', icon: <Cloud className="h-5 w-5" />, label: getTranslation(language, 'weather') },
    { path: '/disease-detection', icon: <Microscope className="h-5 w-5" />, label: getTranslation(language, 'diseaseDetection') },
    { path: '/crop-management', icon: <Plant className="h-5 w-5" />, label: getTranslation(language, 'crops') },
    { path: '/tasks', icon: <Calendar className="h-5 w-5" />, label: getTranslation(language, 'tasks') },
    { path: '/analytics', icon: <BarChart2 className="h-5 w-5" />, label: getTranslation(language, 'analytics') },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:bg-gray-50"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 w-72 bg-white shadow-xl border-r border-gray-200 flex flex-col z-50 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-center h-20 border-b bg-white">
          <Plant className="h-8 w-8 text-green-600" />
          <span className="ml-3 text-2xl font-bold text-gray-800">FarmFlux</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-5">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-4 px-5 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-green-100 text-green-700 shadow-sm border-l-4 border-green-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-5 border-t border-gray-200 space-y-3">
          <LanguageSelector />
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-4 px-5 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">{getTranslation(language, 'signOut')}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 py-8 md:pt-8">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
