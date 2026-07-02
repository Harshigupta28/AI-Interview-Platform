import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Brain
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { GlassCard } from '../components/GlassCard';

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

  // Score metrics
  const overallScore = 84;
  const categories = [
    { name: 'Technical Correctness', score: 89, color: 'bg-accent-purple' },
    { name: 'Communication Pacing', score: 86, color: 'bg-accent-cyan' },
    { name: 'Speech Confidence', score: 84, color: 'bg-accent-pink' },
    { name: 'STAR Frame Structure', score: 80, color: 'bg-yellow-500' },
  ];

  // Strengths & Weaknesses
  const strengths = [
    "Comprehensive explanation of React batch diff updates and Virtual DOM reconciliation phases.",
    "Optimal vocal speed pacing at 138 WPM, showing confident, deliberate presentation.",
    "Structured Situation and Task descriptions when walk-through engineering project cases."
  ];

  const weaknesses = [
    "Project metrics lacked quantitative impact (e.g. mention database query performance percent cuts).",
    "Technical response for database composite indexes missed secondary index constraints and sorting rules.",
    "Pacing accelerated slightly during systems design questions (reaching 160 WPM under pressure)."
  ];

  // Radar Chart Data (Candidate vs Benchmark)
  const radarData = {
    labels: ['Technical Accuracy', 'Architecture Design', 'STAR Structure', 'Clarity & Flow', 'Filler Words'],
    datasets: [
      {
        label: 'Your Score',
        data: [89, 78, 80, 86, 85],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        borderWidth: 2,
        pointBackgroundColor: '#8B5CF6',
        pointBorderColor: '#fff',
      },
      {
        label: 'Stripe Benchmark Standard',
        data: [85, 82, 80, 80, 82],
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6, 182, 212, 0.05)',
        borderWidth: 1.5,
        pointBackgroundColor: '#06B6D4',
        pointBorderColor: '#fff',
      }
    ]
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

  return (
    <DashboardLayout pageTitle="AI Interview Feedback">
      <div className="space-y-8 pb-12 max-w-7xl mx-auto text-left">
        
        {/* Session details banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-accent-purple/10 border border-accent-purple/20 text-accent-purple px-2 py-0.5 rounded font-bold uppercase tracking-wider">Session Graded</span>
              <h2 className="text-xl font-bold font-display text-white">Stripe Mock - Frontend Engineer</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-2 font-light">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Today, 2:15 PM</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 25 Mins Duration</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert("Mock Action: Session results link copied.")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
            
            <button 
              onClick={() => alert("Mock Action: PDF Download triggered.")}
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
              {/* Outer Score Circle layout */}
              <div className="absolute inset-0 rounded-full border-4 border-neutral-900" />
              <div className="absolute inset-0 rounded-full border-4 border-accent-purple border-t-transparent border-r-transparent animate-pulse-slow" style={{ transform: 'rotate(45deg)' }} />
              
              <div className="space-y-0.5">
                <span className="text-5xl font-bold font-display text-white">{overallScore}</span>
                <span className="text-lg text-neutral-500">/100</span>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">Excellent</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold w-full">
              Strong hire indicators detected.
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
                  <div className="flex justify-between text-[11px] font-semibold">
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
              {strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </GlassCard>

          {/* Weaknesses Card */}
          <GlassCard className="p-6 border-red-500/10 bg-red-500/[0.01]" hoverGlow={false}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h3 className="text-sm font-semibold text-white">Areas for Improvement</h3>
            </div>
            <ul className="space-y-3.5 text-xs text-neutral-300 font-light list-disc pl-4 leading-relaxed">
              {weaknesses.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </GlassCard>
        </div>

        {/* AI Recommendations panel */}
        <GlassCard className="p-6 border-white/5" hoverGlow={false}>
          <div className="pb-4 border-b border-white/5 mb-6">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent-purple" />
              AI Recommendation Action Plan
            </h3>
            <p className="text-[10px] text-neutral-500 mt-0.5">Custom study directives matching parsed weaknesses</p>
          </div>

          <div className="space-y-4">
            
            {/* Guide 1 */}
            <div className="p-4 rounded-xl bg-accent-purple/5 border border-accent-purple/15 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0 text-accent-purple">
                <Brain className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-white">Introduce Numeric Project Quantifiers</p>
                <p className="text-xs text-neutral-400 font-light leading-normal">
                  Stripe recruiters expect engineering metrics. Revise project details to mention index latency reductions (e.g. "implemented composite B-tree layouts decreasing product fetch latency from 1.2s to 120ms under heavy concurrency").
                </p>
              </div>
            </div>

            {/* Guide 2 */}
            <div className="p-4 rounded-xl bg-accent-cyan/5 border border-accent-cyan/15 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0 text-accent-cyan">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="space-y-1">
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
