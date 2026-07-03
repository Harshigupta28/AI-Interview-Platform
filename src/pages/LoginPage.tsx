import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation States
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const tempErrors: { email?: string; password?: string } = {};
    if (!email) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setSuccessMsg('');
      setErrors({});
      
      try {
        await login(email, password);
        setSuccessMsg('Authentication successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } catch (error: any) {
        setErrors({ email: error.message || 'Login failed. Please check your credentials.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg grid-bg flex text-white selection:bg-accent-purple/30 selection:text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] radial-glow pointer-events-none opacity-40 rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] radial-glow-pink pointer-events-none opacity-30 rounded-full" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-neutral-300 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>
      </div>

      {/* Left Panel: AI Themed Interactive Illustration (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative border-r border-white/5 bg-neutral-950/40 backdrop-blur-3xl select-none">
        
        {/* Logo block */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Interv<span className="text-accent-purple">AI</span>
          </span>
        </div>

        {/* Neural Network SVG animation */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="absolute w-[320px] h-[320px] border border-accent-purple/10 rounded-full animate-pulse-slow flex items-center justify-center">
            <div className="w-[200px] h-[200px] border border-accent-cyan/10 rounded-full flex items-center justify-center">
              <div className="w-[100px] h-[100px] border border-accent-pink/10 rounded-full" />
            </div>
          </div>

          {/* Central Orbit Brain */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
            className="w-[280px] h-[280px] relative flex items-center justify-center"
          >
            {/* Orbiting nodes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent-purple shadow-lg shadow-accent-purple/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/50" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-accent-pink shadow-lg shadow-accent-pink/50" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
          </motion.div>

          {/* Central Logo */}
          <div className="absolute h-16 w-16 rounded-2xl bg-neutral-900 border border-white/15 flex items-center justify-center shadow-2xl">
            <Brain className="h-8 w-8 text-accent-purple" />
          </div>

          {/* Floating AI metrics cards */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="absolute top-10 right-4 p-3 rounded-lg border border-accent-purple/20 bg-accent-purple/5 backdrop-blur-md text-left max-w-[170px]"
          >
            <p className="text-[9px] font-mono font-semibold text-accent-purple uppercase tracking-wider">Voice Analysis</p>
            <p className="text-[10px] text-neutral-300 font-light mt-1">Filler word counts low. Speech pacing optimal.</p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-12 left-4 p-3 rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 backdrop-blur-md text-left max-w-[180px]"
          >
            <p className="text-[9px] font-mono font-semibold text-accent-cyan uppercase tracking-wider">STAR framework</p>
            <p className="text-[10px] text-neutral-300 font-light mt-1">Situation & Task defined. Awaiting Action response.</p>
          </motion.div>
        </div>

        {/* Footer citation */}
        <div className="relative z-10">
          <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
            "PrepAI transformed my loop. The AI coached me through behavioral pitfalls I didn't even notice I was making."
          </p>
          <p className="text-[10px] font-bold text-neutral-500 mt-2">
            STACY CHEN, SOFTWARE ENGINEER @ STRIPE
          </p>
        </div>
      </div>

      {/* Right Panel: Clean Glassmorphic Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          <GlassCard className="border-white/10 p-8 sm:p-10 relative overflow-hidden" hoverGlow={false}>
            
            {/* Header info */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-white tracking-tight">Welcome Back</h2>
              <p className="text-xs text-neutral-400 font-light mt-2">
                Enter your credentials to access your preparation mockups.
              </p>
            </div>

            {/* Success banner */}
            <AnimatePresence>
              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-400 text-left"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5 text-left">
              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-neutral-900/60 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-purple'} focus:ring-1 focus:ring-accent-purple/20 outline-none transition-all placeholder:text-neutral-600 text-white`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-neutral-300">Password</label>
                  <a 
                    href="#forgot" 
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Mock Action: Password reset request triggered.");
                    }}
                    className="text-[10px] text-accent-purple hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl text-sm bg-neutral-900/60 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-purple'} focus:ring-1 focus:ring-accent-purple/20 outline-none transition-all placeholder:text-neutral-600 text-white`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Keep signed in */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="rounded border-white/10 bg-neutral-950 text-accent-purple focus:ring-accent-purple focus:ring-offset-neutral-950 h-3.5 w-3.5 transition-colors"
                />
                <span className="text-[11px] text-neutral-400 font-light">Keep me signed in for 30 days</span>
              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:from-accent-indigo hover:to-accent-purple transition-all duration-300 active:scale-95 shadow-lg shadow-accent-purple/15 flex items-center justify-center gap-2 border border-white/5 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In
                    <Sparkles className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Social Logins */}
            <div className="mt-8 space-y-4">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-3 text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">or continue with</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button 
                  onClick={() => alert("Google Login (Mock)")}
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  Google
                </button>
                <button 
                  onClick={() => alert("GitHub Login (Mock)")}
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  GitHub
                </button>
                <button 
                  onClick={() => alert("LinkedIn Login (Mock)")}
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Register redirection */}
            <div className="text-center mt-8 text-xs text-neutral-500 font-light">
              Don't have an account?{' '}
              <Link to="/register" className="text-accent-purple hover:underline font-semibold text-neutral-400 hover:text-white">
                Create Free Account
              </Link>
            </div>

          </GlassCard>
        </div>
      </div>
    </div>
  );
};
