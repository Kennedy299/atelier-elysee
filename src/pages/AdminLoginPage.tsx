import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEOHead } from '../components/SEOHead';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication rejected');
      }

      login(data.token, data.user);
      navigate('/admin');
    } catch (err: any) {
      // Demo fallback if backend is offline
      if (
        (username === 'elysee_admin' || username === 'director@atelier-elysee.com') &&
        password === 'atelier2025!'
      ) {
        login('elysee-luxury-session-token', {
          id: 'admin-1',
          username: 'elysee_admin',
          name: 'Éléonore de Vauquelin',
          email: 'director@atelier-elysee.com',
          role: 'Principal & Director',
          token: 'elysee-luxury-session-token'
        });
        navigate('/admin');
        return;
      }
      setError(err.message || 'Invalid directorship credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('elysee_admin');
    setPassword('atelier2025!');
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col justify-center py-20 px-6 sm:px-12 relative">
      <SEOHead title="Atelier Access Login" />

      {/* Background architectural geometry */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#A58A70_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-md w-full mx-auto relative z-10 space-y-8">
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block group">
            <span className="font-serif text-3xl tracking-widest uppercase text-ivory group-hover:text-earth transition-colors">
              Atelier Élysée
            </span>
          </Link>
          <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-widest-luxury text-earth font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrative Directorship Console</span>
          </div>
        </div>

        <div className="p-8 sm:p-10 bg-charcoal-400 border border-ivory/15 shadow-2xl space-y-6">
          <div className="border-b border-ivory/10 pb-4">
            <h2 className="font-serif text-2xl text-ivory font-light">
              Executive Authentication
            </h2>
            <p className="text-xs text-ivory/60 font-light mt-1">
              Enter your authorized studio credentials to manage inquiries, commissions, and editorial archives.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-900/30 border border-red-500/40 text-xs text-red-200 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-luxury text-ivory/70 font-medium block">
                Username or Director Email
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="elysee_admin"
                className="w-full px-4 py-3 bg-charcoal border border-ivory/20 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-earth transition-colors font-light"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-luxury text-ivory/70 font-medium block">
                Security Passkey
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-charcoal border border-ivory/20 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-earth transition-colors font-light"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-earth text-white text-xs uppercase tracking-luxury font-medium hover:bg-earth-dark transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-4 border-t border-ivory/10 flex items-center justify-between text-xs">
            <span className="text-ivory/40">Demo Environment</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-earth hover:text-earth-light underline text-[11px] uppercase tracking-wider"
            >
              Fill Demo Credentials
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-xs uppercase tracking-luxury text-ivory/60 hover:text-earth transition-colors"
          >
            ← Return to Public Atelier Experience
          </Link>
        </div>
      </div>
    </div>
  );
};
