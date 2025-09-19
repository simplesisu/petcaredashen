import React from 'react';
import { BellIcon } from './IconComponents';

export const Header: React.FC = () => {
    return (
        <header className="bg-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-200">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Welcome Back!</h1>
                <p className="text-sm text-slate-500 mt-1">Here's what's happening with your pets today.</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <input type="text" placeholder="Search..." className="w-64 pl-4 pr-4 py-2 rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-indigo-600 relative">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                <img src="https://picsum.photos/id/64/200/200" alt="User Avatar" className="h-10 w-10 rounded-full object-cover"/>
            </div>
        </header>
    );
};
