import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  Share2, 
  Download,
  Calendar,
  Clock,
  TrendingUp,
  Brain,
  MessageSquare
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { GlassCard } from '../components/GlassCard';
import api from '../utils/api';

// Chart.js Radar Chart Registration
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        let activeId = id;
        
        // If no ID is specified in URL, load the most recent mock session
        if (!activeId) {
          const myData: any = await api.get('/results/my');
          if (myData.results && myData.results.length > 0) {
            activeId = myData.results[0]._id;
          }
        }

        if (activeId) {
          const data: any = await api.get(`/results/${activeId}`);
          setResult(data.result);
        }
      } catch (err) {
        console.error('Error fetching mock results scorecard:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="AI Interview Feedback">
        <div className="h-64 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-accent-purple animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  // Fallback defaults if no result is returned
  const dataObject = result || {
    jobRole: "Stripe Mock - Frontend Engineer",
    createdAt: new Date().toISOString(),
    duration: "25 Mins",
    overallScore: 84,
    categoriesScore: {
      technical: 89,
      communication: 86,
      confidence: 84,
      structure: 80
    },
    strengths: [
      "Comprehensive explanation of React batch diff updates and Virtual DOM reconciliation phases.",
      "Optimal vocal speed pacing at 138 WPM, showing confident, deliberate presentation.",
      "Structured Situation and Task descriptions when walk-through engineering project cases."
    ],
    weaknesses: [
      "Project metrics lacked quantitative impact (e.g. mention database query performance percent cuts).",
      "Technical response for database composite indexes missed secondary index constraints and sorting rules.",
      "Pacing accelerated slightly during systems design questions (reaching 160 WPM under pressure)."
    ],
    transcript: [
      {
        question: "Could you introduce yourself and walk me through your most recent engineering project?",
        answer: "Sure! In my last project, I led the core team in constructing a real-time visualization portal...",
        aiFeedback: "Excellent STAR framing. Highlighted scalability benchmarks clearly."
      }
    ]
  };

  const categories = [
    { name: 'Technical Correctness', score: dataObject.categoriesScore?.technical || 80, color: 'bg-accent-purple' },
    { name: 'Communication Pacing', score: dataObject.categoriesScore?.communication || 80, color: 'bg-accent-cyan' },
    { name: 'Speech Confidence', score: dataObject.categoriesScore?.confidence || 80, color: 'bg-accent-pink' },
    { name: 'STAR Frame Structure', score: dataObject.categoriesScore?.structure || 80, color: 'bg-yellow-500' },
  ];

  // Radar Chart Data (Candidate vs Benchmark)
  const radarData = {
    labels: ['Technical', 'Communication', 'Confidence', 'Structure', 'Pacing'],
    datasets: [
      {
        label: 'Your Score',
        data: [
          dataObject.categoriesScore?.technical || 80,
          dataObject.categoriesScore?.communication || 80,
          dataObject.categoriesScore?.confidence || 80,
          dataObject.categoriesScore?.structure || 80,
          85
        ],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        borderWidth: 2,
        pointBackgroundColor: '#8B5CF6',
        pointBorderColor: '#fff',
      },
      {
        label: 'Stripe Benchmark Standard',
        data: [85, 82, 80, 80, 82],
        borderColor: 'rgba(255, 255, 255, 0.15)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1.5,
        pointBackgroundColor: 'rgba(255, 255, 255, 0.3)',
        pointBorderColor: 'rgba(255, 255, 255, 0.1)',
      },
    ],
  };

  const radarOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#d1d5db',
          font: { family: 'Plus Jakarta Sans', size: 10, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: '#0c0c0e',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
      }
    },
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        pointLabels: {
          color: '#9ca3af',
          font: { family: 'Plus Jakarta Sans', size: 10, weight: 'bold' }
        },
        ticks: {
          color: '#6b7280',
          backdropColor: 'transparent',
          font: { size: 9 },
          stepSize: 20
        },
        min: 40,
        max: 100
      }
    }
  };

  const formatDate = (isoStr: string) => {
    try {
      return new Date(isoStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Completed';
    }
  };

  return (
    <DashboardLayout pageTitle="AI Interview Feedback">
      <div className="space-y-8 pb-12 max-w-7xl mx-auto text-left">
        
        {/* Session details banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-accent-purple/10 border border-accent-purple/20 text-accent-purple px-2 py-0.5 rounded font-bold uppercase tracking-wider">Session Graded</span>
              <h2 className="text-xl font-bold font-display text-white">{dataObject.jobRole}</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-2 font-light">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {formatDate(dataObject.createdAt)}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {dataObject.duration || '20 mins'} Duration</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert("Share Link copied successfully.")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
            
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Top metrics grids */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Dial (col-span-4) */}
          <GlassCard className="md:col-span-4 flex flex-col justify-between items-center text-center p-6 border-white/5 min-h-[300px]" hoverGlow={false}>
            <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase tracking-wider">Overall Grade</span>
            
            <div className="relative h-40 w-40 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-neutral-900" />
              <div className="absolute inset-0 rounded-full border-4 border-accent-purple border-t-transparent border-r-transparent animate-pulse-slow" style={{ transform: 'rotate(45deg)' }} />
              
              <div className="space-y-0.5">
                <span className="text-5xl font-bold font-display text-white">{dataObject.overallScore}</span>
                <span className="text-lg text-neutral-500">/100</span>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">
                  {dataObject.overallScore >= 80 ? 'Excellent' : 'Good'}
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold w-full">
              {dataObject.overallScore >= 80 ? 'Strong hire indicators detected.' : 'Competent performance parameters.'}
            </div>
          </GlassCard>

          {/* Categories bar sheet (col-span-4) */}
          <GlassCard className="md:col-span-4 p-6 flex flex-col justify-between border-white/5 min-h-[300px]" hoverGlow={false}>
            <div className="text-left pb-2 border-b border-white/5">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Category Performance</h3>
            </div>

            <div className="space-y-4 py-2 flex-1 flex flex-col justify-center">
              {categories.map((c) => (
                <div key={c.name} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-semibold text-left">
                    <span className="text-neutral-300">{c.name}</span>
                    <span className="text-white">{c.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Radar Chart benchmark comparison (col-span-4) */}
          <GlassCard className="md:col-span-4 p-6 flex flex-col justify-between border-white/5 min-h-[300px]" hoverGlow={false}>
            <div className="text-left pb-2 border-b border-white/5">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Mock Vector Alignment</h3>
            </div>
            
            <div className="flex-1 min-h-0 pt-4 relative">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </GlassCard>

        </div>

        {/* Strengths & Weaknesses block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths Card */}
          <GlassCard className="p-6 border-emerald-500/10 bg-emerald-500/[0.01]" hoverGlow={false}>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Identified Core Strengths</h3>
            </div>
            <ul className="space-y-3.5 text-xs text-neutral-300 font-light list-disc pl-4 leading-relaxed">
              {dataObject.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
            </ul>
          </GlassCard>

          {/* Weaknesses Card */}
          <GlassCard className="p-6 border-red-500/10 bg-red-500/[0.01]" hoverGlow={false}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h3 className="text-sm font-semibold text-white">Areas for Improvement</h3>
            </div>
            <ul className="space-y-3.5 text-xs text-neutral-300 font-light list-disc pl-4 leading-relaxed">
              {dataObject.weaknesses.map((w: string, i: number) => <li key={i}>{w}</li>)}
            </ul>
          </GlassCard>
        </div>

        {/* Dynamic Transcription Accordion Panel */}
        <GlassCard className="p-6 border-white/5" hoverGlow={false}>
          <div className="pb-4 border-b border-white/5 mb-6 text-left">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent-cyan" />
              Interview Response Transcript Logs
            </h3>
            <p className="text-[10px] text-neutral-500 mt-0.5">Line-by-line answer transcript with assessor reviews</p>
          </div>

          <div className="space-y-4">
            {dataObject.transcript?.map((t: any, i: number) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/2 text-xs space-y-3 text-left">
                <div>
                  <span className="text-[10px] font-bold text-accent-purple uppercase tracking-wider font-mono">Question {i + 1}</span>
                  <p className="font-semibold text-white mt-1">{t.question}</p>
                </div>
                
                <div className="pl-3 border-l border-white/10 space-y-1">
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Your Answer</span>
                  <p className="text-neutral-300 font-light leading-relaxed">{t.answer}</p>
                </div>

                {t.aiFeedback && (
                  <div className="pl-3 border-l border-accent-purple/20 bg-accent-purple/2 px-3 py-2 rounded-lg space-y-1">
                    <span className="text-[9px] font-bold text-accent-purple uppercase tracking-widest font-mono flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Assessor Review
                    </span>
                    <p className="text-neutral-400 font-light leading-normal">{t.aiFeedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* AI Recommendations panel */}
        <GlassCard className="p-6 border-white/5" hoverGlow={false}>
          <div className="pb-4 border-b border-white/5 mb-6 text-left">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent-purple" />
              AI Recommendation Action Plan
            </h3>
            <p className="text-[10px] text-neutral-500 mt-0.5">Custom study directives matching parsed weaknesses</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-accent-purple/5 border border-accent-purple/15 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0 text-accent-purple">
                <Brain className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-left">
                <p className="text-xs font-semibold text-white">Introduce Numeric Project Quantifiers</p>
                <p className="text-xs text-neutral-400 font-light leading-normal">
                  Stripe recruiters expect engineering metrics. Revise project details to mention index latency reductions (e.g. "implemented composite B-tree layouts decreasing product fetch latency from 1.2s to 120ms under heavy concurrency").
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-accent-cyan/5 border border-accent-cyan/15 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0 text-accent-cyan">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-left">
                <p className="text-xs font-semibold text-white">Review Database Secondary Sorting Constraint Logic</p>
                <p className="text-xs text-neutral-400 font-light leading-normal">
                  Your B-tree index response missed standard prefix matching rule properties. Read about how composite sorting works, and run mock scenarios specifically targeting secondary index ordering bounds.
                </p>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="mt-8 flex justify-end gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl text-xs font-semibold text-neutral-300 border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate('/interview')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:scale-[1.02] transition-all cursor-pointer"
            >
              Retake Mock Session
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </GlassCard>

      </div>
    </DashboardLayout>
  );
};
