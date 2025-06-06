import React from 'react';
import { Link } from 'react-router-dom';
import { Plane as Plant, Cloud, Microscope, Calendar, BarChart2, Layout } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Plant className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">FarmFlux</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" icon={<Layout className="h-5 w-5" />} text="Dashboard" />
            <NavLink to="/weather" icon={<Cloud className="h-5 w-5" />} text="Weather" />
            <NavLink to="/disease-detection" icon={<Microscope className="h-5 w-5" />} text="Disease Detection" />
            <NavLink to="/crop-management" icon={<Plant className="h-5 w-5" />} text="Crops" />
            <NavLink to="/tasks" icon={<Calendar className="h-5 w-5" />} text="Tasks" />
            <NavLink to="/analytics" icon={<BarChart2 className="h-5 w-5" />} text="Analytics" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

export default Navbar;