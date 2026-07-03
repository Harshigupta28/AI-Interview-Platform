import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Brain, 
  LayoutDashboard, 
  FileUp, 
  Video, 
  BarChart3, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Plus, 
  ChevronDown 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, pageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "AM";
    const parts = name.split(" ");
    return parts.map(p => p[0]).join("").toUpperCase().substring(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, path: '/dashboard' },
    { name: 'Resume Upload', icon: <FileUp className="h-4 w-4" />, path: '/upload' },
    { name: 'Mock Interview', icon: <Video className="h-4 w-4" />, path: '/interview' },
    { name: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, path: '/analytics' },
    { name: 'Profile', icon: <User className="h-4 w-4" />, path: '/profile' },
    { name: 'Settings', icon: <Settings className="h-4 w-4" />, path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white flex selection:bg-accent-purple/30 selection:text-white">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] radial-glow pointer-events-none opacity-20 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] radial-glow-cyan pointer-events-none opacity-10 rounded-full" />

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-neutral-950/40 backdrop-blur-xl relative z-30">
        {/* Brand Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center">
              <Brain className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Interv<span className="text-accent-purple">AI</span>
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-accent-purple/15 to-accent-indigo/5 border-l-2 border-accent-purple text-white shadow-inner' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/3'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide text-neutral-400 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Menu Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-card border-r border-white/10 flex flex-col transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center">
              <Brain className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">IntervAI</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-accent-purple/10 border-l-2 border-accent-purple text-white' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/3'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-neutral-400 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Workspace Container */}
      <div className="flex-1 flex flex-col relative z-20 min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/5 bg-dark-bg/40 backdrop-blur-md px-6 flex items-center justify-between select-none">
          
          {/* Mobile Menu trigger */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 text-neutral-400 hover:text-white transition-all"
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="text-base font-bold font-display tracking-tight text-white">{pageTitle}</h1>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-4 relative">
            
            {/* Quick Practice button */}
            <button 
              onClick={() => navigate('/interview')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:scale-[1.02] active:scale-95 shadow-md shadow-accent-purple/10 transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              New Mock
            </button>

            {/* Notification bell */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="p-2 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 text-neutral-400 hover:text-white transition-all cursor-pointer relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent-purple" />
              </button>

              {/* Mock Notification Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-72 rounded-xl border border-white/10 bg-dark-card p-4 shadow-2xl z-40 text-left space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-[10px] font-bold text-neutral-400 tracking-wider">Notifications</span>
                      <span className="text-[9px] text-accent-purple hover:underline cursor-pointer">Mark read</span>
                    </div>
                    <div className="space-y-2.5 max-h-48 overflow-y-auto">
                      <div className="text-[10px] font-light text-neutral-300 border-b border-white/5 pb-2">
                        <p className="font-semibold text-white">AI Feedback compiled</p>
                        <p className="text-neutral-500 mt-0.5">Your mock with Vercel has been graded. Final Score: 88%.</p>
                      </div>
                      <div className="text-[10px] font-light text-neutral-300">
                        <p className="font-semibold text-white">Resume matching completed</p>
                        <p className="text-neutral-500 mt-0.5">Stripe profile parsed. Recommended mock topics available.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Profile avatar */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/3 transition-all cursor-pointer border border-transparent hover:border-white/5"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center font-bold text-xs text-white">
                  {getInitials(user?.fullName || "Alex Mercer")}
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400 hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-dark-card p-2 shadow-2xl z-40 text-left">
                    <div className="px-3 py-2 border-b border-white/5">
                      <p className="text-xs font-semibold text-white">{user?.fullName || "Alex Mercer"}</p>
                      <p className="text-[9px] text-neutral-500 uppercase tracking-wider">{user?.role || "Student"}</p>
                    </div>
                    <div className="p-1 space-y-0.5">
                      <button 
                        onClick={() => { setShowProfileMenu(false); navigate('/profile'); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-[10px] text-neutral-300 hover:text-white hover:bg-white/5 font-semibold transition-all cursor-pointer"
                      >
                        My Profile
                      </button>
                      <button 
                        onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-[10px] text-neutral-300 hover:text-white hover:bg-white/5 font-semibold transition-all cursor-pointer"
                      >
                        Preferences
                      </button>
                      <button 
                        onClick={() => { setShowProfileMenu(false); handleLogout(); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-[10px] text-red-400 hover:text-red-300 hover:bg-red-500/5 font-semibold transition-all cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </header>

        {/* Content Children wrapper */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          {children}
        </main>
      </div>

    </div>
  );
};
