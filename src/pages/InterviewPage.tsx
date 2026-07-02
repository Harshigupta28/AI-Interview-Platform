import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Clock, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ChevronRight, 
  LogOut, 
  Sparkles
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const InterviewPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock Interview Questions
  const questions = [
    "Could you introduce yourself and walk me through your most recent engineering project?",
    "Explain the difference between React's Virtual DOM and the standard browser Shadow DOM. When would you use each?",
    "How do you optimize a page's performance if it has heavy rendering components and large analytical tables?",
    "Tell me about a time you had a technical disagreement with a team lead. How did you resolve it?",
    "Do you have any questions for me about the team structure or target expectations?"
  ];

  // States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [webcamActive, setWebcamActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  
  // Transcriptions for each question
  const [transcripts, setTranscripts] = useState<string[]>([
    "Sure! In my last project, I led the core team in constructing a real-time visualization portal. We had to support around 2,000 active WebSocket updates per second. We built it with React, Vite, and custom state machines to minimize reflows...",
    "", "", "", ""
  ]);

  // Simulated transcription generation
  const mockTranscripts = [
    "Virtual DOM is a React-specific representation of the actual DOM, allowing batch diff checks to prevent redundant DOM paints. Shadow DOM, on the other hand, is a web standard designed for encapsulating style scoping inside Web Components...",
    "To optimize rendering bottlenecks, I would first check components reconciliation using theProfiler. Then, introduce virtualization libraries like react-window, memoize complex calculations using useMemo, and debounce query state updates...",
    "In my last role, we were deciding between GraphQL and REST for our mobile clients. The lead preferred REST because of existing routes, but I proposed GraphQL to minimize payload sizes on mobile connections. We ran a mock benchmark, and..."
  ];

  // Stopwatch effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMicToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsRecording(false);
      
      // Auto-simulate typing of transcription for realism
      setTimeout(() => {
        setTranscripts(prev => {
          const next = [...prev];
          next[currentQuestionIndex + 1] = mockTranscripts[currentQuestionIndex] || "Mock Answer Transcript compiled...";
          return next;
        });
      }, 1000);
    }
  };

  const handleEndInterview = () => {
    if (window.confirm("Are you sure you want to end and grade this interview session?")) {
      // Simulate final evaluation loading
      navigate('/result');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg grid-bg text-white flex flex-col justify-between selection:bg-accent-purple/30 selection:text-white relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] radial-glow pointer-events-none opacity-20 rounded-full" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] radial-glow-pink pointer-events-none opacity-10 rounded-full" />

      {/* Immersive Top Bar */}
      <header className="h-16 border-b border-white/5 bg-neutral-950/40 backdrop-blur-md px-6 flex items-center justify-between z-30 relative select-none">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center">
            <Brain className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-display font-bold text-base tracking-tight hidden sm:block">
            Interv<span className="text-accent-purple">AI</span>
          </span>
          <span className="text-neutral-500 text-xs font-semibold px-2 border-l border-white/10 ml-2">
            Stripe Mock Round
          </span>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-6">
          {/* Running Timer */}
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-300 bg-white/3 border border-white/10 px-3 py-1.5 rounded-lg">
            <Clock className="h-3.5 w-3.5 text-accent-cyan" />
            <span>{formatTime(timerSeconds)}</span>
          </div>

          {/* Progress Indicator */}
          <div className="text-xs font-semibold text-neutral-400">
            Progress:{' '}
            <span className="text-white font-bold">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>

          {/* Exit without saving */}
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Abort Mock
          </button>
        </div>
      </header>

      {/* Main Sandbox Workspace */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-20 min-h-0">
        
        {/* Left Side: Split Video Viewports (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* AI Interviewer camera feed mockup */}
          <GlassCard className="flex-1 min-h-[220px] p-0 overflow-hidden relative border-white/5 flex items-center justify-center bg-neutral-950/60" hoverGlow={false}>
            {/* Tag */}
            <div className="absolute top-4 left-4 z-10 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-accent-purple flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping" />
              AI Assessor (Sophia)
            </div>

            {/* Pulsing visual orbits */}
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center relative">
                <Brain className="h-7 w-7 text-accent-purple" />
                <span className="absolute inset-0 rounded-full border border-accent-purple/20 animate-ping opacity-60" />
              </div>
              <p className="text-xs font-semibold text-neutral-300">Listening to your answer...</p>
            </div>

            {/* Volume waveform */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1 justify-center opacity-70">
              {[1, 2, 3, 4, 3, 2, 4, 6, 8, 10, 8, 5, 3, 4, 6, 3, 2, 4, 5, 3, 2, 1].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: isRecording ? h * 2.2 : 3 }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.02, repeatType: "reverse" }}
                  className="w-1 bg-accent-purple rounded-full min-h-[3px]"
                />
              ))}
            </div>
          </GlassCard>

          {/* Candidate Webcam Feed mockup */}
          <GlassCard className="flex-1 min-h-[220px] p-0 overflow-hidden relative border-white/5 flex items-center justify-center bg-neutral-950/60" hoverGlow={false}>
            
            <div className="absolute top-4 left-4 z-10 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${webcamActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              Candidate Feed
            </div>

            {/* Webcam active state */}
            {webcamActive ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center border border-white/10 shadow-lg relative">
                  <span className="text-sm font-bold">AM</span>
                </div>
                <p className="text-xs font-semibold text-white">Alex Mercer</p>
                <p className="text-[10px] text-neutral-500 font-light">Target Track: Software</p>
              </div>
            ) : (
              <div className="text-center text-neutral-500 space-y-1">
                <VideoOff className="h-8 w-8 mx-auto text-neutral-600 mb-2" />
                <p className="text-xs font-semibold">Webcam disabled</p>
              </div>
            )}

            {/* Feed Control Bar */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button 
                onClick={() => setWebcamActive(!webcamActive)}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  webcamActive ? 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10' : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                {webcamActive ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </button>
              
              <button 
                onClick={() => setMicActive(!micActive)}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  micActive ? 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10' : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                {micActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </button>
            </div>
          </GlassCard>

        </div>

        {/* Right Side: Question Card & Transcription feed (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Active Question card */}
          <GlassCard className="p-6 border-white/5 space-y-4 text-left relative overflow-hidden" hoverGlow={false}>
            <div className="absolute top-0 right-0 p-3 bg-accent-purple/15 border-b border-l border-accent-purple/20 rounded-bl-xl text-[10px] font-bold font-mono text-accent-purple tracking-widest uppercase">
              Question card
            </div>

            <span className="text-[10px] font-bold font-mono text-neutral-500 tracking-wider">PROMPT</span>
            
            <h3 className="text-sm font-semibold text-white leading-relaxed">
              "{questions[currentQuestionIndex]}"
            </h3>

            <div className="p-3.5 rounded-xl bg-accent-purple/5 border border-accent-purple/15 flex gap-2">
              <Sparkles className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
              <span className="text-[10px] text-neutral-400 leading-normal">
                AI Assessor tip: Try using structured metrics (STAR framework). Detail exactly what action you performed.
              </span>
            </div>
          </GlassCard>

          {/* Candidate voice transcription container */}
          <GlassCard className="flex-1 p-6 flex flex-col justify-between border-white/5 min-h-[220px]" hoverGlow={false}>
            <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-4">
              <span className="text-[10px] font-bold font-mono text-neutral-400 tracking-wider">Response Transcript</span>
              
              {isRecording && (
                <span className="text-[9px] bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  Recording
                </span>
              )}
            </div>

            {/* Transcript scrollbox */}
            <div className="flex-1 overflow-y-auto pr-2 text-left">
              {transcripts[currentQuestionIndex] ? (
                <p className="text-xs text-neutral-300 italic font-mono leading-relaxed">
                  "{transcripts[currentQuestionIndex]}"
                </p>
              ) : (
                <p className="text-xs text-neutral-600 italic font-mono">
                  {isRecording ? "Listening... start speaking now." : "Click 'Speak Answer' to begin recording response transcript."}
                </p>
              )}
            </div>

            {/* Answer triggers */}
            <div className="mt-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                
                {/* Recording toggle */}
                <button
                  onClick={handleMicToggle}
                  className={`py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isRecording 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/15' 
                      : 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan/15'
                  }`}
                >
                  <Mic className="h-4 w-4" />
                  {isRecording ? "Stop Recording" : "Speak Answer"}
                </button>

                {/* Next prompt trigger */}
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  Next Question
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* End Mock trigger */}
              <button 
                onClick={handleEndInterview}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:from-accent-indigo hover:to-accent-purple shadow-lg shadow-accent-purple/15 flex items-center justify-center gap-2 cursor-pointer border border-white/5"
              >
                Submit Mock for Grading
                <Sparkles className="h-3.5 w-3.5" />
              </button>
            </div>
          </GlassCard>

        </div>

      </main>

      {/* Focused Footer */}
      <footer className="h-10 border-t border-white/5 bg-neutral-950/40 px-6 flex items-center justify-center select-none text-[10px] text-neutral-500">
        © {new Date().getFullYear()} IntervAI. Timed mock sandbox. Data processed locally.
      </footer>
    </div>
  );
};
