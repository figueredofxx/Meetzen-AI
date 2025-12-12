
import React, { useState } from 'react';
import { ShieldAlert, MessageSquare, Zap, FileText, Upload, AlertOctagon, LayoutTemplate, Check, ScrollText, Brain, Smile, Stethoscope, Dumbbell, Scale, Calculator, Briefcase, Activity, Wallet, Percent, DollarSign, Lock, Cpu, Sparkles } from 'lucide-react';
import { PlanType } from '../types';

const TEMPLATES = [
  { 
    id: 'psicologia', 
    name: 'Psicólogos', 
    icon: Brain,
    tone: 'Acolhedor, calmo e empático',
    focus: 'Consultas online/presencial',
    rules: ['Nunca diagnosticar', 'Não opinar sobre problemas', 'Não oferecer promoções']
  },
  { 
    id: 'estetica', 
    name: 'Estética', 
    icon: Smile,
    tone: 'Leve e explicativo',
    focus: 'Benefícios e Agendamento',
    rules: ['Perguntar área corporal', 'Pode oferecer pacotes', 'Não prometer resultados garantidos']
  },
  { 
    id: 'odonto', 
    name: 'Odontologia', 
    icon: Stethoscope,
    tone: 'Profissional e objetiva',
    focus: 'Triagem e Agendamento',
    rules: ['Nunca avaliar dentes remotamente', 'Perguntar motivo da consulta', 'Não informar valores fora da tabela']
  },
  { 
    id: 'nutricao', 
    name: 'Nutricionistas', 
    icon: Activity, // Using Activity as generic health
    tone: 'Educado, calmo, objetivo',
    focus: 'Primeira consulta ou retorno',
    rules: ['Nunca sugerir dietas via chat', 'Não contar calorias/macros', 'Focar na disponibilidade']
  },
  { 
    id: 'personal', 
    name: 'Personal Trainer', 
    icon: Dumbbell,
    tone: 'Energético, motivacional e profissional',
    focus: 'Objetivos e Modalidade',
    rules: ['Nunca prescrever treinos via chat', 'Perguntar online/presencial', 'Focar no objetivo geral']
  },
  { 
    id: 'advocacia', 
    name: 'Advogados', 
    icon: Scale,
    tone: 'Sério, organizado e claro',
    focus: 'Triagem de caso e Urgência',
    rules: ['Nunca dar orientação jurídica', 'Não emitir opinião legal', 'Enviar checklists se houver']
  },
  { 
    id: 'contabilidade', 
    name: 'Contadores', 
    icon: Calculator,
    tone: 'Profissional e objetivo',
    focus: 'Consultoria e Tipo de Empresa',
    rules: ['Não emitir parecer fiscal', 'Perguntar tipo (MEI, ME)', 'Focar no agendamento']
  },
  { 
    id: 'consultoria', 
    name: 'Consultores', 
    icon: Briefcase,
    tone: 'Estratégico e claro',
    focus: 'Objetivo da reunião',
    rules: ['Não garantir resultados', 'Oferecer materiais do banco', 'Perguntar escopo']
  }
];

