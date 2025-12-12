
import React, { useState } from 'react';
import { 
  Bot, Calendar, MessageSquare, Zap, ShieldCheck, CheckCircle2, 
  ArrowRight, Users, LayoutDashboard, FileText, Smartphone, 
  Link as LinkIcon, Lock, ChevronDown, ChevronUp, Sparkles, Brain, Clock, DollarSign, XCircle, Award, Target, ArrowLeft, Menu,
  Calculator, TrendingUp, Check, Minus, Crown
} from 'lucide-react';
import { LogoMeetZen } from './Sidebar';

interface LandingPageProps {
  onEnterApp: () => void;
  onGoToPricing?: () => void;
}

type FeaturePageType = 'home' | 'crm' | 'agenda' | 'ai';

const FeatureDetail: React.FC<{ 
    type: 'crm' | 'agenda' | 'ai', 
    onBack: () => void,
    onEnterApp: () => void
}> = ({ type, onBack, onEnterApp }) => {
    // ... (FeatureDetail content stays mostly the same, simplified for brevity in this response, keep existing logic)
    const content = {
        crm: {
            label: "CRM & Funil Pro",
            title: "Transforme conversas em dinheiro.",
            heroText: "Exclusivo do Plano Zen Pro. Organize leads automaticamente, veja quem pagou e calcule a previsão de receita da sua clínica.",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            bulletPoints: [
                "Pipeline Visual (Kanban) atualizado pela IA",
                "Filtro automático: Curiosos vs Compradores",
                "Cálculo de Receita em Potencial",
                "Tags automáticas (Ex: 'Vip', 'Caloteiro', 'Novo')"
            ],
            imageComponent: (
                <div className="w-full aspect-video bg-zinc-900 rounded-xl flex items-center justify-center p-4 md:p-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-x-0 top-0 h-10 bg-zinc-800 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 w-full h-full pt-6">
                        <div className="flex-1 bg-zinc-800/50 rounded-lg p-3 space-y-3">
                            <div className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase">Novos Leads</div>
                            <div className="bg-zinc-700 p-2 md:p-3 rounded text-zinc-200 text-xs md:text-sm">Maria (Interessada)</div>
                            <div className="bg-zinc-700 p-2 md:p-3 rounded text-zinc-200 text-xs md:text-sm">João (Dúvida preço)</div>
                        </div>
                        <div className="flex-1 bg-zinc-800/50 rounded-lg p-3 space-y-3 hidden md:block">
                            <div className="text-xs font-bold text-orange-400 uppercase">Em Negociação</div>
                             <div className="bg-zinc-700 p-3 rounded text-zinc-200 text-sm border-l-2 border-orange-500">Ana (Pediu Pix)</div>
                        </div>
                        <div className="flex-1 bg-zinc-800/50 rounded-lg p-3 space-y-3 hidden md:block">
                             <div className="text-xs font-bold text-green-400 uppercase">Venda Fechada</div>
                              <div className="bg-zinc-700 p-3 rounded text-zinc-200 text-sm border-l-2 border-green-500">Carlos (Pago)</div>
                        </div>
                    </div>
                </div>
            )
        },
        agenda: {
            label: "Agenda Zen",
            title: "Adeus, No-Show e buracos na agenda.",
            heroText: "Disponível em todos os planos. A única agenda que cobra confirmação, envia lembretes e preenche horários vagos sozinha.",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            bulletPoints: [
                "Sincronização bidirecional com Google Agenda",
                "Lembretes automáticos via WhatsApp (24h e 1h antes)",
                "Remarcação autônoma sem intervenção humana",
                "Visualização limpa de horários"
            ],
            imageComponent: (
                <div className="w-full aspect-video bg-white border border-zinc-200 rounded-xl flex items-center justify-center p-4 md:p-8 relative overflow-hidden shadow-2xl">
                     <div className="w-full h-full flex flex-col">
                         <div className="flex justify-between items-center mb-6">
                             <h3 className="font-bold text-zinc-900 text-base md:text-xl">Outubro 2025</h3>
                             <div className="flex gap-2">
                                 <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-100"></span>
                                 <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">+</span>
                             </div>
                         </div>
                         <div className="space-y-3">
                             <div className="flex gap-4 items-center">
                                 <span className="text-zinc-400 text-xs md:text-sm w-10">09:00</span>
                                 <div className="flex-1 bg-green-50 border border-green-200 p-2 md:p-3 rounded-lg border-l-4 border-l-green-500">
                                     <p className="font-bold text-green-900 text-xs md:text-sm">Limpeza - Ana Silva</p>
                                     <p className="text-[10px] md:text-xs text-green-700 flex items-center gap-1"><CheckCircle2 size={10}/> Confirmado</p>
                                 </div>
                             </div>
                              <div className="flex gap-4 items-center">
                                 <span className="text-zinc-400 text-xs md:text-sm w-10">10:00</span>
                                 <div className="flex-1 bg-zinc-50 border border-zinc-200 border-dashed p-2 md:p-3 rounded-lg flex items-center justify-center">
                                     <p className="text-zinc-400 text-xs md:text-sm font-medium">Horário Vago</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>
            )
        },
        ai: {
            label: "Inteligência Artificial 2.0",
            title: "Uma recepcionista sênior, custo de estagiário.",
            heroText: "No Plano Zen Pro, você treina a IA com seus próprios PDFs e regras. No Starter, use templates prontos.",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            bulletPoints: [
                "Entende áudios e textos informais",
                "Treinamento com PDFs (Apenas Pro)",
                "Transbordo para humano quando necessário",
                "Funciona 24h/7 dias por semana"
            ],
            imageComponent: (
                <div className="w-full aspect-video bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col p-4 md:p-6 relative overflow-hidden shadow-2xl max-w-md mx-auto">
                    <div className="flex-1 space-y-4 text-xs md:text-sm">
                        <div className="flex justify-end">
                             <div className="bg-zinc-200 text-zinc-800 p-3 rounded-2xl rounded-tr-none max-w-[85%]">
                                 Oi, tem horário pra amanhã?
                             </div>
                        </div>
                        <div className="flex justify-start">
                             <div className="bg-purple-600 text-white p-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-lg shadow-purple-200">
                                 Tenho um encaixe às 16:30. Posso confirmar? 😊
                             </div>
                        </div>
                         <div className="flex justify-end">
                             <div className="bg-zinc-200 text-zinc-800 p-3 rounded-2xl rounded-tr-none max-w-[85%]">
                                 Pode ser. Quanto é?
                             </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-zinc-200 flex items-center gap-2">
                         <div className="w-full h-8 md:h-10 bg-white border border-zinc-200 rounded-full flex items-center px-4 text-zinc-400 text-xs">
                             IA digitando...
                         </div>
                    </div>
                </div>
            )
        }
    }[type];

    return (
        <div className="min-h-screen bg-white animate-in slide-in-from-right duration-500 fixed inset-0 z-[60] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
                {/* Header Nav */}
                <div className="flex items-center justify-between mb-8 md:mb-12 sticky top-0 bg-white/90 backdrop-blur-md py-4 z-10 -mx-4 px-4 md:mx-0 md:px-0 border-b md:border-none border-zinc-100">
                    <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors group font-medium text-sm md:text-base">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                            <ArrowLeft size={18} />
                        </div>
                        Voltar
                    </button>
                    <button onClick={onEnterApp} className="px-4 py-2 md:px-6 md:py-2.5 bg-zinc-900 text-white rounded-lg font-bold hover:bg-zinc-800 text-sm md:text-base">
                        Testar Agora
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center pb-12">
                    <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${content.bgColor} ${content.color}`}>
                            <Sparkles size={14} /> {content.label}
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
                            {content.title}
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed">
                            {content.heroText}
                        </p>
                        
                        <ul className="space-y-3 md:space-y-4">
                            {content.bulletPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className={`mt-1 p-1 rounded-full flex-shrink-0 ${content.bgColor} ${content.color}`}>
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="text-zinc-700 font-medium text-sm md:text-base">{point}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4 md:pt-8 pb-8 md:pb-0">
                            <button 
                                onClick={onEnterApp}
                                className={`w-full md:w-auto px-10 py-4 md:py-5 text-white text-base md:text-lg font-bold rounded-xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 ${
                                    type === 'crm' ? 'bg-orange-600 shadow-orange-200' : 
                                    type === 'agenda' ? 'bg-blue-600 shadow-blue-200' : 
                                    'bg-purple-600 shadow-purple-200'
                                }`}
                            >
                                Começar Gratuitamente <ArrowRight size={20} />
                            </button>
                            <p className="mt-4 text-xs md:text-sm text-zinc-400 text-center md:text-left">Teste de 7 dias grátis. Não pede cartão.</p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 w-full">
                        {content.imageComponent}
                    </div>
                </div>
            </div>
        </div>
    )
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onGoToPricing }) => {
  const [featurePage, setFeaturePage] = useState<FeaturePageType>('home');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  // ROI Calculator State
  const [ticketValue, setTicketValue] = useState(250);
  const [lostPatients, setLostPatients] = useState(4);
  const monthlyRevenueLost = ticketValue * lostPatients;
  const planCost = billingPeriod === 'monthly' ? 297 : 237; 
  const recoveredPatientsNeeded = Math.ceil(planCost / ticketValue);
  const potentialProfit = monthlyRevenueLost - planCost;

  if (featurePage !== 'home') {
      return <FeatureDetail type={featurePage as any} onBack={() => setFeaturePage('home')} onEnterApp={onEnterApp} />
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-primary/20 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow shadow-primary/30">
              <LogoMeetZen size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">Meet Zen AI</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
            <button onClick={() => setFeaturePage('ai')} className="hover:text-primary transition-colors">IA</button>
            <button onClick={() => setFeaturePage('agenda')} className="hover:text-primary transition-colors">Agenda</button>
            <button onClick={() => setFeaturePage('crm')} className="hover:text-primary transition-colors">CRM</button>
            <button onClick={onGoToPricing} className="hover:text-primary transition-colors">Preços</button>
          </div>
          <button onClick={onEnterApp} className="px-4 py-1.5 md:px-5 md:py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
            Entrar
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full mb-2 md:mb-4">
                <Sparkles size={12} className="text-green-600" />
                <span className="text-[10px] md:text-xs font-bold text-green-700 uppercase tracking-wide">AI Powered Engine 2.0</span>
            </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.15]">
            Pare de perder pacientes no WhatsApp por demora.
          </h1>
          <p className="text-base md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed px-2">
            A secretária virtual que conversa como humana, agenda consultas sozinha e reduz seu no-show em até 70%.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 text-xs md:text-sm text-zinc-500 font-medium pt-2">
             <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary"/> Atendimento 24/7</span>
             <span className="hidden sm:inline">•</span>
             <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary"/> Sem fidelidade</span>
             <span className="hidden sm:inline">•</span>
             <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary"/> Teste grátis</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4 sm:px-0">
            <button onClick={onEnterApp} className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-base font-bold rounded-xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/30 hover:scale-105 flex items-center justify-center gap-2">
              Criar Minha Secretária Virtual <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      </header>

      {/* 2. O QUE É (MECANISMO ÚNICO) */}
      <section className="py-12 md:py-20 bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative">
                     {/* Abstract UI Representation */}
                     <div className="bg-zinc-900 rounded-2xl p-4 md:p-6 shadow-2xl border border-zinc-800 max-w-full overflow-hidden">
                        <div className="flex items-center gap-2 mb-4 md:mb-6 border-b border-zinc-800 pb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            <span className="ml-2 text-[10px] md:text-xs text-zinc-500 font-mono">meetzen-core.tsx</span>
                        </div>
                        <div className="space-y-4 font-mono text-xs md:text-sm overflow-x-auto pb-2">
                            <div className="flex gap-4 min-w-max">
                                <span className="text-zinc-500 select-none">user:</span>
                                <span className="text-zinc-100">"Tem horário amanhã a tarde?"</span>
                            </div>
                            <div className="flex gap-4 min-w-max">
                                <span className="text-green-500 select-none">ai_brain:</span>
                                <span className="text-green-200">Checking Google Calendar...</span>
                            </div>
                            <div className="flex gap-4 min-w-max">
                                <span className="text-green-500 select-none">status:</span>
                                <span className="text-zinc-400">[BUSY: 14:00, 15:00] [FREE: 16:30]</span>
                            </div>
                             <div className="flex gap-4 min-w-max">
                                <span className="text-blue-400 select-none">response:</span>
                                <span className="text-zinc-100">"Oi! Consigo te encaixar às 16:30. Pode ser?"</span>
                            </div>
                        </div>
                     </div>
                </div>
                <div className="order-1 md:order-2 space-y-4 md:space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-lg text-[10px] md:text-xs font-bold text-zinc-600 uppercase">
                        <XCircle size={14} /> Não é um chatbot burro
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 leading-tight">
                        Esqueça os robôs de "Digite 1 para agendar".
                    </h2>
                    <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
                        Chatbots tradicionais frustram clientes. O <strong>Meet Zen AI</strong> usa Inteligência Artificial Generativa para entender contexto, ironia e urgência.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="mt-1 p-1 bg-green-100 rounded-full text-green-700 flex-shrink-0"><CheckCircle2 size={14} /></div>
                            <span className="text-zinc-700 text-sm md:text-base"><strong>Conversa Natural:</strong> Seu cliente jura que está falando com um humano.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="mt-1 p-1 bg-green-100 rounded-full text-green-700 flex-shrink-0"><CheckCircle2 size={14} /></div>
                            <span className="text-zinc-700 text-sm md:text-base"><strong>Agenda Real:</strong> Conectada diretamente ao seu Google Calendar.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="mt-1 p-1 bg-green-100 rounded-full text-green-700 flex-shrink-0"><CheckCircle2 size={14} /></div>
                            <span className="text-zinc-700 text-sm md:text-base"><strong>Treinamento Instantâneo:</strong> Ela lê seus PDFs e aprende suas regras.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* 9. PREÇOS */}
      <section id="precos" className="py-16 md:py-24 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4">Escolha seu nível de automação</h2>
              <p className="text-zinc-500 mb-10 md:mb-16 text-sm md:text-base">Comece organizando sua agenda ou escale com inteligência de vendas.</p>
              
              {/* Toggle Mensal/Anual */}
              <div className="flex justify-center mb-10 md:mb-16">
                <div className="bg-zinc-100 p-1 rounded-xl flex items-center relative">
                    <button 
                        onClick={() => setBillingPeriod('monthly')}
                        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all relative z-10 ${billingPeriod === 'monthly' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                        Mensal
                    </button>
                    <button 
                        onClick={() => setBillingPeriod('yearly')}
                        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all relative z-10 flex items-center gap-2 ${billingPeriod === 'yearly' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                        Anual <span className="text-[9px] md:text-[10px] bg-green-100 text-green-700 px-1.5 md:px-2 py-0.5 rounded-full">-20%</span>
                    </button>
                </div>
            </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
                  
                  {/* STARTER PLAN */}
                  <div className="bg-zinc-50 p-6 md:p-8 rounded-3xl border border-zinc-200 text-left hover:border-zinc-300 transition-colors relative">
                      <h3 className="text-xl font-bold text-zinc-900 mb-2">Zen Starter</h3>
                      <p className="text-zinc-500 text-xs md:text-sm mb-6 min-h-[40px]">Para profissionais liberais que atendem sozinhos.</p>
                      <div className="flex items-baseline gap-1 mb-6">
                          <span className="text-3xl md:text-4xl font-bold text-zinc-900">R$ {billingPeriod === 'monthly' ? '97' : '77'}</span>
                          <span className="text-zinc-500 text-sm">/mês</span>
                      </div>
                      <button onClick={onEnterApp} className="w-full py-3 md:py-4 border-2 border-zinc-900 rounded-xl font-bold text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors mb-8 text-sm md:text-base">
                          Começar Agora
                      </button>
                      <ul className="space-y-3 md:space-y-4">
                          {[
                            'Até 2 Usuários', 
                            '1 WhatsApp', 
                            'Agenda Automática',
                            'IA Básica (Sem PDF)',
                            'Sem CRM / Financeiro'
                          ].map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-zinc-700">
                                  <CheckCircle2 size={16} className="text-zinc-400 mt-0.5 flex-shrink-0"/>
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* PRO PLAN */}
                  <div className="bg-primary text-white p-6 md:p-8 rounded-3xl border border-primary text-left relative shadow-2xl shadow-primary/20 transform lg:-translate-y-4 z-10">
                      <div className="absolute top-0 right-6 md:right-8 -translate-y-1/2 bg-yellow-400 text-yellow-950 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide">Mais Popular</div>
                      <h3 className="text-xl font-bold mb-2">Zen Pro</h3>
                      <p className="text-white/80 text-xs md:text-sm mb-6 min-h-[40px]">Para clínicas pequenas e médias em crescimento.</p>
                      <div className="flex items-baseline gap-1 mb-6">
                          <span className="text-3xl md:text-4xl font-bold">R$ {billingPeriod === 'monthly' ? '297' : '237'}</span>
                          <span className="text-white/70 text-sm">/mês</span>
                      </div>
                      <button onClick={onEnterApp} className="w-full py-3 md:py-4 bg-white text-primary rounded-xl font-bold hover:bg-zinc-100 transition-colors shadow-lg mb-8 text-sm md:text-base">
                          Testar Pro Grátis
                      </button>
                      <ul className="space-y-3 md:space-y-4">
                          {[
                            'Até 10 Usuários', 
                            'CRM & Kanban Completo', 
                            'IA Treinável (Lê PDFs)',
                            'Cobrança Pix Auto',
                            'Relatórios de BI'
                          ].map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white">
                                  <CheckCircle2 size={16} className="text-white/90 mt-0.5 flex-shrink-0"/>
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* INFINITY PLAN */}
                  <div className="bg-zinc-900 text-white p-6 md:p-8 rounded-3xl border border-zinc-800 text-left relative hover:border-zinc-700 transition-colors">
                      <div className="absolute top-0 right-6 md:right-8 -translate-y-1/2 bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide flex items-center gap-1"><Crown size={10} className="text-yellow-400" /> VIP</div>
                      <h3 className="text-xl font-bold mb-2 text-white">Zen Infinity</h3>
                      <p className="text-zinc-400 text-xs md:text-sm mb-6 min-h-[40px]">Para grandes redes e operações de alto volume.</p>
                      <div className="flex items-baseline gap-1 mb-6">
                          <span className="text-3xl md:text-4xl font-bold text-white">R$ {billingPeriod === 'monthly' ? '897' : '717'}</span>
                          <span className="text-zinc-500 text-sm">/mês</span>
                      </div>
                      <button onClick={onEnterApp} className="w-full py-3 md:py-4 border border-zinc-700 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors mb-8 text-sm md:text-base">
                          Falar com Consultor
                      </button>
                      <ul className="space-y-3 md:space-y-4">
                          {[
                            'Usuários Ilimitados', 
                            'Múltiplos WhatsApps', 
                            'IA Sem Limites (Max Context)',
                            'White-label (Sua Marca)',
                            'Gerente de Conta VIP'
                          ].map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-zinc-300">
                                  <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0"/>
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="px-4 md:px-6 mb-16 md:mb-24">
        <div className="max-w-4xl mx-auto bg-zinc-50 rounded-3xl p-6 md:p-12 border border-zinc-200">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="flex-1 space-y-6 md:space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 text-primary font-bold mb-2 text-sm">
                            <Calculator size={18} />
                            Calculadora de Retorno
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2 md:mb-4">A conta fecha sozinha.</h2>
                        <p className="text-sm md:text-base text-zinc-600">
                            Quanto você perde hoje com "no-shows"?
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-zinc-700 mb-2 flex justify-between">
                                <span>Valor médio da consulta</span>
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
                            <label className="block text-xs md:text-sm font-bold text-zinc-700 mb-2 flex justify-between">
                                <span>Pacientes perdidos/mês</span>
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

                <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
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
        </div>
      </section>

      {/* 10. CTA FINAL */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-zinc-900 text-white border-b border-zinc-800">
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
      <footer className="py-8 md:py-12 px-6 bg-zinc-900 border-t border-zinc-800 text-zinc-400 text-center md:text-left">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white">
                    <LogoMeetZen size={14} />
                 </div>
                 <span className="font-bold text-zinc-100">Meet Zen AI</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm">
                  <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                  <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                  <a href="#" className="hover:text-white transition-colors">Suporte</a>
              </div>
              <div className="text-xs md:text-sm text-zinc-600">
                  © 2025 Meet Zen AI.
              </div>
          </div>
      </footer>
    </div>
  );
};

export default LandingPage;
