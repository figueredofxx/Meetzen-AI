
import React, { useState } from 'react';
import { 
  CreditCard, Check, Zap, Download, Shield, AlertTriangle, 
  ChevronRight, Calendar, FileText, Star, ArrowUpRight, X, Loader2, Lock, Smartphone, Users,
  HardDrive, MessageSquare, CreditCard as CardIcon
} from 'lucide-react';
import { ToastType, PlanType } from '../types';

interface SettingsViewProps {
  showToast?: (title: string, type: ToastType, message?: string) => void;
  userPlan: PlanType;
  onChangePlan: (plan: PlanType) => void;
}

const PLANS: {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  features: string[];
  type: PlanType;
  recommended?: boolean;
}[] = [
  {
    id: 'starter',
    name: 'Zen Starter',
    price: { monthly: 97, yearly: 931 },
    features: ['Até 2 Usuários', '1 WhatsApp', 'Agenda Automática', 'Templates Básicos', 'Sem CRM/BI'],
    type: 'starter',
  },
  {
    id: 'pro',
    name: 'Zen Pro',
    price: { monthly: 297, yearly: 2851 },
    features: ['Até 10 Usuários', 'CRM & Funil de Vendas', 'IA Treinável (PDFs)', 'Cobrança Pix Auto', 'Relatórios de BI'],
    recommended: true,
    type: 'pro',
  }
];

const INVOICES = [
  { id: 'INV-2024-001', date: '01 Out 2025', amount: 'R$ 97,00', status: 'Pago', card: '•••• 4242' },
  { id: 'INV-2024-002', date: '01 Set 2025', amount: 'R$ 97,00', status: 'Pago', card: '•••• 4242' },
];

const FULL_INVOICES = [
    ...INVOICES,
    { id: 'INV-2024-003', date: '01 Ago 2025', amount: 'R$ 97,00', status: 'Pago', card: '•••• 4242' },
    { id: 'INV-2024-004', date: '01 Jul 2025', amount: 'R$ 97,00', status: 'Pago', card: '•••• 4242' },
    { id: 'INV-2024-005', date: '01 Jun 2025', amount: 'R$ 97,00', status: 'Pago', card: '•••• 4242' },
    { id: 'INV-2024-006', date: '01 Mai 2025', amount: 'R$ 97,00', status: 'Pago', card: '•••• 4242' },
    { id: 'INV-2024-007', date: '01 Abr 2025', amount: 'R$ 97,00', status: 'Pago', card: '•••• 4242' },
];