// Reusable Switch Component
const Switch = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
      checked ? 'bg-primary' : 'bg-zinc-200'
    }`}
  >
    <span
      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

interface IAAutomationViewProps {
    userPlan?: PlanType;
    onChangePlan?: () => void;
}

const IAAutomationView: React.FC<IAAutomationViewProps> = ({ userPlan = 'nexus', onChangePlan }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState('psicologia');
  const [aiModel, setAiModel] = useState<'flash' | 'pro'>('flash');
  
  const selectedTemplate = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[0];
  
  const isStarter = userPlan === 'starter';
  const isInfinity = userPlan === 'infinity';

  // Toggles State
  const [toggles, setToggles] = useState({
    confirmAuto: true,
    rescheduleAuto: true,
    reminders: true,
    waitlist: true,
    billing: false
  });
  
  // Billing Config State
  const [billingConfig, setBillingConfig] = useState({
      mode: 'total' as 'total' | 'signal', // 'total' = Full Value, 'signal' = Percentage
      signalPercentage: 30
  });

  const handleToggle = (key: keyof typeof toggles) => {
    // Lock Billing for Starter
    if (key === 'billing' && isStarter) {
        alert("Cobrança via Pix disponível apenas no plano Zen Pro ou superior.");
        return;
    }
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleModelChange = (model: 'flash' | 'pro') => {
      if (model === 'pro' && !isInfinity) {
          if (onChangePlan) onChangePlan();
          return;
      }
      setAiModel(model);
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-10 mb-20">
        <div>
           <h1 className="text-2xl font-bold text-zinc-900 mb-2">IA & Automação</h1>
           <p className="text-zinc-500">Configure como o agente autônomo interage com seus clientes.</p>
        </div>

        <div className="space-y-8">
           
           {/* 0. AI Brain Model (New Section for Infinity) */}
           <div className="p-6 border border-zinc-200 rounded-xl bg-white">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
                        <Cpu size={18} />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900">Motor de Inteligência</h3>
                        <p className="text-xs text-zinc-500">Escolha o modelo de raciocínio da sua IA.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                        onClick={() => handleModelChange('flash')}
                        className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all relative ${
                            aiModel === 'flash' 
                                ? 'bg-indigo-50/50 border-indigo-600 ring-1 ring-indigo-200' 
                                : 'bg-white border-zinc-200 hover:border-zinc-300'
                        }`}
                    >
                        <div className={`mt-1 p-2 rounded-lg ${aiModel === 'flash' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                            <Zap size={20} />
                        </div>
                        <div>
                            <h4 className={`font-bold text-sm ${aiModel === 'flash' ? 'text-indigo-900' : 'text-zinc-700'}`}>Zen AI Flash</h4>
                            <p className="text-xs text-zinc-500 mt-1">Ideal para agendamentos rápidos e respostas curtas. Otimizado para velocidade.</p>
                        </div>
                        {aiModel === 'flash' && <div className="absolute top-4 right-4 text-indigo-600"><Check size={16}/></div>}
                    </button>

                    <button 
                        onClick={() => handleModelChange('pro')}
                        className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all relative ${
                            aiModel === 'pro' 
                                ? 'bg-zinc-900 border-zinc-900 text-white' 
                                : 'bg-white border-zinc-200 hover:border-zinc-300'
                        }`}
                    >
                        <div className={`mt-1 p-2 rounded-lg ${aiModel === 'pro' ? 'bg-white text-zinc-900' : 'bg-zinc-100 text-zinc-400'}`}>
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className={`font-bold text-sm ${aiModel === 'pro' ? 'text-white' : 'text-zinc-700'}`}>Zen AI Pro (Elite)</h4>
                                {!isInfinity && <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-1.5 rounded border border-yellow-200">INFINITY</span>}
                            </div>
                            <p className={`text-xs mt-1 ${aiModel === 'pro' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                Maior contexto (1M tokens). Raciocínio complexo para negociações difíceis e leitura de PDFs longos.
                            </p>
                        </div>
                        {aiModel === 'pro' && <div className="absolute top-4 right-4 text-white"><Check size={16}/></div>}
                    </button>
                </div>
           </div>

           {/* 1. Status & Mode */}
           <div className="p-6 border border-zinc-200 rounded-xl bg-zinc-50/50">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary text-white rounded-lg shadow-sm shadow-primary/20">
                       <Zap size={20} />
                    </div>
                    <div>
                       <h3 className="font-bold text-zinc-900">Modo de Operação</h3>
                       <p className="text-xs text-zinc-500">Nível de autonomia do agente</p>
                    </div>
                 </div>
                 <div className="flex items-center bg-white border border-zinc-200 rounded-lg p-1 shadow-sm">
                    <button className="px-4 py-1.5 text-xs font-medium rounded bg-primary text-white shadow-sm transition-all">Autônomo</button>
                    <button className="px-4 py-1.5 text-xs font-medium rounded text-zinc-500 hover:bg-zinc-50 transition-colors">Assistido</button>
                    <button className="px-4 py-1.5 text-xs font-medium rounded text-zinc-500 hover:bg-zinc-50 transition-colors">Pausado</button>
                 </div>
              </div>

              <div className="space-y-1">
                 <div className="flex items-center justify-between py-3 border-b border-zinc-200/50 last:border-0">
                    <span className="text-sm text-zinc-700 font-medium">Confirmar consultas automaticamente</span>
                    <Switch checked={toggles.confirmAuto} onChange={() => handleToggle('confirmAuto')} />
                 </div>
                 <div className="flex items-center justify-between py-3 border-b border-zinc-200/50 last:border-0">
                    <span className="text-sm text-zinc-700 font-medium">Reagendar sem supervisão humana</span>
                    <Switch checked={toggles.rescheduleAuto} onChange={() => handleToggle('rescheduleAuto')} />
                 </div>
                 <div className="flex items-center justify-between py-3 border-b border-zinc-200/50 last:border-0">
                    <span className="text-sm text-zinc-700 font-medium">Enviar lembretes pró-ativos</span>
                    <Switch checked={toggles.reminders} onChange={() => handleToggle('reminders')} />
                 </div>
                 <div className="flex items-center justify-between py-3 border-b border-zinc-200/50 last:border-0">
                    <span className="text-sm text-zinc-700 font-medium">Oferecer horários de lista de espera</span>
                    <Switch checked={toggles.waitlist} onChange={() => handleToggle('waitlist')} />
                 </div>
                 
                 {/* PIX BILLING FEATURE (LOCKED FOR STARTER) */}
                 <div className={`flex flex-col py-3 pt-4 border-t border-zinc-200/50 mt-2 relative ${isStarter ? 'opacity-50' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-zinc-900 font-bold">Realizar cobranças (Pix)</span>
                                {isStarter && <Lock size={12} className="text-zinc-500" />}
                                {!isStarter && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200">BETA</span>}
                            </div>
                            <p className="text-xs text-zinc-500 mt-0.5">A IA envia o QR Code Pix e aguarda o comprovante para confirmar.</p>
                        </div>
                        <Switch checked={toggles.billing} onChange={() => handleToggle('billing')} />
                    </div>

                    {isStarter && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <button onClick={onChangePlan} className="bg-white border border-zinc-200 px-3 py-1 text-xs font-bold rounded-full shadow-sm text-primary hover:bg-zinc-50">
                                Desbloquear no Zen Pro
                            </button>
                        </div>
                    )}

                    {!isStarter && toggles.billing && (
                        <div className="ml-4 pl-4 border-l-2 border-primary/20 mt-2 animate-in slide-in-from-top-2 fade-in">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase mb-3">Configuração de Cobrança</h4>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${billingConfig.mode === 'total' ? 'border-primary bg-primary' : 'border-zinc-300'}`}>
                                        {billingConfig.mode === 'total' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    </div>
                                    <input 
                                        type="radio" 
                                        name="billing_mode" 
                                        className="hidden" 
                                        checked={billingConfig.mode === 'total'}
                                        onChange={() => setBillingConfig(prev => ({ ...prev, mode: 'total' }))}
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-zinc-900 group-hover:text-primary transition-colors">Cobrar Valor Total</span>
                                        <p className="text-[10px] text-zinc-500">A IA cobra o valor integral do serviço antes de confirmar.</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${billingConfig.mode === 'signal' ? 'border-primary bg-primary' : 'border-zinc-300'}`}>
                                        {billingConfig.mode === 'signal' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    </div>
                                    <input 
                                        type="radio" 
                                        name="billing_mode" 
                                        className="hidden" 
                                        checked={billingConfig.mode === 'signal'}
                                        onChange={() => setBillingConfig(prev => ({ ...prev, mode: 'signal' }))}
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-zinc-900 group-hover:text-primary transition-colors">Cobrar Sinal (Reserva)</span>
                                        <p className="text-[10px] text-zinc-500">A IA cobra apenas uma porcentagem para reservar o horário.</p>
                                    </div>
                                </label>

                                {billingConfig.mode === 'signal' && (
                                    <div className="flex items-center gap-3 ml-7 mt-2">
                                        <span className="text-sm text-zinc-600">Porcentagem do sinal:</span>
                                        <div className="relative w-24">
                                            <input 
                                                type="number" 
                                                value={billingConfig.signalPercentage}
                                                onChange={(e) => setBillingConfig(prev => ({ ...prev, signalPercentage: Number(e.target.value) }))}
                                                className="w-full pl-3 pr-6 py-1 bg-white border border-zinc-300 rounded text-sm text-center focus:outline-none focus:border-primary"
                                                min="1" max="100"
                                            />
                                            <Percent size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400" />
                                        </div>
                                    </div>
                                )}
                            </div>
                             <div className="mt-3 p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100 flex items-start gap-2">
                                <DollarSign size={14} className="mt-0.5" />
                                <p>Esta configuração será refletida automaticamente na Agenda e no CRM. O cliente verá o status "Aguardando Pagamento" até enviar o comprovante.</p>
                             </div>
                        </div>
                    )}
                 </div>
              </div>
           </div>

           {/* 2. Niche Templates (AVAILABLE FOR ALL) */}
           <div className="p-6 border border-zinc-200 rounded-xl bg-white scroll-mt-20">
               <div className="flex items-center gap-2 mb-2">
                   <div className="p-1.5 bg-violet-50 text-violet-600 rounded">
                        <LayoutTemplate size={18} />
                   </div>
                   <h3 className="font-bold text-zinc-900">Modelos de Comportamento (Templates)</h3>
               </div>
               <p className="text-sm text-zinc-500 mb-6">
                   Selecione seu nicho para carregar o "Super Prompt" otimizado com regras específicas, tom de voz e diretrizes de segurança.
               </p>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {TEMPLATES.map(template => {
                      const isSelected = selectedTemplateId === template.id;
                      return (
                          <button 
                            key={template.id}
                            onClick={() => setSelectedTemplateId(template.id)}
                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all relative ${
                                isSelected 
                                    ? 'bg-primary/5 border-primary shadow-sm' 
                                    : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                            }`}
                          >
                             {isSelected && (
                                 <div className="absolute top-2 right-2 text-primary">
                                     <Check size={14} />
                                 </div>
                             )}
                             <template.icon size={24} className={isSelected ? 'text-primary' : 'text-zinc-400'} />
                             <span className={`text-xs font-medium ${isSelected ? 'text-primary font-bold' : 'text-zinc-600'}`}>
                                 {template.name}
                             </span>
                          </button>
                      )
                  })}
               </div>

               {/* Prompt Preview Box */}
               <div className="bg-zinc-900 rounded-lg p-5 text-zinc-300 font-mono text-xs overflow-hidden">
                   <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-800">
                       <ScrollText size={14} className="text-primary" />
                       <span className="font-bold text-white">Preview da Instrução do Sistema (Super Prompt)</span>
                   </div>
                   <div className="space-y-3 opacity-90 leading-relaxed">
                       <div className="text-green-400">// 1. IDENTIDADE</div>
                       <div>Você é o Assistente Virtual Humanizado da empresa. Seu papel é atender, esclarecer dúvidas e realizar agendamentos de forma natural.</div>
                       
                       <div className="text-green-400 mt-2">// 2. TOM DE VOZ ({selectedTemplate.name})</div>
                       <div className="text-white">"{selectedTemplate.tone}"</div>

                       <div className="text-green-400 mt-2">// 3. REGRAS RÍGIDAS DE NICHO</div>
                       <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                           {selectedTemplate.rules.map((rule, i) => (
                               <li key={i}>{rule}</li>
                           ))}
                       </ul>
                       
                       <div className="text-green-400 mt-2">// 5. OBJETIVO PRINCIPAL</div>
                       <div>{selectedTemplate.focus}. Sempre finalizar perguntando: "Deseja confirmar o agendamento?"</div>
                   </div>
               </div>
           </div>

           {/* 3. Knowledge Base (LOCKED FOR STARTER) */}
           <div className={`p-6 border border-zinc-200 rounded-xl bg-white relative overflow-hidden ${isStarter ? 'opacity-90' : ''}`}>
               {isStarter && (
                   <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-6">
                       <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                           <Lock size={24} />
                       </div>
                       <h3 className="text-lg font-bold text-zinc-900 mb-1">Treinamento Avançado (PDFs)</h3>
                       <p className="text-sm text-zinc-500 mb-4 max-w-sm">Desbloqueie a Leitura de Arquivos com o Plano Zen Pro - Aumente a inteligência da sua IA.</p>
                       <button onClick={onChangePlan} className="px-6 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-bold shadow-md hover:bg-zinc-800">
                           Liberar Upload de PDFs
                       </button>
                   </div>
               )}

               <div className="flex items-center gap-2 mb-2">
                   <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
                        <FileText size={18} />
                   </div>
                   <h3 className="font-bold text-zinc-900">Base de Conhecimento</h3>
               </div>
               <p className="text-sm text-zinc-500 mb-6">
                   Adicione PDFs e informações para que a IA possa responder dúvidas específicas sobre sua empresa.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                   <button disabled={isStarter} className="flex flex-col items-center justify-center gap-2 p-6 border border-dashed border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors group">
                       <Upload size={24} className="text-zinc-400 group-hover:text-zinc-600" />
                       <span className="text-sm font-medium text-zinc-700">Enviar PDF</span>
                       <span className="text-[10px] text-zinc-400">Políticas, catálogos, manuais</span>
                   </button>
                   <button disabled={isStarter} className="flex flex-col items-center justify-center gap-2 p-6 border border-dashed border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors group">
                       <Upload size={24} className="text-zinc-400 group-hover:text-zinc-600" />
                       <span className="text-sm font-medium text-zinc-700">Enviar TXT</span>
                       <span className="text-[10px] text-zinc-400">Listas simples, instruções</span>
                   </button>
               </div>

               <div>
                   <label className="block text-xs font-bold text-zinc-700 mb-2 uppercase">Instruções Gerais (Texto Livre)</label>
                   <textarea 
                        disabled={isStarter}
                        className="w-full min-h-[120px] p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-primary resize-none disabled:bg-zinc-100"
                        placeholder="Cole aqui informações importantes, regras internas, respostas padrão, descrições de serviços, orientações e instruções específicas..."
                   ></textarea>
               </div>
           </div>

            {/* 4. Negative Prompt (LOCKED FOR STARTER) */}
            <div className={`p-6 border border-zinc-200 rounded-xl bg-white relative overflow-hidden ${isStarter ? 'opacity-90' : ''}`}>
               {isStarter && (
                   <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                        <Lock size={20} className="text-zinc-400 mb-2" />
                        <span className="text-xs font-bold text-zinc-500">Recurso Zen Pro</span>
                   </div>
               )}
               <div className="flex items-center gap-2 mb-2">
                   <div className="p-1.5 bg-red-50 text-red-600 rounded">
                        <AlertOctagon size={18} />
                   </div>
                   <h3 className="font-bold text-zinc-900">O que a IA NÃO pode fazer (Negative Prompt)</h3>
               </div>
               <p className="text-sm text-zinc-500 mb-4">
                   Defina limites rígidos. A IA será instruída a evitar estritamente estes comportamentos.
               </p>

               <textarea 
                    disabled={isStarter}
                    className="w-full min-h-[100px] p-4 bg-white border border-red-100 rounded-lg text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-200 resize-none shadow-sm disabled:bg-zinc-100"
                    placeholder="Ex: Não remarcar consultas críticas sem aprovação humana. Não falar sobre valores específicos. Não assumir responsabilidade médica..."
               ></textarea>
            </div>

           {/* 5. Settings Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-zinc-200 rounded-xl bg-white">
                 <div className="flex items-center gap-2 mb-4">
                    <ShieldAlert size={18} className="text-zinc-900" />
                    <h3 className="font-bold text-sm text-zinc-900">Segurança & Escalonamento</h3>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className="block text-xs font-medium text-zinc-500 mb-2">Transferir para humano se confiança &lt; X%</label>
                       <input type="range" min="0" max="100" defaultValue="70" className="w-full accent-primary" />
                       <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                          <span>0%</span>
                          <span className="font-bold text-zinc-900">70%</span>
                          <span>100%</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-6 border border-zinc-200 rounded-xl bg-white">
                 <div className="flex items-center gap-2 mb-4">
                    <MessageSquare size={18} className="text-zinc-900" />
                    <h3 className="font-bold text-sm text-zinc-900">Personalidade</h3>
                 </div>
                 <div className="space-y-3">
                    <label className="block text-xs font-medium text-zinc-500">Tom de Voz (Override)</label>
                    <select disabled={isStarter} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-70">
                       <option>Usar padrão do Template</option>
                       <option>Forçar: Profissional & Direto</option>
                       <option>Forçar: Empático & Acolhedor</option>
                       <option>Forçar: Casual & Moderno</option>
                    </select>
                    {isStarter && <p className="text-[10px] text-primary flex items-center gap-1"><Lock size={10} /> Personalização avançada requer Zen Pro</p>}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IAAutomationView;
