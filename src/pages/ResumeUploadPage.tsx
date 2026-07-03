import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileUp, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { GlassCard } from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export const ResumeUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'parsed'>('idle');
  const [parseProgress, setParseProgress] = useState(0);
  const [parseLog, setParseLog] = useState('');

  // Simulated drop/drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const { setUserResume } = useAuth();

  const processFile = async (selectedFile: File) => {
    // Validate type (mock PDF/DOCX)
    if (!selectedFile.name.endsWith('.pdf') && !selectedFile.name.endsWith('.docx')) {
      alert('Unsupported file format. Please upload a PDF or DOCX file.');
      return;
    }

    setFile(selectedFile);
    setUploadState('uploading');
    setParseProgress(0);
    setParseLog('Initializing parser...');

    // Trigger upload
    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const data: any = await api.post("/users/resume", formData);
      setUserResume(data.resumeUrl);

      // Simulate Parsing Pipeline steps visually
      const logs = [
        'Extracting text streams...',
        'Categorizing programming elements...',
        'Matching resume parameters to standard engineering frameworks...',
        'Running AI comparative audits...',
        'Parsing complete.'
      ];

      let currentLogIndex = 0;
      const interval = setInterval(() => {
        setParseProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploadState('parsed');
            return 100;
          }
          
          if (prev % 20 === 0 && currentLogIndex < logs.length) {
            setParseLog(logs[currentLogIndex]);
            currentLogIndex++;
          }

          return prev + 10;
        });
      }, 250);

    } catch (err: any) {
      alert(err.message || "Failed to upload resume to the server");
      setUploadState('idle');
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadState('idle');
    setParseProgress(0);
    setParseLog('');
  };

  return (
    <DashboardLayout pageTitle="Resume Parsing & Matching">
      <div className="space-y-8 pb-12 max-w-7xl mx-auto text-left">
        
        {/* Page title */}
        <div>
          <h2 className="text-xl font-bold font-display text-white">Resume Parser & Matcher</h2>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Upload your resume to sync profile competencies and receive tailored mock questions.
          </p>
        </div>

        {/* Upload workspace grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Side: Upload zone */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 border-white/5" hoverGlow={false}>
              <h3 className="text-sm font-semibold text-white mb-4">Resume File</h3>
              
              {/* Drag Area */}
              {uploadState === 'idle' && (
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive 
                      ? 'border-accent-purple bg-accent-purple/5 shadow-inner' 
                      : 'border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/4'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden" 
                    accept=".pdf,.docx"
                  />
                  
                  <div className="h-12 w-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto mb-4 text-neutral-400 group-hover:text-white transition-colors">
                    <FileUp className="h-6 w-6" />
                  </div>
                  
                  <p className="text-xs font-semibold text-white">Drag & drop resume here</p>
                  <p className="text-[10px] text-neutral-500 font-light mt-1">Accepts PDF, DOCX files up to 5MB</p>
                  <button className="mt-4 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-neutral-300">
                    Browse File
                  </button>
                </div>
              )}

              {/* Uploading Progress State */}
              {uploadState === 'uploading' && (
                <div className="border border-white/5 rounded-2xl p-8 bg-neutral-950/20 text-center space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mx-auto text-accent-purple animate-pulse">
                    <Brain className="h-5 w-5" />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-white">AI Parser Analyzing Resume</p>
                    <p className="text-[10px] text-neutral-500 font-mono italic mt-0.5">{parseLog}</p>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent-purple rounded-full"
                      style={{ width: `${parseProgress}%` }}
                    />
                  </div>
                  <p className="text-xs font-bold text-accent-purple font-mono">{parseProgress}%</p>
                </div>
              )}

              {/* Parsed Success State */}
              {uploadState === 'parsed' && file && (
                <div className="border border-emerald-500/10 rounded-2xl p-6 bg-emerald-500/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{file.name}</p>
                      <p className="text-[9px] text-neutral-500">{(file.size / 1024).toFixed(1)} KB • PDF Document</p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-950/30 border border-white/5 flex gap-2 items-center">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-[10px] text-neutral-400 font-light">Document encrypted and cached successfully.</span>
                  </div>

                  <button 
                    onClick={resetUpload}
                    className="w-full py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-neutral-300"
                  >
                    Upload Another Resume
                  </button>
                </div>
              )}

            </GlassCard>
          </div>

          {/* Right Side: AI Analysis & Match Preview */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 border-white/5 min-h-[380px] flex flex-col justify-between" hoverGlow={false}>
              
              {/* Ready / Idle state placeholders */}
              {uploadState !== 'parsed' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                  <div className="h-12 w-12 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-center text-neutral-600">
                    <Brain className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Awaiting Resume Document</h4>
                    <p className="text-[11px] text-neutral-500 font-light max-w-sm mt-1">
                      Once uploaded, the AI parses skills, experience vectors, and aligns matching scores against target profiles.
                    </p>
                  </div>
                </div>
              )}

              {/* Parsed Result Display */}
              {uploadState === 'parsed' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Top Score */}
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Target Job Alignment Profile</h4>
                      <p className="text-[10px] text-neutral-500">Matched Track: Frontend Engineer at Stripe</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400 font-medium">Match rate:</span>
                      <span className="text-lg font-bold text-emerald-400 font-display bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">88%</span>
                    </div>
                  </div>

                  {/* Skills parsing categories */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-neutral-400">Identified Competency Vectors</h5>
                    
                    {/* Languages */}
                    <div className="space-y-1.5 text-left">
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Languages</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SQL'].map(s => (
                          <span key={s} className="px-2 py-1 rounded-md text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Frameworks */}
                    <div className="space-y-1.5 text-left pt-1">
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Frameworks & Libraries</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Vite', 'Jest', 'React Router'].map(s => (
                          <span key={s} className="px-2 py-1 rounded-md text-[10px] bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Back-end */}
                    <div className="space-y-1.5 text-left pt-1">
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Server & Database</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Node.js', 'Express.js', 'PostgreSQL', 'RESTful APIs'].map(s => (
                          <span key={s} className="px-2 py-1 rounded-md text-[10px] bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI match critique coaching cards */}
                  <div className="space-y-3 pt-2">
                    <h5 className="text-xs font-semibold text-neutral-400">AI Preparation Guidance</h5>
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-accent-purple/5 border border-accent-purple/15 flex gap-2">
                        <Sparkles className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-semibold text-accent-purple">Weak Project metrics</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed">
                            Your project description "Stripe Client Portal" lacks quantified achievements. Focus mock reviews on explaining latency improvements and scaling ratios (e.g. STAR impact).
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-accent-cyan/5 border border-accent-cyan/15 flex gap-2">
                        <TrendingUp className="h-4 w-4 text-accent-cyan shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-semibold text-accent-cyan">Recommended Topics to Study</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed">
                            Prepare for: React reconciliation details (fiber tree), custom hooks optimization, browser memory leaks, and B-tree index layouts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <button 
                    onClick={() => navigate('/interview')}
                    className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:from-accent-indigo hover:to-accent-purple transition-all shadow-lg shadow-accent-purple/15 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    Start Customized Mock Session
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

            </GlassCard>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