const SettingsView: React.FC<SettingsViewProps> = ({ showToast, userPlan, onChangePlan }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  
  // Modals State
  const [modals, setModals] = useState({
      limits: false,
      card: false,
      history: false
  });
  
  const [cardData, setCardData] = useState({ name: '', number: '', expiry: '', cvc: '' });
  const [isSavingCard, setIsSavingCard] = useState(false);

  const currentPlan = PLANS.find(p => p.type === userPlan) || PLANS[0];
  const isInfinity = userPlan === 'infinity';

  // Mock Usage Data
  const usage = {
      users: { current: userPlan === 'starter' ? 2 : 4, limit: userPlan === 'starter' ? 2 : userPlan === 'pro' ? 10 : 999, label: 'Usuários Ativos' },
      whatsapp: { current: 1, limit: userPlan === 'infinity' ? 99 : 1, label: 'Conexões WhatsApp' },
      messages: { current: 8450, limit: 10000, label: 'Mensagens / mês' },
      storage: { current: 1.2, limit: 5, label: 'Armazenamento (GB)' }
  };

  const handleUpdatePlan = (planId: string) => {
    setIsLoading(planId);
    setTimeout(() => {
        onChangePlan(planId as PlanType);
        setIsLoading(null);
        if (showToast) showToast('Plano Atualizado', 'success', `Você migrou para o plano ${planId === 'pro' ? 'Zen Pro' : 'Zen Starter'}.`);
    }, 1500);
  };

  const toggleModal = (key: keyof typeof modals, value: boolean) => {
      setModals(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveCard = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSavingCard(true);
      setTimeout(() => {
          setIsSavingCard(false);
          toggleModal('card', false);
          if(showToast) showToast('Cartão atualizado', 'success', 'Sua forma de pagamento foi alterada com sucesso.');
          setCardData({ name: '', number: '', expiry: '', cvc: '' });
      }, 1500);
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto pb-20">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Assinatura & Faturamento</h1>
        <p className="text-zinc-500 mb-8">Gerencie seu plano, método de pagamento e notas fiscais.</p>

        {/* Current Plan Card */}
        <div className="bg-zinc-900 text-white rounded-2xl p-8 mb-10 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-sm">Plano Atual</span>
                        {isInfinity && <span className="flex items-center gap-1 text-yellow-400 text-xs font-bold"><Star size={12} fill="currentColor"/> INFINITY</span>}
                    </div>
                    <h2 className="text-3xl font-bold mb-1">{isInfinity ? 'Zen Infinity' : currentPlan.name}</h2>
                    <p className="text-zinc-400 text-sm">Renova em 01 de Novembro de 2025</p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => toggleModal('limits', true)}
                        className="px-4 py-2 bg-transparent border border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
                    >
                        Gerenciar Limites
                    </button>
                    {!isInfinity && (
                        <button className="px-6 py-2 bg-white text-zinc-900 rounded-lg text-sm font-bold hover:bg-zinc-100 transition-colors shadow-lg">
                            Fazer Upgrade
                        </button>
                    )}
                </div>
            </div>

            {/* Quick Stats Mini Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Valor Mensal</p>
                    <p className="text-xl font-mono">R$ {isInfinity ? '897' : currentPlan.price.monthly},00</p>
                </div>
                <div>
                    <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Status</p>
                    <p className="text-green-400 font-bold flex items-center gap-2"><Check size={16}/> Ativo</p>
                </div>
                <div>
                    <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Próxima Fatura</p>
                    <p className="text-white font-medium">01/11/2025</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Payment Method */}
            <div className="lg:col-span-2 space-y-8">
                <section>
                    <h3 className="text-lg font-bold text-zinc-900 mb-4">Método de Pagamento</h3>
                    <div className="bg-white border border-zinc-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-zinc-900 rounded flex items-center justify-center text-white">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-zinc-900 text-sm">Mastercard final 4242</p>
                                <p className="text-xs text-zinc-500">Expira em 12/2028</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => toggleModal('card', true)}
                            className="text-sm text-primary font-bold hover:underline"
                        >
                            Alterar
                        </button>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-zinc-900">Histórico de Faturas</h3>
                        <button 
                            onClick={() => toggleModal('history', true)}
                            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                        >
                            Ver todas <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 border-b border-zinc-200">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-zinc-500">Data</th>
                                    <th className="px-6 py-3 font-medium text-zinc-500">Valor</th>
                                    <th className="px-6 py-3 font-medium text-zinc-500">Status</th>
                                    <th className="px-6 py-3 font-medium text-zinc-500 text-right">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {INVOICES.map(inv => (
                                    <tr key={inv.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-6 py-4 text-zinc-900">{inv.date}</td>
                                        <td className="px-6 py-4 text-zinc-900 font-medium">{inv.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                                                <Download size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* Plan Switcher / Available Plans */}
            <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-4">Planos Disponíveis</h3>
                <div className="space-y-4">
                    {PLANS.map(plan => {
                        const isActive = userPlan === plan.type;
                        return (
                            <div key={plan.id} className={`p-5 rounded-xl border transition-all ${isActive ? 'bg-zinc-50 border-zinc-300 ring-1 ring-zinc-200' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-zinc-900">{plan.name}</h4>
                                    {isActive ? (
                                        <span className="bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded">ATUAL</span>
                                    ) : plan.recommended ? (
                                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">INDICADO</span>
                                    ) : null}
                                </div>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-2xl font-bold text-zinc-900">R$ {plan.price.monthly}</span>
                                    <span className="text-xs text-zinc-500">/mês</span>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    {plan.features.slice(0, 3).map((feat, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                                            <Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                {!isActive && (
                                    <button 
                                        onClick={() => handleUpdatePlan(plan.id)}
                                        disabled={!!isLoading}
                                        className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                                            plan.recommended 
                                                ? 'bg-primary text-white hover:bg-primary-hover shadow-sm' 
                                                : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                                        }`}
                                    >
                                        {isLoading === plan.id ? <Loader2 size={16} className="animate-spin" /> : (
                                            plan.type === 'pro' ? 'Fazer Upgrade' : 'Downgrade'
                                        )}
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                    <h4 className="text-sm font-bold text-yellow-800 flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} /> Precisa de mais?
                    </h4>
                    <p className="text-xs text-yellow-700 mb-3">
                        Para operações de grande escala, conheça o plano <strong>Zen Infinity</strong> com IA ilimitada e Whitelabel.
                    </p>
                    <button onClick={() => onChangePlan('infinity')} className="text-xs font-bold text-yellow-800 underline">Falar com consultor</button>
                </div>
            </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. LIMITS MODAL */}
      {modals.limits && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
                  <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-zinc-900">Limites de Uso</h3>
                      <button onClick={() => toggleModal('limits', false)}><X size={20} className="text-zinc-400 hover:text-zinc-600"/></button>
                  </div>
                  <div className="p-6 space-y-6">
                      
                      {/* Users Limit */}
                      <div>
                          <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium text-zinc-700 flex items-center gap-2"><Users size={16} /> {usage.users.label}</span>
                              <span className="text-zinc-500">{usage.users.current} / {usage.users.limit === 999 ? '∞' : usage.users.limit}</span>
                          </div>
                          <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${Math.min(100, (usage.users.current / usage.users.limit) * 100)}%` }}></div>
                          </div>
                      </div>

                      {/* WhatsApp Limit */}
                      <div>
                          <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium text-zinc-700 flex items-center gap-2"><Smartphone size={16} /> {usage.whatsapp.label}</span>
                              <span className="text-zinc-500">{usage.whatsapp.current} / {usage.whatsapp.limit}</span>
                          </div>
                          <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${usage.whatsapp.current >= usage.whatsapp.limit ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${(usage.whatsapp.current / usage.whatsapp.limit) * 100}%` }}></div>
                          </div>
                      </div>

                      {/* Messages Limit */}
                      <div>
                          <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium text-zinc-700 flex items-center gap-2"><MessageSquare size={16} /> {usage.messages.label}</span>
                              <span className="text-zinc-500">{usage.messages.current.toLocaleString()} / {usage.messages.limit.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-purple-600 h-full rounded-full" style={{ width: `${(usage.messages.current / usage.messages.limit) * 100}%` }}></div>
                          </div>
                          {usage.messages.current > 8000 && <p className="text-xs text-amber-600 mt-1 flex items-center gap-1"><AlertTriangle size={10}/> Você usou 85% do seu limite mensal.</p>}
                      </div>

                      {/* Storage Limit */}
                      <div>
                          <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium text-zinc-700 flex items-center gap-2"><HardDrive size={16} /> {usage.storage.label}</span>
                              <span className="text-zinc-500">{usage.storage.current}GB / {usage.storage.limit}GB</span>
                          </div>
                          <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-zinc-600 h-full rounded-full" style={{ width: `${(usage.storage.current / usage.storage.limit) * 100}%` }}></div>
                          </div>
                      </div>

                  </div>
                  <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-end">
                      {userPlan !== 'infinity' && (
                          <button onClick={() => { toggleModal('limits', false); onChangePlan('pro'); }} className="px-4 py-2 bg-zinc-900 text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors">
                              Aumentar Limites
                          </button>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* 2. CARD MODAL */}
      {modals.card && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
                  <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-zinc-900">Atualizar Cartão</h3>
                      <button onClick={() => toggleModal('card', false)}><X size={20} className="text-zinc-400 hover:text-zinc-600"/></button>
                  </div>
                  <form onSubmit={handleSaveCard} className="p-6 space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Nome no Cartão</label>
                          <input 
                            type="text" 
                            required
                            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-900"
                            placeholder="COMO NO CARTAO"
                            value={cardData.name}
                            onChange={e => setCardData({...cardData, name: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Número do Cartão</label>
                          <div className="relative">
                              <input 
                                type="text" 
                                required
                                className="w-full pl-10 pr-3 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-900"
                                placeholder="0000 0000 0000 0000"
                                value={cardData.number}
                                onChange={e => setCardData({...cardData, number: e.target.value})}
                              />
                              <CardIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Validade</label>
                              <input 
                                type="text" 
                                required
                                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-900"
                                placeholder="MM/AA"
                                value={cardData.expiry}
                                onChange={e => setCardData({...cardData, expiry: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">CVC</label>
                              <input 
                                type="text" 
                                required
                                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-900"
                                placeholder="123"
                                value={cardData.cvc}
                                onChange={e => setCardData({...cardData, cvc: e.target.value})}
                              />
                          </div>
                      </div>
                      <div className="pt-2">
                          <button 
                            type="submit" 
                            disabled={isSavingCard}
                            className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                          >
                              {isSavingCard ? <Loader2 size={18} className="animate-spin"/> : <Check size={18} />}
                              Salvar Novo Cartão
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* 3. HISTORY MODAL */}
      {modals.history && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[80vh]">
                  <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/80 backdrop-blur-sm">
                      <h3 className="text-lg font-bold text-zinc-900">Histórico de Faturas</h3>
                      <button onClick={() => toggleModal('history', false)}><X size={20} className="text-zinc-400 hover:text-zinc-600"/></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-0">
                      <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 border-b border-zinc-200 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-zinc-500">ID</th>
                                    <th className="px-6 py-3 font-medium text-zinc-500">Data</th>
                                    <th className="px-6 py-3 font-medium text-zinc-500">Valor</th>
                                    <th className="px-6 py-3 font-medium text-zinc-500">Cartão</th>
                                    <th className="px-6 py-3 font-medium text-zinc-500 text-right">PDF</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {FULL_INVOICES.map(inv => (
                                    <tr key={inv.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-6 py-4 text-zinc-500 text-xs font-mono">{inv.id}</td>
                                        <td className="px-6 py-4 text-zinc-900">{inv.date}</td>
                                        <td className="px-6 py-4 text-zinc-900 font-bold">{inv.amount}</td>
                                        <td className="px-6 py-4 text-zinc-500">{inv.card}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:text-primary-hover font-medium text-xs flex items-center justify-end gap-1 w-full">
                                                <Download size={14} /> Baixar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                  </div>
                  <div className="p-4 border-t border-zinc-100 bg-zinc-50 text-center">
                      <button onClick={() => toggleModal('history', false)} className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Fechar</button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default SettingsView;
