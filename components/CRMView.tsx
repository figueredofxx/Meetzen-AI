
import React, { useState } from 'react';
import { 
  Plus, DollarSign, Tag, Filter, Search, MoreHorizontal, Clock, 
  ArrowUpRight, TrendingUp, Users, Wallet, X, Phone, Calendar, 
  FileText, MessageCircle, Send, User, ChevronRight, GripVertical, Loader2, Edit, Trash2, ArrowRightCircle, Lock
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { CRMLead, CRMServiceHistory, PlanType } from '../types';

interface CRMViewProps {
    userPlan?: PlanType;
    onChangePlan?: () => void;
}

// --- MOCK DATA ---

const MOCK_LEADS: CRMLead[] = [
  { 
    id: '1', 
    name: 'Fernanda Lima', 
    phone: '11999991111', 
    email: 'nanda.lima@email.com',
    status: 'leads', 
    value: 0, 
    totalSpent: 450, 
    createdAt: '2024-10-01', 
    lastContact: '10 min atrás', 
    source: 'Instagram', 
    serviceInterest: 'Avaliação Geral', 
    tags: ['Novo', 'Instagram'],
    history: [
        { id: 'h1', serviceName: 'Limpeza Simples', date: '2024-05-10', value: 150, professional: 'Dr. Pedro' },
        { id: 'h2', serviceName: 'Consulta Rotina', date: '2024-01-15', value: 300, professional: 'Dra. Ana' }
    ]
  },
  { 
    id: '2', 
    name: 'Roberto Carlos', 
    phone: '11988882222', 
    email: 'rc.rei@email.com',
    status: 'leads', 
    value: 1250, 
    totalSpent: 0, 
    createdAt: '2024-10-24', 
    lastContact: '2h atrás', 
    source: 'Indicação', 
    serviceInterest: 'Implante', 
    tags: ['Indicação', 'Alto Valor'],
    history: []
  },
  { 
    id: '4', 
    name: 'Ricardo Alves', 
    phone: '11977773333', 
    status: 'negotiation', 
    value: 3000, 
    totalSpent: 12000, 
    createdAt: '2024-09-15', 
    lastContact: 'Ontem', 
    source: 'Google Ads', 
    serviceInterest: 'Harmonização', 
    tags: ['VIP', 'Retorno'],
    history: [
         { id: 'h3', serviceName: 'Botox Testa', date: '2024-02-20', value: 1500, professional: 'Dra. Ana' },
         { id: 'h4', serviceName: 'Preenchimento Labial', date: '2023-11-10', value: 1800, professional: 'Dra. Ana' }
    ]
  },
  { 
    id: '6', 
    name: 'Ana Silva', 
    phone: '11966664444', 
    status: 'scheduled', 
    value: 250, 
    totalSpent: 2500, 
    createdAt: '2024-01-15', 
    lastContact: 'Hoje, 09:00', 
    source: 'Base Antiga', 
    serviceInterest: 'Limpeza', 
    tags: ['Confirmado'],
    history: [
        { id: 'h5', serviceName: 'Clareamento', date: '2024-03-01', value: 1200, professional: 'Dr. Pedro' }
    ]
  },
  { 
    id: '8', 
    name: 'Mariana Costa', 
    phone: '21955556666', 
    status: 'payment', 
    value: 2100, 
    totalSpent: 2100, 
    createdAt: '2024-10-20', 
    lastContact: 'Hoje, 09h', 
    source: 'Instagram', 
    serviceInterest: 'Botox (Sessão 1)', 
    tags: ['Pendente Pix'],
    history: []
  }
];

const COLUMNS = [
    { id: 'leads', title: 'Novos Leads', color: 'border-zinc-200' },
    { id: 'negotiation', title: 'Em Negociação', color: 'border-blue-200' },
    { id: 'scheduled', title: 'Agendados', color: 'border-green-200' },
    { id: 'payment', title: 'Pagamento / Final', color: 'border-purple-200' }
];

const CHART_DATA = [
    { name: '01', leads: 4, sales: 2 },
    { name: '05', leads: 6, sales: 3 },
    { name: '10', leads: 8, sales: 4 },
    { name: '15', leads: 12, sales: 8 },
    { name: '20', leads: 10, sales: 6 },
    { name: '25', leads: 15, sales: 10 },
];

const WhatsAppIcon = ({ size = 18, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
  >
    <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path>
  </svg>
);

const CRMView: React.FC<CRMViewProps> = ({ userPlan = 'nexus', onChangePlan }) => {
  const [leads, setLeads] = useState<CRMLead[]>(MOCK_LEADS);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({ name: '', phone: '', value: 0 });
  const [activeMenuLeadId, setActiveMenuLeadId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const isStarter = userPlan === 'starter';

  // --- DRAG AND DROP HANDLERS ---

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLeadId(leadId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedLeadId) return;

    setLeads(prev => prev.map(lead => {
        if (lead.id === draggedLeadId) {
            return { ...lead, status: targetColumnId as any };
        }
        return lead;
    }));
    setDraggedLeadId(null);
  };

  // --- ACTIONS & NEW LEAD ---

  const handleOpenNewLead = () => {
      setNewLeadData({ name: '', phone: '', value: 0 });
      setIsNewLeadModalOpen(true);
  };

  const handleCreateLead = () => {
      if (!newLeadData.name) return;
      const newLead: CRMLead = {
          id: Date.now().toString(),
          name: newLeadData.name,
          phone: newLeadData.phone,
          value: newLeadData.value,
          status: 'leads',
          totalSpent: 0,
          createdAt: new Date().toISOString(),
          lastContact: 'Agora',
          source: 'Manual',
          serviceInterest: 'Novo Cadastro',
          tags: ['Novo'],
          history: []
      };
      setLeads(prev => [newLead, ...prev]);
      setIsNewLeadModalOpen(false);
  };

  const handleMenuAction = (action: string, leadId: string) => {
      setActiveMenuLeadId(null);
      if (action === 'delete') {
          if (window.confirm('Tem certeza que deseja arquivar este lead?')) {
              setLeads(prev => prev.filter(l => l.id !== leadId));
          }
          return;
      }
      if (action === 'edit') {
          const lead = leads.find(l => l.id === leadId);
          if (lead) setSelectedLead(lead);
          return;
      }
      if (action === 'move_next') {
          setLeads(prev => prev.map(l => {
              if (l.id === leadId) {
                  const currentIndex = COLUMNS.findIndex(c => c.id === l.status);
                  const nextStatus = COLUMNS[currentIndex + 1]?.id || l.status;
                  return { ...l, status: nextStatus as any };
              }
              return l;
          }));
      }
  };

  const handleSendMessage = () => {
      if (!messageText.trim()) return;
      setIsSendingMessage(true);
      setTimeout(() => {
          setIsSendingMessage(false);
          setMessageText('');
          alert('Mensagem enviada com sucesso! (Via Evolution API)');
      }, 1500);
  };

  const getColumnTotal = (columnId: string) => {
      return leads
        .filter(l => l.status === columnId)
        .reduce((acc, curr) => acc + curr.value, 0);
  };

  return (
    <div className="relative flex-1 h-full overflow-hidden">
        {/* --- LOCK OVERLAY FOR STARTER PLAN --- */}
        {isStarter && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-md transition-all">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border border-zinc-200 max-w-md text-center transform scale-100 animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-200 text-white">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2">CRM Visual & Vendas</h2>
                    <p className="text-zinc-500 mb-6 leading-relaxed">
                        O Plano Zen Starter foca na sua agenda. Para visualizar seu funil de vendas, calcular receita e gerenciar leads em Kanban, migre para o <strong>Plano Zen Pro</strong>.
                    </p>
                    
                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-2 text-sm text-zinc-600 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                            <ArrowRightCircle size={16} className="text-green-500 flex-shrink-0"/>
                            <span>Pipeline Visual (Kanban)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-600 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                            <ArrowRightCircle size={16} className="text-green-500 flex-shrink-0"/>
                            <span>Cálculo de Receita em Potencial</span>
                        </div>
                    </div>

                    <button 
                    onClick={onChangePlan}
                    className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        Desbloquear com Zen Pro
                    </button>
                </div>
            </div>
        )}

        {/* --- MAIN CONTENT (Blurred if Locked) --- */}
        <div 
            className={`flex-1 bg-zinc-50/50 p-4 md:p-8 overflow-y-hidden flex flex-col h-full ${isStarter ? 'pointer-events-none select-none opacity-80 overflow-hidden' : ''}`} 
            onClick={() => !isStarter && setActiveMenuLeadId(null)}
        >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 flex-shrink-0">
                <div>
                <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                    CRM & Vendas
                </h1>
                <p className="text-zinc-500 text-sm mt-1">Gerencie seu pipeline arrastando os cards.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button 
                        onClick={handleOpenNewLead}
                        className="flex-1 md:flex-none justify-center px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 shadow-sm flex items-center gap-2 transition-all active:scale-95"
                    >
                    <Plus size={16} /> Novo Lead
                    </button>
                </div>
            </div>

            {/* METRICS */}
            <div className="hidden md:grid grid-cols-3 gap-6 mb-6 flex-shrink-0">
                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs text-zinc-500 font-medium uppercase">Novos Leads (30d)</span>
                            <span className="text-2xl font-bold text-zinc-900 block mt-1">45</span>
                        </div>
                        <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600"><Users size={16}/></div>
                    </div>
                    <div className="mt-2 h-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={CHART_DATA}><Line type="monotone" dataKey="leads" stroke="#18181b" strokeWidth={2} dot={false} /></LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs text-zinc-500 font-medium uppercase">Em Negociação</span>
                            <span className="text-2xl font-bold text-zinc-900 block mt-1">R$ 12.400</span>
                        </div>
                        <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600"><Wallet size={16}/></div>
                    </div>
                    <div className="w-full bg-zinc-100 h-1.5 rounded-full mt-auto overflow-hidden">
                        <div className="bg-blue-600 h-full" style={{ width: '65%' }}></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs text-zinc-500 font-medium uppercase">Taxa Conversão</span>
                            <span className="text-2xl font-bold text-zinc-900 block mt-1">22%</span>
                        </div>
                        <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600"><TrendingUp size={16}/></div>
                    </div>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-auto font-medium"><ArrowUpRight size={12}/> +4% vs mês anterior</p>
                </div>
            </div>

            {/* KANBAN BOARD */}
            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex h-full gap-4 min-w-[1000px] md:min-w-0">
                    {COLUMNS.map(column => {
                        const columnLeads = leads.filter(l => l.status === column.id);
                        const totalValue = getColumnTotal(column.id);

                        return (
                            <div 
                                key={column.id}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, column.id)}
                                className={`flex flex-col h-full w-80 md:w-1/4 bg-zinc-100/50 rounded-xl border ${column.color} transition-colors`}
                            >
                                <div className="p-3 border-b border-zinc-200/50 flex justify-between items-center bg-white/50 rounded-t-xl backdrop-blur-sm">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm text-zinc-700">{column.title}</h3>
                                        <span className="bg-zinc-200 text-zinc-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{columnLeads.length}</span>
                                    </div>
                                    <span className="text-xs font-medium text-zinc-500">R$ {totalValue.toLocaleString()}</span>
                                </div>

                                <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                                    {columnLeads.map(lead => (
                                        <div
                                            key={lead.id}
                                            draggable={!isStarter}
                                            onDragStart={(e) => handleDragStart(e, lead.id)}
                                            onClick={() => setSelectedLead(lead)}
                                            className={`
                                                bg-white p-3 rounded-lg border border-zinc-200 shadow-sm cursor-grab active:cursor-grabbing
                                                hover:shadow-md hover:border-zinc-300 transition-all group relative
                                                ${draggedLeadId === lead.id ? 'opacity-50 border-dashed border-zinc-400' : ''}
                                            `}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex flex-wrap gap-1">
                                                    {lead.tags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="px-1.5 py-0.5 rounded bg-zinc-50 text-[10px] font-medium text-zinc-500 border border-zinc-100">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <GripVertical size={14} className="text-zinc-300 opacity-0 group-hover:opacity-100" />
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveMenuLeadId(activeMenuLeadId === lead.id ? null : lead.id);
                                                        }}
                                                        className="p-1 text-zinc-300 hover:text-zinc-600 hover:bg-zinc-100 rounded opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <MoreHorizontal size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {activeMenuLeadId === lead.id && (
                                                <div className="absolute right-2 top-8 w-40 bg-white border border-zinc-200 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                                    <button onClick={(e) => { e.stopPropagation(); handleMenuAction('edit', lead.id); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 text-left border-b border-zinc-50">
                                                        <Edit size={12} /> Editar
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); handleMenuAction('move_next', lead.id); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 text-left border-b border-zinc-50">
                                                        <ArrowRightCircle size={12} /> Avançar Etapa
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); handleMenuAction('delete', lead.id); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 text-left">
                                                        <Trash2 size={12} /> Arquivar
                                                    </button>
                                                </div>
                                            )}

                                            <h4 className="font-bold text-zinc-900 text-sm">{lead.name}</h4>
                                            <p className="text-xs text-zinc-500 mb-3">{lead.serviceInterest}</p>

                                            <div className="flex items-center justify-between pt-2 border-t border-zinc-50">
                                                <span className="text-xs font-semibold text-zinc-900">
                                                    {lead.value > 0 ? `R$ ${lead.value}` : 'R$ 0'}
                                                </span>
                                                <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                                                    <Clock size={10} /> {lead.lastContact}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* NEW LEAD MODAL */}
            {isNewLeadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-zinc-900">Novo Lead</h3>
                            <button onClick={() => setIsNewLeadModalOpen(false)}><X size={20} className="text-zinc-400 hover:text-zinc-600"/></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-700 mb-1">Nome</label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                                    value={newLeadData.name}
                                    onChange={(e) => setNewLeadData({...newLeadData, name: e.target.value})}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-700 mb-1">Telefone</label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                                    value={newLeadData.phone}
                                    onChange={(e) => setNewLeadData({...newLeadData, phone: e.target.value})}
                                    placeholder="11999999999"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-700 mb-1">Valor Estimado (R$)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                                    value={newLeadData.value}
                                    onChange={(e) => setNewLeadData({...newLeadData, value: Number(e.target.value)})}
                                />
                            </div>
                            <button 
                                onClick={handleCreateLead}
                                className="w-full py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors"
                            >
                                Criar Lead
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* LEAD DETAIL MODAL / SLIDE OVER */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex justify-end" role="dialog">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedLead(null)} />
                    
                    <div className="relative w-full md:w-[480px] bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col overflow-hidden">
                        
                        {/* Modal Header */}
                        <div className="p-6 border-b border-zinc-100 flex justify-between items-start bg-zinc-50/50">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                                        {selectedLead.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-zinc-900 leading-none">{selectedLead.name}</h2>
                                        <p className="text-sm text-zinc-500 mt-1 flex items-center gap-1">
                                            <Phone size={12} /> {selectedLead.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {selectedLead.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-white border border-zinc-200 rounded text-xs font-medium text-zinc-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => setSelectedLead(null)} className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            
                            {/* Evolution API Message Sender */}
                            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-zinc-600 uppercase flex items-center gap-1.5">
                                        <MessageCircle size={14} className="text-green-600"/> Enviar Mensagem Rápida
                                    </label>
                                    <span className="text-[10px] text-zinc-400 bg-white px-2 py-0.5 rounded border border-zinc-100">Evolution API</span>
                                </div>
                                <div className="relative">
                                    <textarea
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder={`Olá ${selectedLead.name.split(' ')[0]}, tudo bem?`}
                                        className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 resize-none h-24 placeholder:text-zinc-400"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={isSendingMessage || !messageText.trim()}
                                        className="absolute bottom-2 right-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSendingMessage ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                    </button>
                                </div>
                                <div className="flex justify-end">
                                    <button 
                                        onClick={() => window.open(`https://wa.me/${selectedLead.phone}`, '_blank')}
                                        className="text-[10px] text-zinc-400 hover:text-green-600 flex items-center gap-1"
                                    >
                                        <WhatsAppIcon size={12} /> Abrir no WhatsApp Web
                                    </button>
                                </div>
                            </div>

                            {/* Stage Selector */}
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Estágio do Pipeline</label>
                                <select 
                                    value={selectedLead.status}
                                    onChange={(e) => {
                                        setLeads(prev => prev.map(l => l.id === selectedLead.id ? {...l, status: e.target.value as any} : l));
                                        setSelectedLead(prev => prev ? {...prev, status: e.target.value as any} : null);
                                    }}
                                    className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    {COLUMNS.map(col => (
                                        <option key={col.id} value={col.id}>{col.title}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                                    <span className="text-xs text-zinc-400 flex items-center gap-1 mb-1"><Calendar size={12}/> Cadastro</span>
                                    <span className="text-sm font-bold text-zinc-900">{new Date(selectedLead.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                                    <span className="text-xs text-zinc-400 flex items-center gap-1 mb-1"><DollarSign size={12}/> Total Gasto (LTV)</span>
                                    <span className="text-sm font-bold text-green-700">R$ {selectedLead.totalSpent.toLocaleString()}</span>
                                </div>
                                <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 col-span-2">
                                    <span className="text-xs text-zinc-400 flex items-center gap-1 mb-1"><User size={12}/> Origem / Canal</span>
                                    <span className="text-sm font-bold text-zinc-900">{selectedLead.source}</span>
                                </div>
                            </div>

                            {/* Service History */}
                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                    <FileText size={16} /> Histórico de Procedimentos
                                </h3>
                                {selectedLead.history.length > 0 ? (
                                    <div className="border border-zinc-200 rounded-xl overflow-hidden">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-zinc-50 border-b border-zinc-200">
                                                <tr>
                                                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs">Serviço</th>
                                                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs">Data</th>
                                                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs text-right">Valor</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-100">
                                                {selectedLead.history.map(h => (
                                                    <tr key={h.id}>
                                                        <td className="px-4 py-3 text-zinc-900 font-medium">{h.serviceName}</td>
                                                        <td className="px-4 py-3 text-zinc-500 text-xs">{new Date(h.date).toLocaleDateString()}</td>
                                                        <td className="px-4 py-3 text-zinc-900 font-medium text-right">R$ {h.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                            <FileText size={20} className="text-zinc-300" />
                                        </div>
                                        <p className="text-sm font-medium text-zinc-900">Nenhum histórico</p>
                                        <p className="text-xs text-zinc-500 max-w-[200px] mt-1">Este cliente ainda não realizou procedimentos registrados.</p>
                                        <button className="mt-4 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 text-xs font-bold rounded-lg hover:bg-zinc-50 shadow-sm transition-all">
                                            Adicionar Manualmente
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default CRMView;
