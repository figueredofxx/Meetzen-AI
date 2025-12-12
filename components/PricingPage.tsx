import React, { useState } from 'react';
import { 
  Check, X, Zap, HelpCircle, ArrowRight, Minus, 
  Calculator, TrendingUp, Shield, Star, CheckCircle2, Crown, Lock
} from 'lucide-react';
import { LogoMeetZen } from './Sidebar';

interface PricingPageProps {
  onBack: () => void;
  onEnterApp: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack, onEnterApp }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  // ROI Calculator State
  const [ticketValue, setTicketValue] = useState(250);
  const [lostPatients, setLostPatients] = useState(4);

  // ROI Logic
  const monthlyRevenueLost = ticketValue * lostPatients;
  const proCost = billingPeriod === 'monthly' ? 297 : 237; 
  const recoveredPatientsNeeded = Math.ceil(proCost / ticketValue);
  const potentialProfit = monthlyRevenueLost - proCost;

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 animate-in slide-in-from-bottom-4 duration-500 overflow-y-auto">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-md group-hover:bg-primary transition-colors">
              <LogoMeetZen size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">Meet Zen AI</span>
          </button>
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 hidden md:block">
                Voltar para Home
             </button>
             <button onClick={onEnterApp} className="px-5 py-2 bg-zinc-900 text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/10">
                Testar Grátis
             </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-bold text-zinc-600 uppercase tracking-wide mb-6">
                <Shield size={14} /> Garantia de 7 dias
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight leading-tight">
                Um investimento que se <br className="hidden md:block"/> paga na primeira semana.
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                Escolha o plano ideal para o seu momento. Cancele a qualquer hora.
            </p>
        </div>

        {/* TOGGLE */}
        <div className="flex justify-center mb-16">
            <div className="bg-zinc-100 p-1 rounded-xl flex items-center relative">
                <button 
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all relative z-10 ${billingPeriod === 'monthly' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                    Mensal
                </button>
                <button 
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all relative z-10 flex items-center gap-2 ${billingPeriod === 'yearly' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                    Anual <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">-20%</span>
                </button>
            </div>
        </div>

        {/* PRICING CARDS */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-24">
            
            {/* STARTER */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 hover:border-zinc-300 transition-all group relative">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Zen Starter</h3>
                <p className="text-zinc-500 text-sm mb-8 h-10">Profissionais liberais que atendem sozinhos.</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-bold text-zinc-900 tracking-tighter">
                        R$ {billingPeriod === 'monthly' ? '97' : '77'}
                    </span>
                    <span className="text-zinc-400 font-medium">/mês</span>
                </div>

                <button onClick={onEnterApp} className="w-full py-4 border-2 border-zinc-200 text-zinc-900 font-bold rounded-xl hover:border-zinc-900 hover:bg-zinc-50 transition-all mb-10">
                    Começar
                </button>

                <div className="space-y-4">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Incluso:</p>
                    {[
                        'Até 2 Usuários', 
                        '1 WhatsApp', 
                        'Agenda Automática',
                        'Templates Básicos',
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                            <CheckCircle2 size={18} className="text-zinc-400 mt-0.5 flex-shrink-0" />
                            {item}
                        </div>
                    ))}
                    <div className="flex items-start gap-3 text-sm text-zinc-400">
                        <X size={18} className="mt-0.5 flex-shrink-0" />
                        Sem CRM / Financeiro
                    </div>
                </div>
            </div>

            {/* PRO PLAN */}
            <div className="bg-primary text-white p-8 rounded-3xl border border-primary relative shadow-2xl shadow-primary/20 transform lg:-translate-y-4 z-10">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-yellow-400 text-yellow-950 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                    Mais Vendido
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    Zen Pro
                </h3>
                <p className="text-white/80 text-sm mb-8 h-10">Clínicas pequenas e médias em crescimento.</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-bold text-white tracking-tighter">
                        R$ {billingPeriod === 'monthly' ? '297' : '237'}
                    </span>
                    <span className="text-zinc-200 font-medium">/mês</span>
                </div>

                <button onClick={onEnterApp} className="w-full py-4 bg-white text-primary font-bold rounded-xl hover:bg-zinc-50 hover:scale-[1.02] transition-all shadow-lg shadow-black/10 mb-10">
                    Testar Zen Pro
                </button>

                <div className="space-y-4">
                    <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">Tudo do Starter, mais:</p>
                    {[
                        'Até 10 Usuários', 
                        'CRM & Funil de Vendas', 
                        'IA Treinável (PDFs)',
                        'Cobrança Pix Auto',
                        'Relatórios de BI',
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-zinc-100">
                            <div className="mt-0.5 bg-white/20 p-0.5 rounded-full">
                                <Check size={12} className="text-white flex-shrink-0" />
                            </div>
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* INFINITY PLAN */}
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-white relative hover:border-zinc-700 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Zen Infinity <Crown size={16} className="text-yellow-400"/></h3>
                <p className="text-zinc-400 text-sm mb-8 h-10">Grandes redes e operações de alto volume.</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-bold text-white tracking-tighter">
                        R$ {billingPeriod === 'monthly' ? '897' : '717'}
                    </span>
                    <span className="text-zinc-500 font-medium">/mês</span>
                </div>

                <button onClick={onEnterApp} className="w-full py-4 border border-zinc-700 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all mb-10">
                    Falar com Consultor
                </button>

                <div className="space-y-4">
                    <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-4">Tudo do Pro, mais:</p>
                    {[
                        'Usuários Ilimitados', 
                        'Múltiplos WhatsApps', 
                        'IA Sem Limites',
                        'White-label (Sua Marca)',
                        'Suporte VIP',
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                            <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="max-w-5xl mx-auto mb-24">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8 text-center">Comparativo de Recursos</h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50">
                        <tr>
                            <th className="py-4 px-6 text-sm font-bold text-zinc-500 uppercase tracking-wider w-1/3">Recurso</th>
                            <th className="py-4 px-6 text-sm font-bold text-zinc-900 text-center w-1/5">Starter</th>
                            <th className="py-4 px-6 text-sm font-bold text-primary text-center w-1/5 bg-primary/5">Pro</th>
                            <th className="py-4 px-6 text-sm font-bold text-zinc-900 text-center w-1/5 bg-zinc-900 text-white">Infinity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 bg-white">
                        {[
                            { name: 'Usuários', starter: '2', pro: '10', infinity: '∞' },
                            { name: 'Conexões WhatsApp', starter: '1', pro: '1', infinity: 'Múltiplos' },
                            { name: 'Agenda Automática', starter: true, pro: true, infinity: true },
                            { name: 'Smart Reply (Sugestões)', starter: true, pro: true, infinity: true },
                            { name: 'Treinamento IA com PDF', starter: false, pro: true, infinity: true },
                            { name: 'CRM & Kanban', starter: false, pro: true, infinity: true },
                            { name: 'Financeiro (Pix)', starter: false, pro: true, infinity: true },
                            { name: 'Relatórios BI', starter: false, pro: true, infinity: true },
                            { name: 'API Aberta', starter: false, pro: false, infinity: true },
                            { name: 'White-label', starter: false, pro: false, infinity: true },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-zinc-50 transition-colors">
                                <td className="py-4 px-6 text-sm font-medium text-zinc-700">{row.name}</td>
                                <td className="py-4 px-6 text-center text-sm text-zinc-600">
                                    {typeof row.starter === 'boolean' ? (row.starter ? <Check size={18} className="mx-auto text-green-600"/> : <Minus size={18} className="mx-auto text-zinc-300"/>) : row.starter}
                                </td>
                                <td className="py-4 px-6 text-center text-sm font-bold text-primary bg-primary/5">
                                    {typeof row.pro === 'boolean' ? (row.pro ? <Check size={18} className="mx-auto text-primary"/> : <Minus size={18} className="mx-auto text-zinc-300"/>) : row.pro}
                                </td>
                                <td className="py-4 px-6 text-center text-sm font-bold text-zinc-900">
                                    {typeof row.infinity === 'boolean' ? (row.infinity ? <Check size={18} className="mx-auto text-zinc-900"/> : <Minus size={18} className="mx-auto text-zinc-300"/>) : row.infinity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* ROI CALCULATOR */}
        <section className="max-w-4xl mx-auto bg-zinc-50 rounded-3xl p-8 md:p-12 border border-zinc-200 mb-24">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 text-primary font-bold mb-2">
                            <Calculator size={20} />
                            Calculadora de Retorno
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-4">A conta fecha sozinha.</h2>
                        <p className="text-zinc-600">
                            Veja quanto você perde hoje com "no-shows" e pacientes sem resposta, e como o Zen Pro se paga recuperando apenas uma fração disso.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 flex justify-between">
                                <span>Valor médio da sua consulta/serviço</span>
                                <span className="text-primary">R$ {ticketValue}</span>
                            </label>
                            <input 
                                type="range" 
                                min="50" max="1000" step="10" 
                                value={ticketValue}
                                onChange={(e) => setTicketValue(Number(e.target.value))}
                                className="w-full accent-primary h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 flex justify-between">
                                <span>Pacientes perdidos/mês (No-show ou Vácuo)</span>
                                <span className="text-primary">{lostPatients} pacientes</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <button onClick={() => setLostPatients(Math.max(0, lostPatients - 1))} className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 font-bold">-</button>
                                <span className="flex-1 text-center font-bold text-xl text-zinc-900">{lostPatients}</span>
                                <button onClick={() => setLostPatients(lostPatients + 1)} className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 font-bold">+</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="relative z-10 space-y-6">
                        <div className="pb-6 border-b border-zinc-100">
                            <p className="text-xs md:text-sm text-zinc-500 font-medium mb-1">Receita Perdida Mensalmente</p>
                            <p className="text-2xl md:text-3xl font-bold text-red-500">R$ {monthlyRevenueLost.toLocaleString()}</p>
                        </div>
                        
                        <div>
                            <p className="text-sm text-zinc-900 font-bold mb-2 flex items-center gap-2">
                                <TrendingUp size={16} className="text-green-600"/> O veredito:
                            </p>
                            <p className="text-zinc-600 text-xs md:text-sm leading-relaxed">
                                Recupere <strong className="text-zinc-900 bg-yellow-100 px-1 rounded">{recoveredPatientsNeeded} pacientes</strong> para pagar o Plano Pro. O resto é lucro.
                            </p>
                        </div>

                        <button onClick={onEnterApp} className="w-full py-3 bg-zinc-900 text-white rounded-lg font-bold text-sm hover:bg-zinc-800 transition-colors">
                            Parar de Perder Dinheiro
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* 10. CTA FINAL */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-900 text-white border-b border-zinc-800 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Sua agenda cheia começa hoje.</h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
                  Não deixe mais nenhum cliente esperando. Dê o próximo passo para profissionalizar seu atendimento.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onClick={onEnterApp} className="w-full sm:w-auto px-10 py-5 bg-primary text-white text-lg font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/30 hover:scale-105 flex items-center justify-center gap-2">
                      Testar Meet Zen AI Agora <ArrowRight size={20} />
                  </button>
              </div>
              <p className="text-zinc-500 text-xs md:text-sm">Garantia de 7 dias ou seu dinheiro de volta.</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 md:py-12 px-6 border-t border-zinc-200 mt-12 text-zinc-500 text-center md:text-left">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center text-white">
                    <LogoMeetZen size={14} />
                 </div>
                 <span className="font-bold text-zinc-900">Meet Zen AI</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm">
                  <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
                  <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
                  <a href="#" className="hover:text-primary transition-colors">Suporte</a>
              </div>
              <div className="text-xs md:text-sm text-zinc-400">
                  © 2025 Meet Zen AI.
              </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PricingPage;