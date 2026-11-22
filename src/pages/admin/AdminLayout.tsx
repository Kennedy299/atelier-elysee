import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  CalendarCheck, 
  FolderKanban, 
  BookOpen, 
  MessageSquareQuote, 
  ExternalLink, 
  LogOut,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/SEOHead';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
    { label: 'Consultations', path: '/admin/consultations', icon: CalendarCheck },
    { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { label: 'Journal', path: '/admin/journal', icon: BookOpen },
    { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex">
      <SEOHead title="Admin Console" />

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-charcoal text-ivory flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Logo & Directorship Tag */}
          <div className="space-y-1">
            <Link to="/" className="font-serif text-2xl tracking-widest uppercase text-ivory block hover:text-earth transition-colors">
              Atelier Élysée
            </Link>
            <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-widest-luxury text-earth font-medium">
              <Shield className="w-3 h-3" />
              <span>Studio Management</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-4 border-t border-ivory/10 text-xs">
            {navItems.map((item) => {
              const active = item.path === '/admin' 
                ? location.pathname === '/admin' 
                : location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-none transition-colors duration-200 uppercase tracking-luxury text-[11px] font-medium ${
                    active
                      ? 'bg-earth text-white'
                      : 'text-ivory/70 hover:bg-ivory/5 hover:text-ivory'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Session & Actions */}
        <div className="p-6 border-t border-ivory/10 space-y-4">
          <div className="text-xs">
            <p className="text-ivory font-medium">{user?.name || 'Director'}</p>
            <p className="text-[11px] text-ivory/50">{user?.role || 'Administrator'}</p>
          </div>

          <div className="pt-2 flex flex-col space-y-2 text-xs">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between text-ivory/60 hover:text-earth transition-colors py-1"
            >
              <span className="uppercase tracking-wider text-[10px]">View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors py-1 text-left uppercase tracking-wider text-[10px] font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Bar on Mobile */}
        <header className="lg:hidden bg-charcoal text-ivory p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-ivory hover:text-earth transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-serif text-lg tracking-wider uppercase">Atelier Élysée</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-earth font-medium">Console</span>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 sm:p-10 md:p-12 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
