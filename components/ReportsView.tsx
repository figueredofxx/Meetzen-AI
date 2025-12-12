
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  PieChart, Pie, Cell, LineChart, Line, ComposedChart, Area 
} from 'recharts';
import { 
  TrendingUp, Clock, Users, DollarSign, Calendar, Download, 
  ArrowUpRight, ArrowDownRight, Zap, Target, Filter, Lock 
} from 'lucide-react';
import { PlanType } from '../types';

interface ReportsViewProps {
    userPlan?: PlanType;
    onChangePlan?: () => void;
}

// --- MOCK DATA FOR VISUALIZATION ---

const REVENUE_SERIES = [
  { day: '01', revenue: 1200, appointments: 8 },
  { day: '05', revenue: 1800, appointments: 12 },
  { day: '10', revenue: 1500, appointments: 10 },
  { day: '15', revenue: 2400, appointments: 18 },
  { day: '20', revenue: 2100, appointments: 15 },
  { day: '25', revenue: 3200, appointments: 22 },
  { day: '30', revenue: 2800, appointments: 20 },
];

const FUNNEL_DATA = [
  { name: 'Leads (Conversas)', value: 450, fill: '#e4e4e7' }, // zinc-200
  { name: 'Qualificados', value: 280, fill: '#a1a1aa' }, // zinc-400
  { name: 'Agendados', value: 120, fill: '#800080' }, // primary
  { name: 'Compareceram', value: 115, fill: '#660066' }, // primary-hover
];

const INTENT_DATA = [
  { name: 'Agendamento', value: 55, color: '#800080' },
  { name: 'Dúvidas/Preços', value: 25, color: '#52525b' },
  { name: 'Cancelamento', value: 10, color: '#ef4444' },
  { name: 'Outros', value: 10, color: '#d4d4d8' },
];

const HOURLY_VOLUME = [
  { hour: '08h', volume: 15 },
  { hour: '10h', volume: 45 },
  { hour: '12h', volume: 20 },
  { hour: '14h', volume: 35 },
  { hour: '16h', volume: 50 },
  { hour: '18h', volume: 30 },
  { hour: '20h', volume: 10 },
];

// --- COMPONENTS ---

