import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('software');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Validation States
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string; terms?: string }>({});
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password Strength States
  const [strengthScore, setStrengthScore] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('Empty');
  const [strengthColor, setStrengthColor] = useState('bg-neutral-800');

  useEffect(() => {
    if (!password) {
      setStrengthScore(0);
      setStrengthLabel('Empty');
      setStrengthColor('bg-neutral-800');
      return;
    }

    let score = 0;
    // Condition 1: Length >= 8
    if (password.length >= 8) score++;
    // Condition 2: Has numbers
    if (/\d/.test(password)) score++;
    // Condition 3: Has lowercase & uppercase mixed
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    // Condition 4: Has special symbols
    if (/[^A-Za-z0-9]/.test(password)) score++;

    setStrengthScore(score);

    switch(score) {
      case 0:
      case 1:
        setStrengthLabel('Weak');
        setStrengthColor('bg-red-500');
        break;
      case 2:
        setStrengthLabel('Medium');
        setStrengthColor('bg-yellow-500');
        break;
      case 3:
        setStrengthLabel('Good');
        setStrengthColor('bg-lime-500');
        break;
      case 4:
        setStrengthLabel('Very Strong');
        setStrengthColor('bg-emerald-500');
        break;
      default:
        setStrengthLabel('Empty');
        setStrengthColor('bg-neutral-800');
    }
  }, [password]);

  const validate = () => {
    const tempErrors: { fullName?: string; email?: string; password?: string; terms?: string } = {};
    
    if (!fullName) {
      tempErrors.fullName = 'Full Name is required';
    }
    
    if (!email) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
    }

    if (!agreeTerms) {
      tempErrors.terms = 'You must agree to the Terms of Service & Privacy Policy';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setSuccessMsg('');
      setErrors({});
      
      try {
        await register(fullName, email, password);
        setSuccessMsg('Account created successfully! Preparing dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } catch (error: any) {
        setErrors({ email: error.message || 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg grid-bg flex text-white selection:bg-accent-purple/30 selection:text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] radial-glow-cyan pointer-events-none opacity-30 rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] radial-glow-pink pointer-events-none opacity-30 rounded-full" />

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

      {/* Left Panel: AI Performance Feedback illustration (Desktop Only) */}
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

        {/* Mock AI grading panel visualization */}
        <div className="relative flex-grow flex items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-dark-card/90 shadow-2xl p-5 text-left relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-4">
              <span className="text-[10px] font-bold font-mono text-neutral-400 tracking-wider">AI Transcript Scorecard</span>
              <span className="text-[9px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">Pass</span>
            </div>

            {/* Simulated line feedback */}
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] text-neutral-400 font-light">Question: Why do we use composite indexes?</p>
                <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-[11px] font-mono text-emerald-300 leading-normal">
                  "Composite indexes allow multiple search criteria to be evaluated in a single index lookup operation, optimizing query plans."
                </div>
                <p className="text-[9px] text-neutral-500 font-light">✓ AI feedback: Excellent. Directly addresses B-tree node alignment.</p>
              </div>

              <div className="space-y-1">
                <div className="p-3.5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-[11px] font-mono text-yellow-300 leading-normal">
                  "Um, we mostly use indexes so that, basically, search doesn't take too long on the databases..."
                </div>
                <p className="text-[9px] text-yellow-500 font-medium">⚠ AI feedback: Weak verbs detected. Slow down pacing by 15 WPM.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-xs text-neutral-300 font-semibold">Privacy & Encryption Guaranteed</p>
            <p className="text-[10px] text-neutral-500 font-light">Mock audio files are processed locally. Resumes encrypted at rest.</p>
          </div>
        </div>
      </div>

      {/* Right Panel: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          <GlassCard className="border-white/10 p-8 sm:p-10 relative overflow-hidden" hoverGlow={false}>
            
            {/* Header info */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-bold text-white tracking-tight">Create Account</h2>
              <p className="text-xs text-neutral-400 font-light mt-2">
                Join PrepAI to start practice runs and analyze performance.
              </p>
            </div>

            {/* Success message banner */}
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

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-4 text-left">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-neutral-900/60 border ${errors.fullName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-purple'} focus:ring-1 focus:ring-accent-purple/20 outline-none transition-all placeholder:text-neutral-600 text-white`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div className="space-y-1">
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
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-neutral-900/60 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-purple'} focus:ring-1 focus:ring-accent-purple/20 outline-none transition-all placeholder:text-neutral-600 text-white`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Target Role selection */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Target Career Path</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-neutral-900/60 border border-white/10 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/20 outline-none transition-all text-white appearance-none cursor-pointer"
                  >
                    <option value="software">Software Engineering</option>
                    <option value="product">Product Management</option>
                    <option value="data">Data Science & AI</option>
                    <option value="consulting">Management Consulting</option>
                    <option value="finance">Investment Banking</option>
                  </select>
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-neutral-900/60 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-purple'} focus:ring-1 focus:ring-accent-purple/20 outline-none transition-all placeholder:text-neutral-600 text-white`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2.5 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400">Password Strength:</span>
                      <span className="font-bold text-white">{strengthLabel}</span>
                    </div>
                    {/* Visual strength bar */}
                    <div className="w-full h-1 bg-neutral-900 rounded-full flex gap-1 overflow-hidden">
                      {[1, 2, 3, 4].map((step) => (
                        <div 
                          key={step} 
                          className={`flex-1 h-full rounded-full transition-all duration-300 ${
                            step <= strengthScore ? strengthColor : 'bg-neutral-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Agree to terms */}
              <div className="space-y-1">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (errors.terms) setErrors(prev => ({ ...prev, terms: undefined }));
                    }}
                    className="rounded border-white/10 bg-neutral-950 text-accent-purple focus:ring-accent-purple focus:ring-offset-neutral-950 h-3.5 w-3.5 mt-0.5 transition-colors"
                  />
                  <span className="text-[11px] text-neutral-400 font-light leading-normal">
                    I agree to the{' '}
                    <a href="#terms" onClick={(e) => e.preventDefault()} className="text-neutral-300 hover:text-white underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-neutral-300 hover:text-white underline">
                      Privacy Policy
                    </a>.
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:from-accent-indigo hover:to-accent-purple transition-all duration-300 active:scale-95 shadow-lg shadow-accent-purple/15 flex items-center justify-center gap-2 border border-white/5 cursor-pointer disabled:opacity-50 mt-4"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Sign Up Free
                    <Sparkles className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Social Logins */}
            <div className="mt-6 space-y-3">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-3 text-[9px] text-neutral-500 font-semibold uppercase tracking-wider">or sign up with</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button 
                  onClick={() => alert("Google Sign Up (Mock)")}
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  Google
                </button>
                <button 
                  onClick={() => alert("GitHub Sign Up (Mock)")}
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  GitHub
                </button>
                <button 
                  onClick={() => alert("LinkedIn Sign Up (Mock)")}
                  className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Login redirection */}
            <div className="text-center mt-6 text-xs text-neutral-500 font-light">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-purple hover:underline font-semibold text-neutral-400 hover:text-white">
                Log In
              </Link>
            </div>

          </GlassCard>
        </div>
      </div>
    </div>
  );
};
