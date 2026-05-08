import { Link, Outlet } from "react-router-dom";
import { ShieldCheck, LogIn, LogOut } from "lucide-react";
import { developerName } from "../data/apps";
import { useAuth } from "../hooks/useAuth";

export function Layout() {
  const { isAdmin, login, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gray-900 text-white p-2 rounded-lg group-hover:bg-gray-800 transition-colors">
              <ShieldCheck size={20} />
            </div>
            <span className="font-serif font-semibold text-xl tracking-tight text-gray-900 group-hover:text-gray-700 transition-colors">
              {developerName} Apps Policy
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Apps
            </Link>
            {isAdmin ? (
              <button 
                onClick={logout}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <button 
                onClick={login}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                <LogIn size={16} />
                Admin
              </button>
            )}
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-gray-400" />
            <span className="text-sm text-gray-500 font-medium">
              &copy; {new Date().getFullYear()} {developerName}. All rights reserved.
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Play Store Developer Privacy Portal
          </div>
        </div>
      </footer>
    </div>
  );
}
