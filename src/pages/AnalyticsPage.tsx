import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Search, 
  Award
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { GlassCard } from '../components/GlassCard';
import api from '../utils/api';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [analytics, setAnalytics] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsData: any = await api.get('/analytics');
        setAnalytics(analyticsData.analytics);

        const historyData: any = await api.get('/results/my');
        setHistory(historyData.results || []);
      } catch (err) {
        console.error('Error fetching analytics details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const filteredHistory = history.filter(item => 
    item.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Line Chart: Weekly Progress
  const lineLabels = analytics?.weeklyProgress?.length > 0 
    ? analytics.weeklyProgress.map((p: any) => p.label) 
    : ['Wk 21', 'Wk 22', 'Wk 23', 'Wk 24', 'Wk 25', 'Wk 26'];
  const lineScores = analytics?.weeklyProgress?.length > 0 
    ? analytics.weeklyProgress.map((p: any) => p.score) 
    : [70, 73, 76, 79, 81, 84];

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        fill: true,
        label: 'Average Score',
        data: lineScores,
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6, 182, 212, 0.08)',
        tension: 0.35,
        pointBackgroundColor: '#06B6D4',
        pointHoverRadius: 6,
      }
    ]
  };

  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#0c0c0e' }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 9 } } },
      y: { min: 50, max: 100, grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#9ca3af', font: { size: 9 } } }
    }
  };

  // Bar Chart: Skills Trends
  const skillValues = analytics?.skillTrends 
    ? [
        analytics.skillTrends.technical || 80,
        analytics.skillTrends.communication || 80,
        analytics.skillTrends.confidence || 80,
        analytics.skillTrends.structure || 80,
        85 // default Pacing
      ]
    : [92, 88, 75, 78, 85];

  const barData = {
    labels: ['Technical Accuracy', 'Communication Flow', 'Confidence Delivery', 'STAR Structure', 'Speech Pacing'],
    datasets: [
      {
        label: 'Skill Proficiency (%)',
        data: skillValues,
        backgroundColor: 'rgba(139, 92, 246, 0.75)',
        hoverBackgroundColor: '#8B5CF6',
        borderRadius: 6,
      }
    ]
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#0c0c0e' }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 9 } } },
      y: { min: 0, max: 100, grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#9ca3af', font: { size: 9 } } }
    }
  };

  const formatTableDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return 'Completed';
    }
  };

  // Contribution Calendar heatmap variables
  const heatmapData = analytics?.heatmap || {};
  const today = new Date();
  const calendarBlocks = Array.from({ length: 112 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (111 - i));
    const dateStr = d.toISOString().split("T")[0];
    const count = heatmapData[dateStr] || 0;
    return { date: dateStr, count };
  });

  const getHeatmapColorClass = (count: number) => {
    if (count === 0) return 'bg-white/[0.03]';
    if (count === 1) return 'bg-accent-purple/20';
    if (count === 2) return 'bg-accent-purple/50';
    return 'bg-accent-purple';
  };

  const totalMocks = analytics?.cumulative?.totalMocks || history.length;
  const avgScore = analytics?.cumulative?.avgScore || (history.length > 0 ? Math.round(history.reduce((a, c) => a + c.overallScore, 0) / history.length) : 84);
  const timeSpent = analytics?.cumulative?.totalDuration || `${totalMocks * 20} mins`;

  return (
    <DashboardLayout pageTitle="Analytics & Progress Metrics">
      <div className="space-y-8 pb-12 max-w-7xl mx-auto text-left">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-white">Performance Analytics</h2>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Detailed tracking of mock metrics, competency development, and streaks.
            </p>
          </div>
          <button 
            onClick={() => navigate('/interview')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent-purple to-accent-indigo hover:scale-[1.02] transition-all cursor-pointer"
          >
            Start New Mock
          </button>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-accent-purple animate-spin" />
          </div>
        ) : (
          <>
            {/* Top statistics scorecard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <GlassCard className="p-5 border-white/5 flex items-center justify-between" hoverGlow>
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Average Score</span>
                  <p className="text-2xl font-bold font-display text-accent-cyan">{avgScore}%</p>
                  <p className="text-[9px] text-neutral-400">across practice records</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-accent-cyan">
                  <Award className="h-5 w-5" />
                </div>
              </GlassCard>

              <GlassCard className="p-5 border-white/5 flex items-center justify-between" hoverGlow>
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Total Mock Runs</span>
                  <p className="text-2xl font-bold font-display text-accent-purple">{totalMocks}</p>
                  <p className="text-[9px] text-neutral-400">completed session files</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-accent-purple">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </GlassCard>

              <GlassCard className="p-5 border-white/5 flex items-center justify-between" hoverGlow>
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Time Invested</span>
                  <p className="text-2xl font-bold font-display text-emerald-400">{timeSpent}</p>
                  <p className="text-[9px] text-neutral-400">active verbal sandboxing</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-emerald-400">
                  <Clock className="h-5 w-5" />
                </div>
              </GlassCard>
            </div>

            {/* Graphs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Line chart: progress (col-span-6) */}
              <GlassCard className="lg:col-span-6 p-6 border-white/5 h-[340px] flex flex-col justify-between" hoverGlow={false}>
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-white">Grading Trends</h3>
                    <p className="text-[10px] text-neutral-500">Chronological score averages</p>
                  </div>
                  <TrendingUp className="h-4 w-4 text-accent-cyan" />
                </div>
                <div className="flex-1 min-h-0 pt-6">
                  <Line data={lineData} options={lineOptions} />
                </div>
              </GlassCard>

              {/* Bar chart: skills (col-span-6) */}
              <GlassCard className="lg:col-span-6 p-6 border-white/5 h-[340px] flex flex-col justify-between" hoverGlow={false}>
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-white">Skill Competency Breakdowns</h3>
                    <p className="text-[10px] text-neutral-500">Strengths by parameter fields</p>
                  </div>
                  <BarChart3 className="h-4 w-4 text-accent-purple" />
                </div>
                <div className="flex-1 min-h-0 pt-6">
                  <Bar data={barData} options={barOptions} />
                </div>
              </GlassCard>

            </div>

            {/* Heatmap & Target tracking */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Contribution Activity Map (col-span-8) */}
              <GlassCard className="lg:col-span-8 p-6 border-white/5 text-left flex flex-col justify-between" hoverGlow={false}>
                <div className="pb-3 border-b border-white/5 mb-4">
                  <h3 className="text-sm font-semibold text-white">Interview Practice Contribution Calendar</h3>
                  <p className="text-[10px] text-neutral-500">Visual grid of completed mocks over the last 16 weeks</p>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-16 gap-1 w-full select-none">
                    {calendarBlocks.map((block, i) => (
                      <div 
                        key={i} 
                        title={`${block.date}: ${block.count} mocks completed`}
                        className={`h-4.5 rounded-sm transition-colors hover:scale-110 cursor-pointer ${getHeatmapColorClass(block.count)}`}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-neutral-500 font-light mt-4 pt-3 border-t border-white/5 w-full">
                    <span>Active contribution streak tracker</span>
                    <div className="flex items-center gap-1.5">
                      <span>Less</span>
                      <div className="h-3 w-3 rounded bg-white/[0.03]" />
                      <div className="h-3 w-3 rounded bg-accent-purple/20" />
                      <div className="h-3 w-3 rounded bg-accent-purple/50" />
                      <div className="h-3 w-3 rounded bg-accent-purple" />
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Target Goals (col-span-4) */}
              <GlassCard className="lg:col-span-4 p-6 border-white/5 text-left flex flex-col justify-between" hoverGlow={false}>
                <div className="pb-3 border-b border-white/5 mb-4">
                  <h3 className="text-sm font-semibold text-white">Target Milestones</h3>
                  <p className="text-[10px] text-neutral-500">Active performance targets</p>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  {(analytics?.goals || [
                    { title: "Practice Mock Sessions", target: 15, current: totalMocks, percent: Math.min(Math.round((totalMocks / 15) * 100), 100) },
                    { title: "Target Average Grade", target: 85, current: avgScore, percent: Math.min(Math.round((avgScore / 85) * 100), 100) }
                  ]).map((goal: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-neutral-300">{goal.title}</span>
                        <span className="text-accent-cyan">{goal.current} / {goal.target}</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-cyan rounded-full" style={{ width: `${goal.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

            </div>

            {/* Bottom logs table */}
            <GlassCard className="p-6 border-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5 mb-4">
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-white">Mock Session Records</h3>
                  <p className="text-[10px] text-neutral-500">Audit logs of completed iterations</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                  <input 
                    type="text" 
                    placeholder="Search by job role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-white/10 focus:border-accent-purple text-xs text-white placeholder:text-neutral-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                {filteredHistory.length === 0 ? (
                  <div className="py-8 text-center text-neutral-500 text-xs">
                    No mock records matched your search.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3.5">Job Role</th>
                        <th className="pb-3.5">Completed Date</th>
                        <th className="pb-3.5">Session Length</th>
                        <th className="pb-3.5 text-center">Score Grade</th>
                        <th className="pb-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredHistory.map((row) => (
                        <tr key={row._id} className="hover:bg-white/[0.01] transition-colors group">
                          <td className="py-4 text-left font-semibold text-neutral-200 group-hover:text-white transition-colors">
                            {row.jobRole} Mock
                          </td>
                          <td className="py-4 text-neutral-400 font-light">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                              {formatTableDate(row.createdAt)}
                            </div>
                          </td>
                          <td className="py-4 text-neutral-400 font-light">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-neutral-500" />
                              {row.duration || '20m'}
                            </div>
                          </td>
                          <td className="py-4 text-center">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.overallScore >= 80 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            }`}>
                              {row.overallScore}/100
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => navigate(`/result/${row._id}`)}
                              className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-neutral-300 transition-all cursor-pointer animate-pulse-once"
                            >
                              View Scorecard
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </GlassCard>
          </>
        )}

      </div>
    </DashboardLayout>
  );
};
