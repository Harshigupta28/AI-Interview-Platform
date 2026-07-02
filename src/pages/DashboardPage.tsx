import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Clock, 
  Activity, 
  MessageSquare, 
  Play, 
  Calendar, 
  ChevronRight, 
  TrendingUp, 
  Sparkles,
  Zap
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { GlassCard } from '../components/GlassCard';

// Chart.js Setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Statistics Data
  const stats = [
    { name: 'Average Score', value: '84%', change: '+2.4%', metric: 'vs last week', icon: <Award className="h-5 w-5 text-accent-purple" />, color: 'accent-purple' },
    { name: 'Practice Time', value: '8.4 hrs', change: '+1.8 hrs', metric: 'active run', icon: <Clock className="h-5 w-5 text-accent-cyan" />, color: 'accent-cyan' },
    { name: 'Pacing Metric', value: '138 WPM', change: 'Optimal', metric: 'speech speed', icon: <Activity className="h-5 w-5 text-emerald-400" />, color: 'emerald-400' },
    { name: 'Filler Words', value: '1.8 /min', change: '-0.4', metric: 'word fillers', icon: <MessageSquare className="h-5 w-5 text-accent-pink" />, color: 'accent-pink' },
  ];

  // Charts configuration
  const chartData = {
    labels: ['Mock #1', 'Mock #2', 'Mock #3', 'Mock #4', 'Mock #5', 'Mock #6'],
    datasets: [
      {
        fill: true,
        label: 'Overall Grade',
        data: [72, 75, 78, 80, 82, 88],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        pointBorderColor: '#8B5CF6',
        pointBackgroundColor: '#030303',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#8B5CF6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0c0c0e',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
        titleFont: { family: 'Plus Jakarta Sans', size: 11, weight: 'bold' },
        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { family: 'Plus Jakarta Sans', size: 10 } },
      },
      y: {
        min: 60,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.03)' },
        ticks: { color: '#6b7280', font: { family: 'Plus Jakarta Sans', size: 10 } },
      },
    },
  };

  // Mock Interview History
  const history = [
    { id: '1', role: 'Frontend Engineer (React) - Stripe Mock', date: 'Today, 2:15 PM', duration: '25 mins', score: 88, status: 'Completed', logoText: 'S' },
    { id: '2', role: 'Systems Architecture - Netflix Mock', date: 'Jun 29, 2026', duration: '40 mins', score: 79, status: 'Completed', logoText: 'N' },
    { id: '3', role: 'Behavioral Leadership - Google Mock', date: 'Jun 25, 2026', duration: '15 mins', score: 85, status: 'Completed', logoText: 'G' },
  ];

  return (
    <DashboardLayout pageTitle="Student Workspace">
      <div className="space-y-8 pb-12">
        
        {/* Welcome Header Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold font-display text-white">Welcome back, Alex</h2>
              <span className="px-2 py-0.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-[10px] text-accent-purple font-semibold flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Pro Member
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Currently preparing for: <span className="font-semibold text-neutral-200">Frontend Engineer Track</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak Counter */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/3 border border-white/5 text-xs text-neutral-300 font-semibold select-none">
              <Zap className="h-4.5 w-4.5 text-yellow-500 fill-yellow-500/20" />
              <span>5 Day Streak</span>
            </div>
            
            <button 
              onClick={() => navigate('/interview')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-white/10" />
              Start New Mock
            </button>
          </div>
        </div>

        {/* Analytics Statistics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <GlassCard key={stat.name} className="flex items-center justify-between p-5 border-white/5" hoverGlow>
              <div className="text-left space-y-1.5">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">{stat.name}</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold font-display text-white">{stat.value}</span>
                  <span className={`text-[10px] font-bold ${
                    stat.change.startsWith('+') || stat.change === 'Optimal' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 font-light">{stat.metric}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center">
                {stat.icon}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Middle Section: Chart & Strengths Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Historical Analytics Line Graph */}
          <GlassCard className="lg:col-span-8 p-6 flex flex-col justify-between border-white/5 h-[340px]" hoverGlow={false}>
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="text-left">
                <h3 className="text-sm font-semibold text-white">Score Performance Analytics</h3>
                <p className="text-[10px] text-neutral-500">Grading performance over the last 6 mock attempts</p>
              </div>
              <span className="text-[10px] text-accent-purple font-semibold flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" />
                +16% overall growth
              </span>
            </div>
            
            <div className="flex-1 min-h-0 pt-6">
              <Line data={chartData} options={chartOptions} />
            </div>
          </GlassCard>

          {/* Competency strengths bar */}
          <GlassCard className="lg:col-span-4 p-6 flex flex-col justify-between border-white/5 h-[340px]" hoverGlow={false}>
            <div className="pb-4 border-b border-white/5 text-left">
              <h3 className="text-sm font-semibold text-white">Competency Scorecard</h3>
              <p className="text-[10px] text-neutral-500">Breakdown of active assessment parameters</p>
            </div>

            <div className="space-y-4 py-4 flex-1 flex flex-col justify-center">
              {/* Category 1 */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-neutral-300">Technical Code Accuracy</span>
                  <span className="text-accent-purple">89%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-purple rounded-full" style={{ width: '89%' }} />
                </div>
              </div>

              {/* Category 2 */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-neutral-300">System Design Architecture</span>
                  <span className="text-accent-cyan">78%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-cyan rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              {/* Category 3 */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-neutral-300">Vocal Pacing & Communication</span>
                  <span className="text-emerald-400">86%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '86%' }} />
                </div>
              </div>

              {/* Category 4 */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-neutral-300">STAR Frame Completeness</span>
                  <span className="text-accent-pink">82%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-pink rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Bottom Section: Interview History Table */}
        <GlassCard className="p-6 border-white/5" hoverGlow={false}>
          <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
            <div className="text-left">
              <h3 className="text-sm font-semibold text-white">Interview History</h3>
              <p className="text-[10px] text-neutral-500">Log of mock sessions completed</p>
            </div>
            <button 
              onClick={() => alert("Redirecting to all history list (Mock)")}
              className="text-[10px] text-neutral-400 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
            >
              See All Sessions
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="overflow-x-auto select-none">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3.5">Job Track / Mock Session</th>
                  <th className="pb-3.5">Completed Date</th>
                  <th className="pb-3.5">Session Length</th>
                  <th className="pb-3.5 text-center">Score Grade</th>
                  <th className="pb-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {history.map((row) => (
                  <tr key={row.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="py-4 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center font-bold text-neutral-300 font-mono">
                        {row.logoText}
                      </div>
                      <span className="font-semibold text-neutral-200 group-hover:text-white transition-colors">{row.role}</span>
                    </td>
                    <td className="py-4 text-neutral-400 font-light">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                        {row.date}
                      </div>
                    </td>
                    <td className="py-4 text-neutral-400 font-light">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-neutral-500" />
                        {row.duration}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {row.score}/100
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => navigate('/result')}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-neutral-300 transition-all cursor-pointer"
                      >
                        View Feedback
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </DashboardLayout>
  );
};
