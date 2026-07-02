import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  Play, 
  Check, 
  BarChart2, 
  Brain, 
  Mic, 
  FileText, 
  ChevronRight, 
  Award, 
  BookOpen,
  Camera,
  TrendingUp,
  Users,
  User,
  ThumbsUp,
  Smile
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tech' | 'behavioral' | 'system'>('tech');
  
  // Quick Mockup speech simulation state
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [fillerWords, setFillerWords] = useState(2);

  const toggleSpeechSimulation = () => {
    setIsPlayingSpeech(!isPlayingSpeech);
    if (!isPlayingSpeech) {
      const interval = setInterval(() => {
        setFillerWords(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      }, 2000);
      return () => clearInterval(interval);
    }
  };


  return (
    <div className="relative min-h-screen bg-dark-bg grid-bg selection:bg-accent-purple/30 selection:text-white">
      {/* Radial Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] radial-glow pointer-events-none opacity-60 rounded-full" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] radial-glow-pink pointer-events-none opacity-40 rounded-full" />
      <div className="absolute bottom-[200px] left-1/3 w-[500px] h-[500px] radial-glow-cyan pointer-events-none opacity-30 rounded-full" />

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-dark-bg/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center shadow-lg shadow-accent-purple/20">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Interv<span className="text-accent-purple">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400 font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#demo" className="hover:text-white transition-colors">Dashboard Preview</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="relative group px-4 py-2 rounded-xl text-xs font-semibold overflow-hidden transition-all bg-white text-black hover:scale-[1.02]">
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-neutral-200 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-28 px-6 overflow-hidden max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtext, CTAs, Statistics */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/20 bg-accent-purple/5 text-xs font-medium text-accent-purple mb-6 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Next-Gen AI Interviewing v2.0 is live</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-white mb-6"
            >
              Master your next interview. <br />
              <span className="text-gradient-purple">Powered by AI.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-400 text-base md:text-lg font-light mb-8 leading-relaxed max-w-xl"
            >
              Practice realistic behavioral & coding sessions tailored to your target job description. Receive real-time vocal feedback, sentiment analysis, and scoreboards to unlock top tech offers.
            </motion.p>

            {/* Call-to-Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-12 z-10 w-full sm:w-auto"
            >
              <Link to="/register" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:from-accent-indigo hover:to-accent-purple shadow-xl shadow-accent-purple/20 transition-all hover:scale-[1.03] active:scale-95 group">
                Start Practice Session
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#demo" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-neutral-300 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all">
                <Play className="h-4 w-4 text-accent-purple fill-accent-purple/20" />
                Watch Demo Setup
              </a>
            </motion.div>

            {/* Premium Statistics Cards Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-4 w-full border-t border-white/5 pt-8"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-500">
                  <Users className="h-3.5 w-3.5 text-accent-purple" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Candidates</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white">50K+</h4>
                <p className="text-[10px] text-neutral-400 font-light">Prepped successfully</p>
              </div>

              <div className="space-y-1 border-x border-white/5 px-4">
                <div className="flex items-center gap-1.5 text-neutral-500">
                  <TrendingUp className="h-3.5 w-3.5 text-accent-cyan" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Success</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white">94%</h4>
                <p className="text-[10px] text-neutral-400 font-light">Offers within 60 days</p>
              </div>

              <div className="space-y-1 pl-4">
                <div className="flex items-center gap-1.5 text-neutral-500">
                  <ThumbsUp className="h-3.5 w-3.5 text-accent-pink" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Satisfaction</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white">4.9/5</h4>
                <p className="text-[10px] text-neutral-400 font-light">Rating by engineers</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Premium Dashboard Mockup with Floating AI Cards */}
          <div className="lg:col-span-6 relative mt-10 lg:mt-0 flex justify-center">
            
            {/* Background radial glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 to-accent-cyan/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Main Mockup Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg rounded-2xl overflow-hidden border border-white/10 bg-dark-card shadow-2xl relative z-10"
            >
              {/* Browser bar */}
              <div className="h-9 border-b border-white/5 bg-white/2 flex items-center px-4 justify-between select-none">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  intervai.co/session-mock
                </div>
                <div className="w-8" />
              </div>

              {/* Inside Mockup UI */}
              <div className="p-5 space-y-4">
                {/* Visual Candidate Feed */}
                <div className="relative aspect-video rounded-xl bg-neutral-950 overflow-hidden border border-white/5 flex items-center justify-center">
                  
                  {/* Subtle video icon */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-accent-cyan flex items-center gap-1">
                    <Camera className="h-2.5 w-2.5" />
                    LIVE CAMERA
                  </div>

                  {/* Dummy Candidate Profile */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 flex items-center justify-center border border-white/10 shadow-lg relative">
                      <User className="h-7 w-7 text-neutral-400" />
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-neutral-950" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Alex Mercer</p>
                      <p className="text-[9px] text-neutral-500">Practice Candidate</p>
                    </div>
                  </div>

                  {/* Waves visualization */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1 justify-center">
                    {[2, 3, 5, 8, 4, 3, 6, 8, 10, 6, 4, 7, 5, 3, 4, 6, 3, 2, 4, 6, 8, 4, 2].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: isPlayingSpeech ? h * 2 : 3 }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.02, repeatType: "reverse" }}
                        className="w-1 bg-accent-cyan rounded-full min-h-[3px]"
                      />
                    ))}
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/2 border border-white/5 text-left">
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">Speech Pace</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-bold text-white">138</span>
                      <span className="text-[9px] text-neutral-400">WPM</span>
                    </div>
                    <div className="w-full h-1 bg-neutral-900 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-accent-cyan rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/2 border border-white/5 text-left">
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">Technical Score</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-bold text-accent-purple">88%</span>
                    </div>
                    <div className="w-full h-1 bg-neutral-900 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-accent-purple rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                </div>

                {/* Simulated Waveform Trigger */}
                <button
                  onClick={toggleSpeechSimulation}
                  className="w-full py-2.5 rounded-xl border border-accent-purple/20 bg-accent-purple/5 hover:bg-accent-purple/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Mic className="h-3.5 w-3.5 text-accent-purple" />
                  {isPlayingSpeech ? "Pause Speech Input" : "Click to Simulate Live Speech"}
                </button>
              </div>
            </motion.div>

            {/* Floating AI Cards */}
            {/* Card 1: AI Coach Alert (Floats top-left) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-6 -left-10 z-20 w-52 p-3 rounded-xl glass-panel border-accent-purple/30 shadow-xl text-left hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded bg-accent-purple/10 border border-accent-purple/20">
                  <Brain className="h-3.5 w-3.5 text-accent-purple" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-purple">AI Feedback</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed font-light">
                Use the **STAR** method here to frame the composite index scaling impact.
              </p>
            </motion.div>

            {/* Card 2: Live Sentiment Detector (Floats mid-right) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-8 z-20 w-48 p-3 rounded-xl glass-panel border-accent-cyan/30 shadow-xl text-left hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded bg-accent-cyan/10 border border-accent-cyan/20">
                  <Smile className="h-3.5 w-3.5 text-accent-cyan" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-cyan">Sentiment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Highly Confident</span>
                <span className="text-xs text-neutral-400">😊 (89%)</span>
              </div>
            </motion.div>

            {/* Card 3: Filler Word Track (Floats bottom-left) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.2 }}
              className="absolute -bottom-4 -left-6 z-20 w-44 p-3 rounded-xl glass-panel border-white/10 shadow-xl text-left hidden sm:block"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] text-neutral-500 font-semibold uppercase tracking-wider">Filler words</span>
                <span className="text-[10px] text-red-400 font-bold bg-red-500/10 px-1 rounded">UM / AH</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <p className="text-[11px] text-neutral-300">Total detected:</p>
                <p className="text-sm font-bold text-white">{fillerWords}</p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Trust Logos (A beautiful dark-themed grid of companies) */}
      <section className="border-y border-white/5 py-10 bg-neutral-950/40 relative z-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-500 shrink-0 select-none text-center md:text-left">
            PREPARATION CHANNELS ACCREDITED BY GRADUATES AT:
          </p>
          <div className="w-full flex items-center justify-around gap-6 opacity-60">
            {['Google', 'Stripe', 'Vercel', 'Meta', 'Netflix', 'Microsoft'].map((brand, i) => (
              <span 
                key={i} 
                className="font-display font-bold text-sm sm:text-base md:text-lg text-neutral-400 tracking-wider hover:text-white hover:opacity-100 transition-all cursor-default select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="features">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Everything you need to <span className="text-gradient-purple">crush the loop.</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed">
            Unlike static lists, our intelligent platform uses real-time adaptive feedback structures to simulate full-funnel HR and Engineering rounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Technical Sandbox */}
          <GlassCard className="flex flex-col justify-between h-[280px]">
            <div>
              <div className="h-10 w-10 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mb-5">
                <Terminal className="h-5 w-5 text-accent-purple" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Technical Coding Sandbox</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Code inside a full-featured browser IDE. The AI reviews algorithms, time complexity, and offers system design advice as you speak.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-accent-purple font-semibold mt-4">
              Explore Live IDE <ChevronRight className="h-3 w-3" />
            </div>
          </GlassCard>

          {/* Card 2: Sentiment & Vocal Coaching */}
          <GlassCard className="flex flex-col justify-between h-[280px]">
            <div>
              <div className="h-10 w-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-5">
                <Mic className="h-5 w-5 text-accent-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Vocal Tone & Clarity Analysis</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Detects word filler frequencies, pitch shifts, pacing metrics, and vocal confidence to elevate communication structure.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-accent-cyan font-semibold mt-4">
              View speech metrics <ChevronRight className="h-3 w-3" />
            </div>
          </GlassCard>

          {/* Card 3: Deep Behavioral (STAR) Coach */}
          <GlassCard className="flex flex-col justify-between h-[280px]">
            <div>
              <div className="h-10 w-10 rounded-xl bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center mb-5">
                <Brain className="h-5 w-5 text-accent-pink" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Behavioral STAR Framework</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Evaluates situational responses against core competencies. Guarantees responses map perfectly to Situation, Task, Action, and Result.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-accent-pink font-semibold mt-4">
              Learn STAR metrics <ChevronRight className="h-3 w-3" />
            </div>
          </GlassCard>

          {/* Card 4: Resume Tailoring */}
          <GlassCard className="flex flex-col justify-between h-[280px]">
            <div>
              <div className="h-10 w-10 rounded-xl bg-neutral-800 border border-white/10 flex items-center justify-center mb-5">
                <FileText className="h-5 w-5 text-neutral-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Resume-to-Job Parsing</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Upload your resume alongside target job specs to auto-generate personalized prompts targeting your professional background.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-semibold mt-4">
              Upload Resume <ChevronRight className="h-3 w-3" />
            </div>
          </GlassCard>

          {/* Card 5: Real-time Analytics */}
          <GlassCard className="flex flex-col justify-between h-[280px]">
            <div>
              <div className="h-10 w-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-5">
                <BarChart2 className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Detailed Score Analytics</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Unlock actionable dashboards displaying performance trends across specific mock modules and peer ranking stats.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-semibold mt-4">
              Explore Dashboards <ChevronRight className="h-3 w-3" />
            </div>
          </GlassCard>

          {/* Card 6: Multi-Domain Mock Rounds */}
          <GlassCard className="flex flex-col justify-between h-[280px]">
            <div>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                <Award className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Predefined Job Pathways</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Access custom-tailored interview libraries for Software Engineers, Product Managers, Data Scientists, and Consultants.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold mt-4">
              Select career track <ChevronRight className="h-3 w-3" />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Interactive Mock Setup Preview Section */}
      <section className="py-24 px-6 bg-neutral-950/30 border-y border-white/5" id="demo">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">Platform Preview</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2 mb-6">
                Practice in realistic setups tailored for you.
              </h2>
              <p className="text-neutral-400 text-sm md:text-base font-light mb-8 leading-relaxed">
                Toggle through mock session modes. Experience customized prompts dynamically tailored to your skill requirements.
              </p>

              {/* Mode Selectors */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setActiveTab('tech')}
                  className={`p-4 rounded-xl text-left border transition-all flex items-center gap-3 ${activeTab === 'tech' ? 'border-accent-purple/40 bg-accent-purple/5 text-white' : 'border-white/5 bg-transparent text-neutral-400 hover:border-white/10 hover:text-white'}`}
                >
                  <Terminal className={`h-5 w-5 ${activeTab === 'tech' ? 'text-accent-purple' : 'text-neutral-400'}`} />
                  <div>
                    <p className="text-xs font-semibold">Frontend & Backend Coding Rounds</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Speak aloud, run tests, and refactor code side-by-side with AI review.</p>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveTab('behavioral')}
                  className={`p-4 rounded-xl text-left border transition-all flex items-center gap-3 ${activeTab === 'behavioral' ? 'border-accent-cyan/40 bg-accent-cyan/5 text-white' : 'border-white/5 bg-transparent text-neutral-400 hover:border-white/10 hover:text-white'}`}
                >
                  <Brain className={`h-5 w-5 ${activeTab === 'behavioral' ? 'text-accent-cyan' : 'text-neutral-400'}`} />
                  <div>
                    <p className="text-xs font-semibold">Leadership & Core Values Rounds</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Evaluate situation framing and STAR structure indicators.</p>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveTab('system')}
                  className={`p-4 rounded-xl text-left border transition-all flex items-center gap-3 ${activeTab === 'system' ? 'border-accent-pink/40 bg-accent-pink/5 text-white' : 'border-white/5 bg-transparent text-neutral-400 hover:border-white/10 hover:text-white'}`}
                >
                  <BookOpen className={`h-5 w-5 ${activeTab === 'system' ? 'text-accent-pink' : 'text-neutral-400'}`} />
                  <div>
                    <p className="text-xs font-semibold">System Design & Architecture Rounds</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Diagram architectures, design APIs, and optimize latency models.</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Mode Preview Display Screen */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-dark-card p-6 shadow-2xl relative min-h-[380px] flex flex-col justify-between text-left"
                >
                  {activeTab === 'tech' && (
                    <>
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-accent-purple" />
                          <span className="text-xs font-bold font-mono text-neutral-200">Session ID: coding-react-v1</span>
                        </div>
                        <span className="text-[10px] bg-accent-purple/10 border border-accent-purple/20 text-accent-purple px-2 py-0.5 rounded font-semibold uppercase">React & JS</span>
                      </div>
                      <div className="py-6 space-y-4">
                        <p className="text-xs font-bold text-neutral-400 font-mono">Q1: Implement a custom React hook `useDebounce` that delays executing state mutations.</p>
                        <div className="rounded-lg bg-neutral-950 p-4 border border-white/5 font-mono text-xs text-neutral-300 overflow-x-auto">
                          <span className="text-accent-indigo">function</span> <span className="text-accent-cyan">useDebounce</span>&lt;T&gt;(value: T, delay: <span className="text-yellow-400">number</span>): T &#123; <br />
                          &nbsp;&nbsp;<span className="text-accent-indigo">const</span> [debouncedValue, setDebouncedValue] = <span className="text-accent-purple">useState</span>(value);<br />
                          &nbsp;&nbsp;<span className="text-accent-purple">useEffect</span>(() =&gt; &#123;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent-indigo">const</span> handler = <span className="text-accent-cyan">setTimeout</span>(() =&gt; &#123;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent-cyan">setDebouncedValue</span>(value);<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&#125;, delay);<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent-indigo">return</span> () =&gt; <span className="text-accent-cyan">clearTimeout</span>(handler);<br />
                          &nbsp;&nbsp;&#125;, [value, delay]);<br />
                          &nbsp;&nbsp;<span className="text-accent-indigo">return</span> debouncedValue;<br />
                          &#125;
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-accent-purple/5 border border-accent-purple/20 flex gap-2">
                        <Sparkles className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-accent-purple">AI Assessment</p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">Code execution: PASS. Memory cleanups handled successfully on effect unmount. Big O complexity: O(1).</p>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'behavioral' && (
                    <>
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-accent-cyan" />
                          <span className="text-xs font-bold font-mono text-neutral-200">Session ID: leadership-values</span>
                        </div>
                        <span className="text-[10px] bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan px-2 py-0.5 rounded font-semibold uppercase">Amazon Leadership</span>
                      </div>
                      <div className="py-6 space-y-4">
                        <p className="text-xs font-bold text-neutral-400 font-mono">Q1: Tell me about a time you had to make a quick decision without complete project specs.</p>
                        <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 font-mono text-xs text-neutral-400 italic">
                          "At my last startup, our customer portal had a scaling crash. Without full logs, I made a judgment call to reroute analytical queries to a secondary read replica to lower load. This immediately fixed latency..."
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20 flex gap-2">
                        <Check className="h-4 w-4 text-accent-cyan shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-accent-cyan">STAR Analysis Breakdown</p>
                          <div className="grid grid-cols-4 gap-2 mt-1.5 text-center">
                            <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-1 rounded font-bold">S: COMPLETE</span>
                            <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-1 rounded font-bold">T: COMPLETE</span>
                            <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-1 rounded font-bold">A: COMPLETE</span>
                            <span className="text-[9px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 py-1 rounded font-bold">R: WEAK IMPACT</span>
                          </div>
                          <p className="text-[10px] text-neutral-400 mt-2 leading-relaxed">
                            Good structure. However, specify *quantified impact* in your Result. (e.g. "reduced latency by 45%").
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'system' && (
                    <>
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-accent-pink" />
                          <span className="text-xs font-bold font-mono text-neutral-200">Session ID: system-architecture</span>
                        </div>
                        <span className="text-[10px] bg-accent-pink/10 border border-accent-pink/20 text-accent-pink px-2 py-0.5 rounded font-semibold uppercase">System Design</span>
                      </div>
                      <div className="py-6 space-y-4">
                        <p className="text-xs font-bold text-neutral-400 font-mono">Q1: Design a global real-time notifications engine for millions of active concurrent users.</p>
                        <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 flex flex-col gap-2 font-mono text-xs">
                          <div className="flex items-center gap-2 text-neutral-400">
                            <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300">Client</span>
                            <span className="text-neutral-500">──► WebSocket Conn ──►</span>
                            <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-accent-pink">Load Balancer</span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-400">
                            <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-accent-pink">Push Service</span>
                            <span className="text-neutral-500">◄── Redis Pub/Sub ───</span>
                            <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300">Message Queue</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-accent-pink/5 border border-accent-pink/20 flex gap-2">
                        <Sparkles className="h-4 w-4 text-accent-pink shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-accent-pink">System Recommendation</p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">Ensure you address Redis Pub/Sub message dropping issues if network partitions happen by introducing a persistent Kafka offset backup.</p>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Process Section (How It Works) */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="how-it-works">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">The Workflow</span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mt-2 mb-4">
            Four simple steps to success.
          </h2>
          <p className="text-neutral-400 text-base md:text-lg font-light">
            Here's exactly how IntervAI adapts to your career needs and helps you stand out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector line (Desktop only) */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-accent-purple/20 via-accent-cyan/20 to-accent-pink/20 z-0" />
          
          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-sm font-bold font-mono text-accent-purple shadow-xl mb-6 bg-radial-glow">
              01
            </div>
            <h4 className="text-base font-semibold text-white mb-2">Select Target Job</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-[200px]">
              Upload job description rules or link target corporate profiles.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-sm font-bold font-mono text-accent-cyan shadow-xl mb-6 bg-radial-glow-cyan">
              02
            </div>
            <h4 className="text-base font-semibold text-white mb-2">Upload Resume</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-[200px]">
              AI parses your actual experience to draft questions you will likely face.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-sm font-bold font-mono text-accent-pink shadow-xl mb-6 bg-radial-glow-pink">
              03
            </div>
            <h4 className="text-base font-semibold text-white mb-2">Conduct Mock</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-[200px]">
              Speak, draw diagrams, and write code under timed simulated pressure.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-sm font-bold font-mono text-yellow-500 shadow-xl mb-6">
              04
            </div>
            <h4 className="text-base font-semibold text-white mb-2">Review AI Feedback</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-[200px]">
              Get detailed analysis logs highlighting strengths, typos, and metrics.
            </p>
          </div>
        </div>
      </section>

      {/* High-Impact Bottom CTA Banner */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-12 md:p-20 text-center relative overflow-hidden glass-panel"
        >
          {/* Internal Glow overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] radial-glow pointer-events-none opacity-40 rounded-full" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-accent-purple/10 border border-accent-purple/35 flex items-center justify-center mb-6">
              <Award className="h-6 w-6 text-accent-purple animate-pulse" />
            </div>
            
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight mb-6">
              Stop guessing. Start dominating.
            </h2>
            
            <p className="text-neutral-400 text-base font-light mb-10 leading-relaxed">
              Join over 50,000+ engineers, product owners, and financial professionals who prepped with IntervAI to secure their target career offers.
            </p>
            
            <Link 
              to="/register" 
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:from-accent-indigo hover:to-accent-purple shadow-xl shadow-accent-purple/20 transition-all hover:scale-[1.03]"
            >
              Get Started Free Today
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-neutral-950/40 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center">
              <Brain className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              Interv<span className="text-accent-purple">AI</span>
            </span>
          </div>

          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} IntervAI. All rights reserved. Platform mockup for demonstration purposes only.
          </p>

          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
