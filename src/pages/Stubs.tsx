import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, Lock, Sparkles, LayoutDashboard, FileUp, Video, BarChart3, User, Settings as SettingsIcon } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface StubProps {
  title: string;
  icon: React.ReactNode;
  stepNumber: number;
}

const BaseStub: React.FC<StubProps> = ({ title, icon, stepNumber }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#030303] grid-bg flex flex-col justify-between p-6 text-white selection:bg-accent-purple/30 selection:text-white">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] radial-glow pointer-events-none opacity-45 rounded-full" />
      
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between h-16 relative z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Interv<span className="text-accent-purple">AI</span></span>
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/15 transition-all text-neutral-300 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center max-w-lg mx-auto w-full relative z-10 py-12">
        <GlassCard className="w-full text-center space-y-6 border-white/10 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 bg-accent-purple/10 border-b border-l border-accent-purple/20 rounded-bl-xl text-[10px] font-mono text-accent-purple font-semibold">
            PHASE {stepNumber}
          </div>

          <div className="h-16 w-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-accent-purple shadow-xl">
            {icon}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-display font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              This screen is designed and ready for the implementation phase. Awaiting user approval to generate.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-accent-purple/5 border border-accent-purple/10 text-xs text-neutral-400 font-mono flex items-center gap-2 justify-center">
            <Sparkles className="h-4 w-4 text-accent-purple shrink-0" />
            <span>Awaiting Next Phase Generation Trigger</span>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:from-accent-indigo hover:to-accent-purple transition-all duration-300"
          >
            Explore Landing Page
          </button>
        </GlassCard>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-neutral-500 py-6 border-t border-white/5 relative z-10">
        © {new Date().getFullYear()} IntervAI. All rights reserved. Platform mock for demonstration purposes only.
      </div>
    </div>
  );
};

export const LoginStub = () => <BaseStub title="Login Page" icon={<Lock className="h-7 w-7" />} stepNumber={2} />;
export const RegisterStub = () => <BaseStub title="Registration Page" icon={<Sparkles className="h-7 w-7" />} stepNumber={3} />;
export const DashboardStub = () => <BaseStub title="Student Dashboard" icon={<LayoutDashboard className="h-7 w-7" />} stepNumber={4} />;
export const ResumeUploadStub = () => <BaseStub title="Resume Upload Portal" icon={<FileUp className="h-7 w-7" />} stepNumber={5} />;
export const InterviewStub = () => <BaseStub title="AI Mock Interview Screen" icon={<Video className="h-7 w-7" />} stepNumber={6} />;
export const ResultStub = () => <BaseStub title="AI Session Feedback Scorecard" icon={<Sparkles className="h-7 w-7" />} stepNumber={7} />;
export const AnalyticsStub = () => <BaseStub title="Analytics Dashboard" icon={<BarChart3 className="h-7 w-7" />} stepNumber={8} />;
export const ProfileStub = () => <BaseStub title="Student Profile Settings" icon={<User className="h-7 w-7" />} stepNumber={9} />;
export const SettingsStub = () => <BaseStub title="System Preferences" icon={<SettingsIcon className="h-7 w-7" />} stepNumber={10} />;
