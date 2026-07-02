import React from 'react';
import { 
  Award, 
  FileText, 
  Calendar, 
  Zap, 
  Terminal, 
  Sparkles,
  User,
  Mail,
  Briefcase,
  Compass
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { GlassCard } from '../components/GlassCard';

export const ProfilePage: React.FC = () => {
  // Mock XP
  const xp = 14250;
  const nextLevelXp = 15000;
  const level = 14;
  const xpProgress = (xp / nextLevelXp) * 100;

  // Badges
  const badges = [
    { name: 'STAR Architect', desc: 'Formulated 5+ STAR behaviors', icon: <Award className="h-5 w-5 text-accent-purple" /> },
    { name: 'Pacing Master', desc: 'Maintained WPM for 3 sessions', icon: <Zap className="h-5 w-5 text-accent-cyan" /> },
    { name: 'IDE Expert', desc: 'Passed 3 technical modules', icon: <Terminal className="h-5 w-5 text-accent-pink" /> },
    { name: 'Filler Slayer', desc: 'Filler word counts under 1.5/min', icon: <Sparkles className="h-5 w-5 text-yellow-500" /> },
  ];

  // Activities
  const activities = [
    { id: '1', type: 'mock', text: 'Completed Stripe Mock (Frontend) - Score: 88%', date: 'Today, 2:15 PM' },
    { id: '2', type: 'resume', text: 'Uploaded and parsed resume alex_mercer_v2.pdf', date: 'Jun 29, 2026' },
    { id: '3', type: 'mock', text: 'Completed Netflix Mock (Systems Design) - Score: 79%', date: 'Jun 29, 2026' },
    { id: '4', type: 'mock', text: 'Completed Google Mock (Behavioral) - Score: 85%', date: 'Jun 25, 2026' },
  ];

  return (
    <DashboardLayout pageTitle="Student Profile">
      <div className="space-y-8 pb-12 max-w-7xl mx-auto text-left">
        
        {/* Profile Card & XP Leveler (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Avatar card (col-span-7) */}
          <GlassCard className="lg:col-span-7 p-6 flex flex-col sm:flex-row gap-6 items-center border-white/5" hoverGlow={false}>
            {/* Avatar Ring */}
            <div className="relative shrink-0">
              <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-accent-purple via-accent-indigo to-accent-cyan p-1 shadow-2xl">
                <div className="h-full w-full rounded-full bg-neutral-950 flex items-center justify-center font-bold text-3xl font-display text-white">
                  AM
                </div>
              </div>
              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-neutral-950" />
            </div>

            {/* Profile info */}
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <h3 className="text-xl font-bold font-display text-white flex items-center justify-center sm:justify-start gap-2">
                  Alex Mercer
                  <span className="text-[10px] bg-accent-purple/10 border border-accent-purple/20 text-accent-purple px-2 py-0.5 rounded font-semibold uppercase tracking-wider">Level {level}</span>
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1">Frontend Engineer Pathway • Stripe Target</p>
              </div>

              {/* XP progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-semibold">
                  <span className="text-neutral-500 uppercase tracking-widest">Experience Points</span>
                  <span className="text-neutral-300 font-mono">{xp} / {nextLevelXp} XP</span>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent-purple to-accent-indigo rounded-full" style={{ width: `${xpProgress}%` }} />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Practice stats scorecard (col-span-5) */}
          <GlassCard className="lg:col-span-5 p-6 border-white/5 flex flex-col justify-between" hoverGlow={false}>
            <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase tracking-wider">Preparation Statistics</span>

            <div className="grid grid-cols-3 gap-2 py-4">
              <div className="text-center">
                <p className="text-2xl font-bold font-display text-white">12</p>
                <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold mt-1">Total Mocks</p>
              </div>
              <div className="text-center border-x border-white/5 px-2">
                <p className="text-2xl font-bold font-display text-accent-purple">84%</p>
                <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold mt-1">Avg Grade</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold font-display text-accent-cyan">8.4h</p>
                <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold mt-1">Time Spent</p>
              </div>
            </div>

            <button 
              onClick={() => alert("Mock Action: Profile Edit triggered.")}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              Edit Profile details
            </button>
          </GlassCard>

        </div>

        {/* Competency profile & target jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Bio info fields & Badges (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* General Info */}
            <GlassCard className="p-6 border-white/5 text-left" hoverGlow={false}>
              <h3 className="text-sm font-semibold text-white pb-3 border-b border-white/5 mb-4 uppercase tracking-wider">Candidate Parameters</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                
                <div className="space-y-1">
                  <span className="text-neutral-500 font-semibold flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Full Name</span>
                  <p className="text-neutral-300 font-medium">Alex Mercer</p>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 font-semibold flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email Address</span>
                  <p className="text-neutral-300 font-medium">alex.mercer@gmail.com</p>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 font-semibold flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> Target Job Track</span>
                  <p className="text-neutral-300 font-medium">Senior Frontend Engineer</p>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 font-semibold flex items-center gap-1.5"><Compass className="h-3.5 w-3.5" /> Target Organization</span>
                  <p className="text-neutral-300 font-medium">Stripe / Vercel</p>
                </div>
              </div>
            </GlassCard>

            {/* Achievement Badges */}
            <GlassCard className="p-6 border-white/5 text-left" hoverGlow={false}>
              <h3 className="text-sm font-semibold text-white pb-3 border-b border-white/5 mb-4 uppercase tracking-wider">Earned Accreditations</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {badges.map((b) => (
                  <div key={b.name} className="p-3.5 rounded-xl border border-white/5 bg-white/2 flex gap-3 items-center hover:border-white/10 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
                      {b.icon}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-white">{b.name}</p>
                      <p className="text-[10px] text-neutral-500 font-light leading-normal">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>

          {/* Right: Resume file & Activity logs (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Resume file Details */}
            <GlassCard className="p-6 border-white/5 text-left" hoverGlow={false}>
              <h3 className="text-sm font-semibold text-white pb-3 border-b border-white/5 mb-4 uppercase tracking-wider">Uploaded Resume</h3>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-accent-purple shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">alex_mercer_resume_v2.pdf</p>
                  <p className="text-[9px] text-neutral-500">Parsed Jun 29, 2026 • 142 KB size</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Matched</span>
              </div>
            </GlassCard>

            {/* Activity log timeline */}
            <GlassCard className="p-6 border-white/5 text-left animate-pulse-once" hoverGlow={false}>
              <h3 className="text-sm font-semibold text-white pb-3 border-b border-white/5 mb-4 uppercase tracking-wider">Practice Timelines</h3>
              
              <div className="space-y-5 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
                {activities.map((act) => (
                  <div key={act.id} className="relative space-y-1">
                    {/* Circle marker */}
                    <div className="absolute -left-[16px] top-1 h-2 w-2 rounded-full bg-accent-purple border border-neutral-950" />
                    
                    <p className="text-xs font-semibold text-neutral-200">{act.text}</p>
                    
                    <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-light">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {act.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
