
import React, { useState, useEffect } from 'react';
import { 
  Server, Users, DollarSign, Activity, Database, Key, Shield, 
  Search, MoreVertical, LogIn, Ban, CheckCircle2, AlertTriangle, 
  Settings, Save, Loader2, RefreshCcw, Cpu 
} from 'lucide-react';
import { ToastType } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SaaSAdminViewProps {
    showToast: (title: string, type: ToastType, message?: string) => void;
}

// --- MOCK DATA ---
const TENANTS = [
    { id: 't1', name: 'Clínica Sorriso', plan: 'pro', status: 'active', instances: 1, revenue: 297, joined: '10/10/2024' },
    { id: 't2', name: 'Dr. Roberto Advocacia', plan: 'starter', status: 'active', instances: 1, revenue: 97, joined: '12/10/2024' },
    { id: 't3', name: 'Estética Bella', plan: 'infinity', status: 'blocked', instances: 3, revenue: 897, joined: '01/09/2024' },
    { id: 't4', name: 'PsicoLife', plan: 'starter', status: 'active', instances: 1, revenue: 97, joined: '20/10/2024' },
    { id: 't5', name: 'Nexus Tech', plan: 'pro', status: 'active', instances: 2, revenue: 297, joined: '22/10/2024' },
];

const MRR_DATA = [
    { month: 'Jun', value: 1500 },
    { month: 'Jul', value: 2300 },
    { month: 'Ago', value: 3800 },
    { month: 'Set', value: 4200 },
    { month: 'Out', value: 5600 },
];

