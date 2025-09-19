import React from 'react';
import { NavLink } from 'react-router-dom';
import { PawIcon, HomeIcon, PetIcon, SettingsIcon, ShieldIcon } from './IconComponents';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  end?: boolean;
}

const NavItem: React.FC<NavItemProps> = React.memo(({ icon, label, to, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 w-full text-left ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'text-slate-500 hover:bg-indigo-100 hover:text-indigo-700'
      }`
    }
  >
    {icon}
    <span className="font-semibold">{label}</span>
  </NavLink>
));

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white flex-shrink-0 p-6 hidden lg:flex flex-col space-y-8 border-r border-slate-200">
      <div className="flex items-center space-x-3 text-indigo-700">
        <PawIcon className="h-8 w-8" />
        <span className="text-2xl font-bold tracking-tight">PetCare</span>
      </div>
      <nav className="flex-1 space-y-2">
        <NavItem 
            icon={<HomeIcon className="h-5 w-5" />} 
            label="Dashboard" 
            to="/"
            end
        />
        <NavItem 
            icon={<PetIcon className="h-5 w-5" />} 
            label="My Pets"
            to="/pets"
        />
        <NavItem 
            icon={<ShieldIcon className="h-5 w-5" />} 
            label="Insurance"
            to="/insurance"
        />
      </nav>
      <div>
        <NavItem icon={<SettingsIcon className="h-5 w-5" />} label="Settings" to="/settings" />
      </div>
    </aside>
  );
};