const KPICard = ({ title, value, subtext, icon: Icon, trend, delay }: any) => (
  <div 
    className={`bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300 animate-in slide-in-from-bottom-4 fade-in fill-mode-forwards`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-zinc-50 rounded-lg border border-zinc-100 text-zinc-600">
        <Icon size={20} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">{value}</h3>
      <p className="text-xs text-zinc-500 font-medium uppercase mt-1 tracking-wide">{title}</p>
      <p className="text-xs text-zinc-400 mt-2">{subtext}</p>
    </div>
  </div>
);

const ReportsView: React.FC<ReportsViewProps> = ({ userPlan = 'nexus', onChangePlan }) => {
  const [dateRange, setDateRange] = useState('30d');
  const isStarter = userPlan === 'starter';

  return (
    <div className="relative flex-1 h-full overflow-hidden">
        
      {/* --- LOCK OVERLAY --- */}
      {isStarter && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-md transition-all">
              <div className="bg-white p-8 rounded-2xl shadow-2xl border border-zinc-200 max-w-md text-center animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200 text-white">
                      <Lock size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-2">Business Intelligence</h2>
                  <p className="text-zinc-500 mb-6 leading-relaxed">
                      Visualize o crescimento da sua empresa com gráficos de receita, funil de conversão e horários de pico. Exclusivo para assinantes <strong>Zen Pro</strong> e superior.
                  </p>
                  
                  <button 
                    onClick={onChangePlan}
                    className="w-full mt-4 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                      Ver Relatórios Avançados
                  </button>
              </div>
          </div>
      )}

      {/* --- CONTENT --- */}
      <div className={`flex-1 bg-zinc-50/50 p-8 overflow-y-auto h-full ${isStarter ? 'pointer-events-none select-none opacity-80 overflow-hidden' : ''}`}>
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in slide-in-from-top-2 fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900 mb-1">Painel de Performance</h1>
                <p className="text-zinc-500 text-sm">Acompanhe a eficiência da sua operação e o impacto da IA.</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-zinc-200 rounded-lg p-1 shadow-sm">
                    {['7d', '30d', '90d'].map((range) => (
                        <button 
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                dateRange === range 
                                    ? 'bg-zinc-900 text-white shadow-sm' 
                                    : 'text-zinc-500 hover:bg-zinc-50'
                            }`}
                        >
                            {range === '7d' ? '7 Dias' : range === '30d' ? '30 Dias' : '3 Meses'}
                        </button>
                    ))}
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 shadow-sm transition-colors">
                <Download size={16} />
                Exportar PDF
                </button>
            </div>
            </div>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard 
                title="Receita Estimada" 
                value="R$ 42.500" 
                subtext="Baseado em agendamentos"
                icon={DollarSign} 
                trend={12.5} 
                delay={0}
            />
            <KPICard 
                title="Agendamentos" 
                value="142" 
                subtext="32% via Automação Pura"
                icon={Calendar} 
                trend={8.2} 
                delay={100}
            />
            <KPICard 
                title="Taxa de Conversão" 
                value="26.4%" 
                subtext="Leads -> Agendados"
                icon={Target} 
                trend={-2.1} 
                delay={200}
            />
            <KPICard 
                title="Economia (IA)" 
                value="86 Horas" 
                subtext="Tempo humano poupado"
                icon={Zap} 
                trend={15.0} 
                delay={300}
            />
            </div>

            {/* MAIN CHART ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Revenue & Volume Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="font-bold text-zinc-900">Receita vs. Volume</h3>
                        <p className="text-xs text-zinc-500">Correlação entre número de atendimentos e faturamento.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                            <span className="text-xs text-zinc-500">Atendimentos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-800"></span>
                            <span className="text-xs text-zinc-500">Receita (R$)</span>
                        </div>
                    </div>
                </div>
                <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={REVENUE_SERIES} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                    />
                    <Bar yAxisId="left" dataKey="appointments" fill="#18181b" barSize={30} radius={[4, 4, 0, 0]} name="Atendimentos" />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#800080" strokeWidth={3} dot={{r: 4, fill: '#800080', strokeWidth: 2, stroke:'#fff'}} activeDot={{ r: 6 }} name="Receita" />
                    </ComposedChart>
                </ResponsiveContainer>
                </div>
            </div>

            {/* Funnel Chart */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                <h3 className="font-bold text-zinc-900 mb-1">Funil de Conversão</h3>
                <p className="text-xs text-zinc-500 mb-6">Eficiência do lead até o comparecimento.</p>
                
                <div className="space-y-4">
                    {FUNNEL_DATA.map((step, index) => {
                        const maxVal = FUNNEL_DATA[0].value;
                        const percent = Math.round((step.value / maxVal) * 100);
                        return (
                            <div key={step.name} className="relative group cursor-default">
                                <div className="flex justify-between items-end mb-1 relative z-10">
                                    <span className="text-xs font-semibold text-zinc-700 group-hover:text-zinc-900 transition-colors">{step.name}</span>
                                    <span className="text-xs font-bold text-zinc-900">{step.value}</span>
                                </div>
                                <div className="w-full bg-zinc-50 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full rounded-full transition-all duration-1000 ease-out" 
                                        style={{ width: `${percent}%`, backgroundColor: step.fill }}
                                    ></div>
                                </div>
                                <div className="text-[10px] text-zinc-400 mt-0.5 text-right">{percent}% conversão</div>
                            </div>
                        )
                    })}
                </div>
                
                <div className="mt-8 p-4 bg-zinc-50 rounded-lg border border-zinc-100 flex items-center gap-3">
                    <TrendingUp size={20} className="text-primary" />
                    <div>
                        <p className="text-xs font-bold text-zinc-700">Insight</p>
                        <p className="text-[10px] text-zinc-500">Sua taxa de comparecimento (96%) está acima da média de mercado (85%).</p>
                    </div>
                </div>
            </div>
            </div>

            {/* SECONDARY METRICS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Intent Distribution */}
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-zinc-900">Motivos de Contato</h3>
                            <p className="text-xs text-zinc-500">O que seus clientes mais procuram.</p>
                        </div>
                        <Filter size={16} className="text-zinc-400" />
                    </div>
                    <div className="flex items-center">
                        <div className="h-56 w-1/2">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={INTENT_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {INTENT_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-1/2 space-y-3">
                            {INTENT_DATA.map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-xs text-zinc-600 font-medium">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-bold text-zinc-900">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Peak Hours Heatmap Logic */}
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-zinc-900">Horários de Pico</h3>
                            <p className="text-xs text-zinc-500">Volume de mensagens por hora do dia.</p>
                        </div>
                        <Clock size={16} className="text-zinc-400" />
                    </div>
                    <div className="h-56 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={HOURLY_VOLUME}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                                <Tooltip 
                                    cursor={{fill: '#f4f4f5'}}
                                    contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e4e4e7'}}
                                />
                                <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
                                    {HOURLY_VOLUME.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.volume > 40 ? '#18181b' : '#a1a1aa'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ReportsView;