const SaaSAdminView: React.FC<SaaSAdminViewProps> = ({ showToast }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'tenants' | 'infra'>('dashboard');
    
    // Infra State
    const [infraConfig, setInfraConfig] = useState({
        evolutionUrl: '',
        evolutionKey: '',
        redisUrl: 'redis://localhost:6379',
        mongoUrl: 'mongodb://localhost:27017'
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const storedUrl = localStorage.getItem('evolution_url') || '';
        const storedKey = localStorage.getItem('evolution_key') || '';
        setInfraConfig(prev => ({ ...prev, evolutionUrl: storedUrl, evolutionKey: storedKey }));
    }, []);

    const handleSaveInfra = () => {
        setIsSaving(true);
        setTimeout(() => {
            localStorage.setItem('evolution_url', infraConfig.evolutionUrl);
            localStorage.setItem('evolution_key', infraConfig.evolutionKey);
            setIsSaving(false);
            showToast('Infraestrutura Atualizada', 'success', 'As configurações globais foram salvas e propagadas.');
        }, 1000);
    };

    return (
        <div className="flex-1 bg-zinc-50 p-8 overflow-y-auto h-full font-sans">
            <div className="max-w-7xl mx-auto space-y-8 pb-20">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-zinc-900 text-white text-[10px] font-bold uppercase rounded tracking-wider">Super Admin</span>
                            <h1 className="text-2xl font-bold text-zinc-900">Gestão do Ecossistema</h1>
                        </div>
                        <p className="text-zinc-500 text-sm">Controle total sobre tenants, faturamento e infraestrutura.</p>
                    </div>
                    
                    <div className="flex p-1 bg-white border border-zinc-200 rounded-lg shadow-sm">
                        <button 
                            onClick={() => setActiveTab('dashboard')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                        >
                            Visão Geral
                        </button>
                        <button 
                            onClick={() => setActiveTab('tenants')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'tenants' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                        >
                            Tenants (Clientes)
                        </button>
                        <button 
                            onClick={() => setActiveTab('infra')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'infra' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                        >
                            Infraestrutura
                        </button>
                    </div>
                </div>

                {/* --- DASHBOARD TAB --- */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* KPI CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={20}/></div>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900">R$ 5.600</h3>
                                <p className="text-xs text-zinc-500 uppercase font-medium mt-1">MRR (Receita Recorrente)</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20}/></div>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Total 42</span>
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900">38</h3>
                                <p className="text-xs text-zinc-500 uppercase font-medium mt-1">Tenants Ativos</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Activity size={20}/></div>
                                    <span className="text-xs font-bold text-zinc-500">v1.8.2</span>
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900">100%</h3>
                                <p className="text-xs text-zinc-500 uppercase font-medium mt-1">Uptime API</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Cpu size={20}/></div>
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900">12.4k</h3>
                                <p className="text-xs text-zinc-500 uppercase font-medium mt-1">Mensagens Hoje</p>
                            </div>
                        </div>

                        {/* GROWTH CHART */}
                        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                            <h3 className="font-bold text-zinc-900 mb-6">Crescimento de Receita (MRR)</h3>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={MRR_DATA}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7' }} />
                                        <Area type="monotone" dataKey="value" stroke="#18181b" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TENANTS TAB --- */}
                {activeTab === 'tenants' && (
                    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
                        <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
                            <div className="relative max-w-sm w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                <input type="text" placeholder="Buscar clínica ou email..." className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900" />
                            </div>
                            <button className="px-4 py-2 bg-zinc-900 text-white text-sm font-bold rounded-lg hover:bg-zinc-800 shadow-sm flex items-center gap-2">
                                <Users size={16} /> Novo Tenant
                            </button>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-zinc-50 border-b border-zinc-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Clínica</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Plano</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Receita</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {TENANTS.map(tenant => (
                                    <tr key={tenant.id} className="hover:bg-zinc-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center font-bold text-xs text-zinc-600">
                                                    {tenant.name.substring(0,2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-zinc-900">{tenant.name}</div>
                                                    <div className="text-xs text-zinc-500">ID: {tenant.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                                                tenant.plan === 'infinity' ? 'bg-zinc-900 text-white border-zinc-900' :
                                                tenant.plan === 'pro' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                'bg-zinc-50 text-zinc-600 border-zinc-200'
                                            }`}>
                                                {tenant.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`flex items-center gap-1.5 text-xs font-medium ${tenant.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${tenant.status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                                {tenant.status === 'active' ? 'Ativo' : 'Bloqueado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-zinc-600">
                                            R$ {tenant.revenue},00
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button title="Logar como este usuário (Impersonation)" className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded">
                                                    <LogIn size={16} />
                                                </button>
                                                <button title="Configurações" className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded">
                                                    <Settings size={16} />
                                                </button>
                                                <button title="Bloquear Acesso" className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded">
                                                    <Ban size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- INFRASTRUCTURE TAB --- */}
                {activeTab === 'infra' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
                        
                        {/* Evolution API Config */}
                        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <Server size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-900">Evolution API (WhatsApp)</h3>
                                    <p className="text-xs text-zinc-500">Configuração mestre da instância Docker.</p>
                                </div>
                                <div className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded border border-green-200 flex items-center gap-1">
                                    <CheckCircle2 size={12} /> Online
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Server URL</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={infraConfig.evolutionUrl}
                                            onChange={(e) => setInfraConfig({...infraConfig, evolutionUrl: e.target.value})}
                                            className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 font-mono text-zinc-600"
                                            placeholder="https://api.seusaas.com"
                                        />
                                        <Server size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    </div>
                                    <p className="text-[10px] text-zinc-400 mt-1">Endpoint público da API v1.</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Global API Key</label>
                                    <div className="relative">
                                        <input 
                                            type="password" 
                                            value={infraConfig.evolutionKey}
                                            onChange={(e) => setInfraConfig({...infraConfig, evolutionKey: e.target.value})}
                                            className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 font-mono text-zinc-600"
                                            placeholder="••••••••••••••••••••••••"
                                        />
                                        <Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    </div>
                                    <p className="text-[10px] text-zinc-400 mt-1">Chave mestra definida no AUTHENTICATION_API_KEY do .env.</p>
                                </div>
                            </div>
                        </div>

                        {/* Database & Cache */}
                        <div className="space-y-6">
                            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-red-50 text-red-600 rounded-lg"><Database size={20}/></div>
                                    <h3 className="font-bold text-zinc-900">Redis (Cache & Sessões)</h3>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-zinc-600 font-mono bg-zinc-50 p-2 rounded border border-zinc-100">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    {infraConfig.redisUrl}
                                </div>
                            </div>

                            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Database size={20}/></div>
                                    <h3 className="font-bold text-zinc-900">MongoDB (Persistência)</h3>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-zinc-600 font-mono bg-zinc-50 p-2 rounded border border-zinc-100">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    {infraConfig.mongoUrl}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button 
                                    onClick={handleSaveInfra}
                                    disabled={isSaving}
                                    className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl shadow-lg hover:bg-zinc-800 transition-all flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isSaving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18} />}
                                    Salvar Configurações Globais
                                </button>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default SaaSAdminView;
