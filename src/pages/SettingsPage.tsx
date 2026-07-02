import React, { useState } from 'react';
import { 
  Lock, 
  Shield, 
  Trash2, 
  Globe, 
  Palette, 
  Link as LinkIcon, 
  CheckCircle2
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { GlassCard } from '../components/GlassCard';

export const SettingsPage: React.FC = () => {
  // Mock states
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState('recruiter');
  const [twoFactor, setTwoFactor] = useState(false);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Connected accounts
  const [connections, setConnections] = useState({
    google: true,
    github: true,
    linkedin: false,
  });

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill out all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    setPasswordSuccess('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(''), 2500);
  };

  const toggleConnection = (key: 'google' | 'github' | 'linkedin') => {
    setConnections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm("WARNING: This will permanently delete your PrepAI account and all mock history. This action is irreversible. Proceed?")) {
      alert("Mock Action: Account deletion request logged.");
    }
  };

  return (
    <DashboardLayout pageTitle="System Preferences">
      <div className="space-y-6 pb-12 max-w-4xl mx-auto text-left">
        
        {/* Banner */}
        <div>
          <h2 className="text-xl font-bold font-display text-white">System Settings</h2>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Manage account attributes, notification thresholds, credentials, and linked accounts.
          </p>
        </div>

        {/* 1. Account Settings & Locale */}
        <GlassCard className="p-6 border-white/5 text-left" hoverGlow={false}>
          <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-5">
            <Globe className="h-5 w-5 text-accent-purple" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Account & Language</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-neutral-300">System Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-lg bg-neutral-900 border border-white/10 focus:border-accent-purple outline-none text-white appearance-none cursor-pointer"
              >
                <option value="en">English (US)</option>
                <option value="es">Español (ES)</option>
                <option value="fr">Français (FR)</option>
                <option value="de">Deutsch (DE)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-neutral-300">Primary Job Path</label>
              <select className="w-full pl-3 pr-8 py-2 rounded-lg bg-neutral-900 border border-white/10 text-white cursor-not-allowed opacity-60" disabled>
                <option>Frontend Engineer Track</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* 2. Theme & Notifications */}
        <GlassCard className="p-6 border-white/5 text-left" hoverGlow={false}>
          <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-5">
            <Palette className="h-5 w-5 text-accent-cyan" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Design & Notifications</h3>
          </div>

          <div className="space-y-6 text-xs">
            {/* Theme selector */}
            <div className="space-y-2">
              <label className="font-semibold text-neutral-300">Interface Theme</label>
              <div className="flex gap-3">
                {['dark', 'light', 'system'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => {
                      if (t === 'dark') setTheme('dark');
                      else alert("Visual Theme locking is active. PrepAI layout is optimized for Dark theme.");
                    }}
                    className={`px-4 py-2 rounded-xl border text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      theme === t && t === 'dark'
                        ? 'bg-accent-purple/10 border-accent-purple text-white' 
                        : 'border-white/5 bg-white/2 text-neutral-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification switches */}
            <div className="space-y-3 pt-2">
              <label className="font-semibold text-neutral-300">Email Reports</label>
              
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="rounded border-white/10 bg-neutral-950 text-accent-purple focus:ring-accent-purple focus:ring-offset-neutral-950 h-4 w-4 transition-all"
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-200">Email Mock Summaries</p>
                    <p className="text-[10px] text-neutral-500 font-light mt-0.5">Receive graded transcript summaries as soon as interviews finish.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none pt-2">
                  <input 
                    type="checkbox" 
                    checked={pushAlerts}
                    onChange={(e) => setPushAlerts(e.target.checked)}
                    className="rounded border-white/10 bg-neutral-950 text-accent-purple focus:ring-accent-purple focus:ring-offset-neutral-950 h-4 w-4 transition-all"
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-200">Weekly Target Reports</p>
                    <p className="text-[10px] text-neutral-500 font-light mt-0.5">Receive cumulative stats, filler word logs, and score summaries weekly.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 3. Privacy & Security */}
        <GlassCard className="p-6 border-white/5 text-left" hoverGlow={false}>
          <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-5">
            <Shield className="h-5 w-5 text-accent-pink" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Privacy & Security</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-neutral-300">Profile Search Visibility</label>
              <select 
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-lg bg-neutral-900 border border-white/10 focus:border-accent-purple outline-none text-white appearance-none cursor-pointer"
              >
                <option value="public">Completely Public</option>
                <option value="recruiter">Partners & Recruiters Only</option>
                <option value="private">Private (Only Me)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-neutral-300">Multi-Factor Authentication (MFA)</label>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/2 border border-white/5">
                <span className="text-[11px] text-neutral-400 font-light">MFA Authentication</span>
                <button 
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    twoFactor ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400' : 'bg-white/5 border border-white/10 text-neutral-400'
                  }`}
                >
                  {twoFactor ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 4. Connected Accounts */}
        <GlassCard className="p-6 border-white/5 text-left" hoverGlow={false}>
          <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-5">
            <LinkIcon className="h-5 w-5 text-yellow-500" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Linked Credentials</h3>
          </div>

          <div className="space-y-3.5 text-xs select-none">
            {/* Google */}
            <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center font-bold text-xs text-neutral-400">
                  G
                </div>
                <div>
                  <p className="font-semibold text-white">Google Accounts</p>
                  <p className="text-[9px] text-neutral-500">Linked to alex.mercer@gmail.com</p>
                </div>
              </div>
              <button 
                onClick={() => toggleConnection('google')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                  connections.google ? 'bg-white/5 border-white/10 text-neutral-400 hover:text-white' : 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple'
                }`}
              >
                {connections.google ? 'Unlink' : 'Link'}
              </button>
            </div>

            {/* GitHub */}
            <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center font-bold text-xs text-neutral-400">
                  GH
                </div>
                <div>
                  <p className="font-semibold text-white">GitHub Profiles</p>
                  <p className="text-[9px] text-neutral-500">Linked to alex-dev</p>
                </div>
              </div>
              <button 
                onClick={() => toggleConnection('github')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                  connections.github ? 'bg-white/5 border-white/10 text-neutral-400 hover:text-white' : 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple'
                }`}
              >
                {connections.github ? 'Unlink' : 'Link'}
              </button>
            </div>

            {/* LinkedIn */}
            <div className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center font-bold text-xs text-neutral-400">
                  IN
                </div>
                <div>
                  <p className="font-semibold text-white">LinkedIn Profiles</p>
                  <p className="text-[9px] text-neutral-500">Link profile to showcase grades</p>
                </div>
              </div>
              <button 
                onClick={() => toggleConnection('linkedin')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                  connections.linkedin ? 'bg-white/5 border-white/10 text-neutral-400 hover:text-white' : 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple'
                }`}
              >
                {connections.linkedin ? 'Unlink' : 'Link'}
              </button>
            </div>
          </div>
        </GlassCard>

        {/* 5. Change Password UI */}
        <GlassCard className="p-6 border-white/5 text-left" hoverGlow={false}>
          <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-5">
            <Lock className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Modify Password Credentials</h3>
          </div>

          {passwordSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {passwordSuccess}
            </div>
          )}

          <form onSubmit={handlePasswordSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">Current Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 focus:border-accent-purple outline-none text-white placeholder:text-neutral-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">New Password</label>
                <input 
                  type="password"
                  placeholder="Min 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 focus:border-accent-purple outline-none text-white placeholder:text-neutral-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-300">Confirm New Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 focus:border-accent-purple outline-none text-white placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:scale-[1.02] transition-all cursor-pointer"
              >
                Save Password Credentials
              </button>
            </div>
          </form>
        </GlassCard>

        {/* 6. Danger Zone (Delete account section) */}
        <GlassCard className="p-6 border-red-500/10 bg-red-500/[0.01] text-left" hoverGlow={false}>
          <div className="flex items-center gap-3 pb-3 border-b border-red-500/10 mb-5">
            <Trash2 className="h-5 w-5 text-red-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Danger Zone</h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-light">
            <div className="space-y-1">
              <p className="font-semibold text-white">Permanently Delete Account</p>
              <p className="text-[10px] text-neutral-500 leading-relaxed">
                Delete your preparation logs, parsed resume metadata, historical waveforms, and AI results. This action is final.
              </p>
            </div>

            <button 
              onClick={handleDeleteAccount}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 transition-all cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </GlassCard>

      </div>
    </DashboardLayout>
  );
};
