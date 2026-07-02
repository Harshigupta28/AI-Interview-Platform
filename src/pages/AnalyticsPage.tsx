import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target, 
  Zap, 
  ChevronRight,
  Clock,
  Search
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { GlassCard } from '../components/GlassCard';

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

  // Mock sessions list
  const history = [
    { id: '1', role: 'Frontend Engineer (React) - Stripe Mock', date: 'Jul 02, 2026', time: '2:15 PM', duration: '25m', score: 88, track: 'Software' },
    { id: '2', role: 'Systems Architecture - Netflix Mock', date: 'Jun 29, 2026', time: '11:00 AM', duration: '40m', score: 79, track: 'Software' },
    { id: '3', role: 'Behavioral Leadership - Google Mock', date: 'Jun 25, 2026', time: '4:30 PM', duration: '15m', score: 85, track: 'Behavioral' },
    { id: '4', role: 'UI Components Mock - Vercel Mock', date: 'Jun 18, 2026', time: '10:15 AM', duration: '20m', score: 82, track: 'Software' },
    { id: '5', role: 'Data Structures - Meta Mock', date: 'Jun 12, 2026', time: '1:00 PM', duration: '30m', score: 75, track: 'Algorithms' },
  ];

  const filteredHistory = history.filter(item => 
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Line Chart: Weekly Progress
  const lineData = {
    labels: ['Wk 21', 'Wk 22', 'Wk 23', 'Wk 24', 'Wk 25', 'Wk 26'],
    datasets: [
      {
        fill: true,
        label: 'Average Score',
        data: [70, 73, 76, 79, 81, 84],
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
      y: { min: 60, max: 100, grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#9ca3af', font: { size: 9 } } }
    }
  };

  // Bar Chart: Skills Trends
  const barData = {
    labels: ['JS Core', 'React', 'Algorithms', 'Sys Design', 'Behavioral'],
    datasets: [
      {
        label: 'Skill Proficiency (%)',
        data: [92, 88, 75, 78, 85],
        backgroundColor: 'rgba(139, 92, 246, 0.75)',
        hoverBackgroundColor: '#8B5CF6',
        borderRadius: 6,
        borderWidth: 0,
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

  // Simulated 53-week GitHub mock activity layout data (5 rows x 15 columns for preview)
  const heatmapRows = 5;
  const heatmapCols = 22;
  const generateMockHeatmapIntensity = (r: number, c: number) => {
    // Return mock values representing color weights
    const combined = r * c;
    if (combined % 7 === 0) return 'bg-accent-purple'; // 3+ mocks
    if (combined % 5 === 0) return 'bg-accent-purple/60'; // 2 mocks
    if (combined % 3 === 0) return 'bg-accent-purple/25'; // 1 mock
    return 'bg-white/5'; // 0 mocks
  };

  // Goal tracking items
  const goals = [
    { title: 'Practice Mock Sessions', target: '15 runs', current: '12 runs', percent: 80, color: 'bg-accent-purple' },
    { title: 'Target Average Grade', target: '85%', current: '84%', percent: 98, color: 'bg-accent-cyan' },
    { title: 'Maintain Speech Tempo', target: '130-150 WPM', current: '138 WPM', percent: 100, color: 'bg-emerald-500' },
  ];

  return (
    <DashboardLayout pageTitle="Performance Analytics">
      <div className="space-y-8 pb-12 max-w-7xl mx-auto text-left">
        
        {/* Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-white">Analytics & Competencies</h2>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Visualize historical improvements, active skill profiles, and learning checkpoints.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-300 bg-white/3 border border-white/10 px-3.5 py-2 rounded-xl">
            <Zap className="h-4.5 w-4.5 text-yellow-500 fill-yellow-500/20" />
            <span>Rank: Top 8% of candidates</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly average scores line */}
          <GlassCard className="p-6 h-[290px] border-white/5 flex flex-col justify-between" hoverGlow={false}>
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Weekly Grade Progress</h3>
                <p className="text-[9px] text-neutral-500">Performance growth over historical weeks</p>
              </div>
              <TrendingUp className="h-4.5 w-4.5 text-accent-cyan" />
            </div>
            
            <div className="flex-1 min-h-0 pt-4">
              <Line data={lineData} options={lineOptions} />
            </div>
          </GlassCard>

          {/* Core competency bar */}
          <GlassCard className="p-6 h-[290px] border-white/5 flex flex-col justify-between" hoverGlow={false}>
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Skill Vector Strengths</h3>
                <p className="text-[9px] text-neutral-500">Skill index score checks across modules</p>
              </div>
              <BarChart3 className="h-4.5 w-4.5 text-accent-purple" />
            </div>

            <div className="flex-1 min-h-0 pt-4">
              <Bar data={barData} options={barOptions} />
            </div>
          </GlassCard>
        </div>

        {/* Mock Activity Heatmap (GitHub Contribution style) */}
        <GlassCard className="p-6 border-white/5" hoverGlow={false}>
          <div className="pb-4 border-b border-white/5 mb-6 text-left">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-accent-purple" />
              Mock Activity Timeline
            </h3>
            <p className="text-[9px] text-neutral-500 mt-0.5">Mock submission frequency logs over the last 110 days</p>
          </div>

          <div className="flex flex-col gap-2 overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[500px]">
              {/* Columns */}
              {Array.from({ length: heatmapCols }).map((_, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1.5">
                  {Array.from({ length: heatmapRows }).map((_, rowIndex) => {
                    const intensity = generateMockHeatmapIntensity(rowIndex + 1, colIndex + 1);
                    return (
                      <div 
                        key={rowIndex} 
                        className={`h-4.5 w-4.5 rounded-sm transition-colors cursor-pointer hover:scale-110 ${intensity}`}
                        title={`Activity weight: col ${colIndex + 1}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            
            {/* Heatmap Legend */}
            <div className="flex justify-end gap-1.5 text-[9px] text-neutral-500 font-semibold uppercase tracking-wider mt-4">
              <span>Less</span>
              <div className="h-3 w-3 rounded-sm bg-white/5" />
              <div className="h-3 w-3 rounded-sm bg-accent-purple/25" />
              <div className="h-3 w-3 rounded-sm bg-accent-purple/60" />
              <div className="h-3 w-3 rounded-sm bg-accent-purple" />
              <span>More</span>
            </div>
          </div>
        </GlassCard>

        {/* Goal Tracking & History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Goal Targets (Col span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 border-white/5 text-left" hoverGlow={false}>
              <div className="pb-3 border-b border-white/5 mb-5 flex items-center gap-1.5">
                <Target className="h-4.5 w-4.5 text-accent-cyan" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Goal Targets</h3>
              </div>

              <div className="space-y-6">
                {goals.map((g) => (
                  <div key={g.title} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-neutral-300">{g.title}</span>
                      <span className="text-neutral-400 font-light">{g.current} / {g.target}</span>
                    </div>

                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden relative">
                      <div className={`h-full ${g.color} rounded-full`} style={{ width: `${g.percent}%` }} />
                    </div>

                    <div className="flex justify-between text-[9px] text-neutral-500 font-semibold">
                      <span>Progress:</span>
                      <span className={g.percent === 100 ? 'text-emerald-400' : 'text-neutral-400'}>
                        {g.percent}% {g.percent === 100 ? '✓ Complete' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Historical sessions table (Col span 7) */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 border-white/5" hoverGlow={false}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5 mb-5">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Historical Logs</h3>
                  <p className="text-[9px] text-neutral-500">List of mock sessions matching keywords</p>
                </div>
                
                {/* Search widget */}
                <div className="relative w-full sm:w-48">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <Search className="h-3.5 w-3.5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search mock track..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-neutral-900/60 border border-white/10 focus:border-accent-purple outline-none text-white placeholder:text-neutral-600"
                  />
                </div>
              </div>

              {/* History list */}
              <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1 select-none">
                {filteredHistory.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3.5 rounded-xl border border-white/5 bg-white/2 hover:border-white/10 flex justify-between items-center group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center font-bold text-xs text-neutral-400">
                        {item.role.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">{item.role}</p>
                        <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-light">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {item.score}%
                      </span>
                      <button 
                        onClick={() => navigate('/result')}
                        className="p-1 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 text-neutral-400 hover:text-white transition-all cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredHistory.length === 0 && (
                  <p className="text-xs text-neutral-600 italic text-center py-6">No historical mock tracks match filter.</p>
                )}
              </div>
            </GlassCard>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
