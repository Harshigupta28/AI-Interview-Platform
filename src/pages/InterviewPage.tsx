import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Clock, 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  ChevronRight, 
  LogOut, 
  Sparkles
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import api from '../utils/api';

export const InterviewPage: React.FC = () => {
  const navigate = useNavigate();

  // States
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [webcamActive, setWebcamActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulated transcription generation values
  const mockTranscripts = [
    "Virtual DOM is a React-specific representation of the actual DOM, allowing batch diff checks to prevent redundant DOM paints. Shadow DOM, on the other hand, is a web standard designed for encapsulating style scoping inside Web Components...",
    "To optimize rendering bottlenecks, I would first check components reconciliation using the Profiler. Then, introduce virtualization libraries like react-window, memoize complex calculations using useMemo, and debounce query state updates...",
    "In my last role, we were deciding between GraphQL and REST for our mobile clients. The lead preferred REST because of existing routes, but I proposed GraphQL to minimize payload sizes on mobile connections. We ran a mock benchmark, and...",
    "I would ask about the team structure, how you handle sprint planning, and what key milestones are expected of this role in the first 90 days."
  ];

  // Load questions from DB
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data: any = await api.get('/questions');
        let questionsList = data.questions?.map((q: any) => q.text) || [];
        
        if (questionsList.length === 0) {
          // Seed standard questions
          const defaultQuestions = [
            "Could you introduce yourself and walk me through your most recent engineering project?",
            "Explain the difference between React's Virtual DOM and the standard browser Shadow DOM. When would you use each?",
            "How do you optimize a page's performance if it has heavy rendering components and large analytical tables?",
            "Tell me about a time you had a technical disagreement with a team lead. How did you resolve it?",
            "Do you have any questions for me about the team structure or target expectations?"
          ];
          
          questionsList = defaultQuestions;
          setQuestions(defaultQuestions);

          // Seed in background asynchronously
          for (const qText of defaultQuestions) {
            await api.post('/questions', { text: qText, category: 'tech', difficulty: 'medium' });
          }
        } else {
          setQuestions(questionsList);
        }

        // Initialize transcript array matching questions size
        const initialTranscripts = new Array(questionsList.length).fill("");
        initialTranscripts[0] = "Sure! In my last project, I led the core team in constructing a real-time visualization portal. We had to support around 2,000 active WebSocket updates per second. We built it with React, Vite, and custom state machines to minimize reflows...";
        setTranscripts(initialTranscripts);
      } catch (err) {
        console.error('Error fetching interview questions:', err);
        // Fallback static questions
        const fallback = [
          "Could you introduce yourself and walk me through your most recent engineering project?",
          "Explain the difference between React's Virtual DOM and the standard browser Shadow DOM. When would you use each?",
          "How do you optimize a page's performance if it has heavy rendering components and large analytical tables?",
          "Tell me about a time you had technical disagreement with a team lead. How did you resolve it?",
          "Do you have any questions for me about the team structure or target expectations?"
        ];
        setQuestions(fallback);
        const initialTranscripts = new Array(fallback.length).fill("");
        initialTranscripts[0] = "Sure! In my last project, I led the core team in constructing a real-time visualization portal. We had to support around 2,000 active WebSocket updates per second. We built it with React, Vite, and custom state machines to minimize reflows...";
        setTranscripts(initialTranscripts);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

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

  const handleEndInterview = async () => {
    if (window.confirm("Are you sure you want to end and grade this interview session?")) {
      setIsSubmitting(true);
      try {
        // Calculate random realistic performance scores
        const finalScore = Math.floor(Math.random() * 15) + 80; // 80-95
        const resultPayload = {
          jobRole: "Frontend Engineer (React)",
          duration: formatTime(timerSeconds),
          overallScore: finalScore,
          categoriesScore: {
            technical: Math.floor(Math.random() * 15) + 80,
            communication: Math.floor(Math.random() * 15) + 80,
            confidence: Math.floor(Math.random() * 15) + 80,
            structure: Math.floor(Math.random() * 15) + 80
          },
          strengths: [
            "Good articulation of state management principles",
            "Structured use of STAR format in behavioral queries",
            "Identified virtual DOM mechanics correctly"
          ],
          weaknesses: [
            "Slightly rapid speech rate during system scaling explanations",
            "Omission of useLayoutEffect paint details"
          ],
          transcript: questions.map((q, index) => ({
            question: q,
            answer: transcripts[index] || "No vocal response captured.",
            aiFeedback: "The candidate answered clearly but could elaborate on component lifecycle details."
          }))
        };

        const data: any = await api.post("/results", resultPayload);
        navigate(`/result/${data.result._id}`);
      } catch (err: any) {
        alert(err.message || "Failed to submit and grade interview results");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center text-white">
        <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-accent-purple animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg grid-bg text-white flex flex-col justify-between selection:bg-accent-purple/30 selection:text-white relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] radial-glow pointer-events-none opacity-20 rounded-full" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] radial-glow-pink pointer-events-none opacity-10 rounded-full" />

      {/* Immersive Top Bar */}
      <header className="h-16 border-b border-white/5 bg-neutral-950/40 backdrop-blur-md px-6 flex items-center justify-between z-30 relative select-none">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-accent-purple to-accent-indigo flex items-center justify-center">
            <Brain className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-display font-bold text-base tracking-tight">
            Interv<span className="text-accent-purple">AI</span> Mock Room
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 font-mono text-xs font-semibold text-neutral-300">
            <Clock className="h-3.5 w-3.5 text-accent-purple animate-pulse" />
            <span>{formatTime(timerSeconds)}</span>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Quit Room
          </button>
        </div>
      </header>

      {/* Workspace Panel splits */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-20 min-h-0">
        
        {/* Left Side: Assessor Avatar & Candidate Feed (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          
          {/* Assessor Waveform panel */}
          <GlassCard className="flex-1 p-6 border-white/5 relative overflow-hidden flex flex-col justify-center items-center gap-4 bg-neutral-950/20" hoverGlow={false}>
            {/* Sophia Assessor */}
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-accent-purple to-accent-pink p-0.5 animate-pulse-slow">
                <div className="h-full w-full rounded-full bg-neutral-950 flex items-center justify-center text-xl font-bold font-display text-white">
                  S
                </div>
              </div>
              <span className="absolute bottom-0 right-0 h-4.5 w-4.5 rounded-full bg-accent-purple border-2 border-neutral-950 flex items-center justify-center">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </span>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-white uppercase tracking-wider">AI Assessor (Sophia)</p>
              <p className="text-[10px] text-neutral-400 font-light max-w-sm leading-relaxed">
                Listening to responses, evaluating technical correctness, and computing STAR framing structures...
              </p>
            </div>

            {/* Glowing audio wave representation */}
            <div className="flex justify-center items-end gap-1.5 h-10 w-full mt-4 select-none">
              {[0.4, 0.9, 0.3, 0.6, 0.95, 0.7, 0.45, 0.8, 0.3, 0.6, 0.9, 0.4].map((v, i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-full bg-gradient-to-t from-accent-purple to-accent-pink transition-all duration-300 ${
                    isRecording ? 'animate-pulse' : 'opacity-30'
                  }`}
                  style={{ height: `${v * (isRecording ? 100 : 20)}%` }}
                />
              ))}
            </div>
          </GlassCard>

          {/* Candidate camera viewport placeholder */}
          <div className="grid grid-cols-2 gap-4 h-48 sm:h-56">
            {/* Webcam viewport */}
            <GlassCard className="p-4 border-white/5 relative overflow-hidden flex items-center justify-center" hoverGlow={false}>
              {webcamActive ? (
                <div className="h-full w-full rounded-lg bg-white/2 border border-white/5 flex flex-col items-center justify-center gap-2 select-none">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-neutral-950 flex items-center justify-center text-xs font-bold text-neutral-300">AM</div>
                    <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-neutral-950" />
                  </div>
                  <span className="text-[9px] text-neutral-500 tracking-wide uppercase font-semibold">Alex Mercer (You)</span>
                </div>
              ) : (
                <div className="text-neutral-500 text-xs flex flex-col items-center gap-1.5">
                  <VideoOff className="h-5 w-5" />
                  <span>Webcam Off</span>
                </div>
              )}

              {/* Float controls */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                <button 
                  onClick={() => setWebcamActive(!webcamActive)}
                  className={`p-2 rounded-lg border text-white transition-all cursor-pointer ${
                    webcamActive ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                  }`}
                >
                  {webcamActive ? <VideoIcon className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
                </button>
                <button 
                  onClick={() => setMicActive(!micActive)}
                  className={`p-2 rounded-lg border text-white transition-all cursor-pointer ${
                    micActive ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                  }`}
                >
                  {micActive ? <Mic className="h-3.5 w-3.5" /> : <MicOff className="h-3.5 w-3.5" />}
                </button>
              </div>
            </GlassCard>

            {/* AI suggest panel */}
            <GlassCard className="p-4 border-white/5 flex flex-col justify-between text-left" hoverGlow={false}>
              <div>
                <span className="text-[9px] font-bold text-accent-purple uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Sophia Tip
                </span>
                <p className="text-[10px] text-neutral-400 font-light leading-relaxed mt-2">
                  "Maintain standard focus on the camera. Speak steadily, and try to structuring response fields using the STAR (Situation, Task, Action, Result) model framework."
                </p>
              </div>
              <span className="text-[9px] text-neutral-600 font-mono">Real-time assessor analysis active</span>
            </GlassCard>
          </div>

        </div>

        {/* Right Side: Questions & Transcript logs (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          
          {/* Question layout */}
          <GlassCard className="p-6 border-white/5 text-left flex flex-col justify-between" hoverGlow={false}>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-[9px] font-bold text-accent-purple uppercase tracking-widest font-mono">Active Question</span>
                <span className="text-[9px] text-neutral-400 font-semibold font-mono">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white leading-normal">
                {questions[currentQuestionIndex]}
              </h3>
            </div>

            <div className="flex justify-end pt-4">
              {currentQuestionIndex < questions.length - 1 ? (
                <button 
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                >
                  Next Question
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button 
                  onClick={handleEndInterview}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Evaluating...' : 'Submit & Grade Mock'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </GlassCard>

          {/* Transcript logs */}
          <GlassCard className="flex-1 p-6 border-white/5 text-left flex flex-col min-h-0 bg-neutral-950/20" hoverGlow={false}>
            <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-4">
              <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Voice Transcription Log</span>
              <button 
                onClick={handleMicToggle}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  isRecording 
                    ? 'bg-accent-purple/10 border-accent-purple text-white animate-pulse' 
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {isRecording ? <Mic className="h-2.5 w-2.5 animate-bounce" /> : <MicOff className="h-2.5 w-2.5" />}
                {isRecording ? 'Listening' : 'Talk'}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-48 lg:max-h-none text-[11px] font-light text-neutral-400 leading-relaxed font-mono space-y-4 pr-1 scrollbar-thin">
              {transcripts[currentQuestionIndex] ? (
                <p className="text-neutral-300">{transcripts[currentQuestionIndex]}</p>
              ) : (
                <p className="text-neutral-600 italic">No audio feed input. Toggle microphone to record response or wait for simulated text transcription stream...</p>
              )}
            </div>
          </GlassCard>

        </div>

      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-white/5 bg-neutral-950/20 flex items-center justify-center relative z-20 select-none">
        <span className="text-[9px] text-neutral-600 uppercase tracking-wider">IntervAI Immersive Sandbox v1.0 • Secure HTTPS Pipeline</span>
      </footer>

    </div>
  );
};
