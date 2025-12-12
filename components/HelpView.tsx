
import React, { useState } from 'react';
import { 
  Search, MessageCircle, Mail, 
  Zap, Calendar, Target, Shield, CreditCard, 
  PlayCircle, Layers, ArrowLeft, CheckSquare, Upload, 
  Settings, AlertTriangle, Check
} from 'lucide-react';

// --- SUB-PAGES COMPONENTS ---

const GettingStartedGuide: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="animate-in slide-in-from-right duration-300">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-6 transition-colors font-medium">
            <ArrowLeft size={18} /> Voltar para Central
        </button>
        
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <PlayCircle size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Primeiros Passos</h1>
                    <p className="text-zinc-500">Configure sua secretária virtual em 3 etapas simples.</p>
                </div>
            </div>

            <div className="space-y-8 max-w-3xl">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">1</div>
                        <div className="w-0.5 h-full bg-zinc-100 mt-2"></div>
                    </div>
                    <div className="pb-8">
                        <h3 className="font-bold text-lg text-zinc-900 mb-2">Conecte o WhatsApp</h3>
                        <p className="text-zinc-600 mb-3 text-sm leading-relaxed">
                            Para que a IA responda seus clientes, ela precisa de um número. Recomendamos usar um número exclusivo para a clínica/negócio.
                        </p>
                        <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 text-sm">
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><CheckSquare size={16} className="text-green-600"/> Acesse a aba <strong>Integrações</strong>.</li>
                                <li className="flex items-center gap-2"><CheckSquare size={16} className="text-green-600"/> Clique em "Conectar WhatsApp" para gerar o QR Code.</li>
                                <li className="flex items-center gap-2"><CheckSquare size={16} className="text-green-600"/> No seu celular, vá em <em>Aparelhos Conectados</em> e escaneie.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">2</div>
                        <div className="w-0.5 h-full bg-zinc-100 mt-2"></div>
                    </div>
                    <div className="pb-8">
                        <h3 className="font-bold text-lg text-zinc-900 mb-2">Sincronize a Agenda</h3>
                        <p className="text-zinc-600 mb-3 text-sm leading-relaxed">
                            A IA nunca agendará em horários ocupados. Para isso, ela precisa ler seu Google Calendar.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                            <strong>Dica:</strong> Se você tem múltiplos dentistas ou profissionais, use o plano PRO para conectar múltiplas agendas.
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">3</div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-zinc-900 mb-2">Defina o Horário de Atendimento</h3>
                        <p className="text-zinc-600 mb-3 text-sm leading-relaxed">
                            Vá em <strong>Dados da Empresa</strong> e defina o horário de abertura e fechamento. Fora desse horário, a IA avisará que a clínica está fechada, mas coletará os dados do cliente para o dia seguinte.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AITrainingGuide: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="animate-in slide-in-from-right duration-300">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-6 transition-colors font-medium">
            <ArrowLeft size={18} /> Voltar para Central
        </button>
        
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                    <Zap size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Treinando a IA</h1>
                    <p className="text-zinc-500">Como deixar o assistente com a "cara" da sua empresa.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg text-zinc-900 mb-2 flex items-center gap-2">
                            <Upload size={18} className="text-blue-500"/> Base de Conhecimento (PDFs)
                        </h3>
                        <p className="text-sm text-zinc-600 leading-relaxed mb-3">
                            Você não precisa configurar pergunta por pergunta. Basta fazer upload de um PDF contendo:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600">
                            <li>Lista de serviços e preços (se desejar divulgar).</li>
                            <li>Endereço completo e referências.</li>
                            <li>Regras de cancelamento.</li>
                            <li>Convênios aceitos.</li>
                        </ul>
                        <p className="text-xs text-zinc-400 mt-2">Vá em IA & Automação &gt; Base de Conhecimento.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg text-zinc-900 mb-2 flex items-center gap-2">
                            <Settings size={18} className="text-orange-500"/> Personalidade e Tom
                        </h3>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                            Nosso sistema já possui templates prontos (ex: "Psicólogo Empático", "Vendedor Agressivo").
                            Selecione o template que melhor se adapta ao seu nicho na aba de configuração.
                        </p>
                    </div>
                </div>

                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
                    <h3 className="font-bold text-sm text-zinc-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                        <AlertTriangle size={16} className="text-red-500"/> Negative Prompts (O que NÃO fazer)
                    </h3>
                    <p className="text-sm text-zinc-600 mb-4">
                        É crucial definir limites. Use o campo "Negative Prompt" para regras de segurança. Exemplos:
                    </p>
                    <div className="space-y-3">
                        <div className="bg-white p-3 rounded border border-red-100 flex items-start gap-3">
                            <div className="text-red-500 mt-0.5"><Shield size={14} /></div>
                            <span className="text-sm text-zinc-700">"Nunca prometa cura ou resultados garantidos."</span>
                        </div>
                        <div className="bg-white p-3 rounded border border-red-100 flex items-start gap-3">
                            <div className="text-red-500 mt-0.5"><Shield size={14} /></div>
                            <span className="text-sm text-zinc-700">"Não agende consultas para menores de idade sem o responsável."</span>
                        </div>
                        <div className="bg-white p-3 rounded border border-red-100 flex items-start gap-3">
                            <div className="text-red-500 mt-0.5"><Shield size={14} /></div>
                            <span className="text-sm text-zinc-700">"Se o cliente perguntar algo técnico, transfira para um humano."</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const BillingGuide: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="animate-in slide-in-from-right duration-300">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-6 transition-colors font-medium">
            <ArrowLeft size={18} /> Voltar para Central
        </button>
        
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <CreditCard size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Pagamentos e Faturas</h1>
                    <p className="text-zinc-500">Entenda seu ciclo de cobrança.</p>
                </div>
            </div>

            <div className="space-y-6 max-w-3xl">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <h3 className="font-bold text-zinc-900 mb-2">Ciclo de Cobrança</h3>
                    <p className="text-sm text-zinc-600">
                        O Meet Zen AI funciona no modelo pré-pago recorrente. A cobrança é realizada automaticamente no cartão de crédito cadastrado todo dia 01 (ou na data de aniversário da assinatura).
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors">
                        <h4 className="font-bold text-zinc-900 mb-1">Onde baixar a Nota Fiscal?</h4>
                        <p className="text-sm text-zinc-600">
                            As notas fiscais são enviadas automaticamente para o e-mail do administrador até 2 dias úteis após o pagamento. Você também pode baixá-las na aba <strong>Assinatura</strong> &gt; Histórico.
                        </p>
                    </div>
                    <div className="p-4 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors">
                        <h4 className="font-bold text-zinc-900 mb-1">Upgrade e Downgrade</h4>
                        <p className="text-sm text-zinc-600">
                            Você pode alterar seu plano a qualquer momento. 
                            <br/>• <strong>Upgrade:</strong> Cobrança pro-rata imediata.
                            <br/>• <strong>Downgrade:</strong> Válido no próximo ciclo.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-green-50 text-green-800 rounded-lg text-sm border border-green-100">
                    <Check size={16} />
                    <strong>Garantia:</strong> Oferecemos reembolso integral se cancelado nos primeiros 7 dias de uso.
                </div>
            </div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---

const FEATURE_LIST = [
    {
        category: "Chat & Atendimento",
        icon: MessageCircle,
        color: "text-green-600",
        bg: "bg-green-50",
        items: [
            "Chat em tempo real (Humano vs IA)",
            "Transbordo automático (IA -> Humano)",
            "Análise de Intenção e Sentimento",
            "Sugestões de Resposta (Smart Reply)",
            "Painel de Contexto do Cliente (Tags, Notas)",
            "Histórico completo de mensagens"
        ]
    },
    {
        category: "Agenda & Sincronização",
        icon: Calendar,
        color: "text-blue-600",
        bg: "bg-blue-50",
        items: [
            "Sincronização bidirecional com Google Calendar",
            "Detecção de conflitos de horário",
            "Lembretes automáticos (24h/1h antes)",
            "Remarcação autônoma pela IA",
            "Check-in de presença na recepção",
            "Bloqueio de horários (almoço, folga)"
        ]
    },
    {
        category: "CRM & Vendas",
        icon: Target,
        color: "text-orange-600",
        bg: "bg-orange-50",
        items: [
            "Pipeline Visual (Kanban Drag & Drop)",
            "Classificação automática de Leads",
            "Cálculo de LTV (Life Time Value)",
            "Envio de mensagens ativas (Evolution API)",
            "Histórico de serviços e compras",
            "Métricas de conversão por funil"
        ]
    },
    {
        category: "IA & Automação",
        icon: Zap,
        color: "text-violet-600",
        bg: "bg-violet-50",
        items: [
            "Templates de Nicho (Odonto, Psicologia, etc)",
            "Upload de Base de Conhecimento (PDF/TXT)",
            "Configuração de Tom de Voz e Personalidade",
            "Negative Prompts (Regras de bloqueio)",
            "Modos de Operação: Autônomo, Assistido, Pausado",
            "Cobrança automática via Pix (Beta)"
        ]
    },
    {
        category: "Gestão & Administrativo",
        icon: Shield,
        color: "text-zinc-600",
        bg: "bg-zinc-100",
        items: [
            "Gestão de Usuários e Permissões (Admin/Staff)",
            "Relatórios Financeiros e de Performance",
            "Configuração de Identidade da Empresa",
            "Chaves Pix e Dados de Pagamento",
            "Gestão de Assinatura e Faturas",
            "Auditoria de ações (Logs)"
        ]
    }
];

const FAQS = [
    { q: "Como conecto meu WhatsApp?", a: "Vá em Integrações > WhatsApp e escaneie o QR Code. Certifique-se de usar uma conta WhatsApp Business." },
    { q: "A IA pode cobrar consultas?", a: "Sim. Em 'IA & Automação', ative a opção de Cobrança e configure sua chave Pix em 'Dados da Empresa'." },
    { q: "Como adiciono um novo atendente?", a: "Acesse a aba 'Usuários', clique em 'Criar Usuário' e defina o nível de permissão (Staff ou Profissional)." },
    { q: "O sistema funciona offline?", a: "Não. O Meet Zen AI é baseado em nuvem e requer conexão com a internet para processar mensagens e sincronizar a agenda." }
];

type HelpSection = 'main' | 'getting-started' | 'training' | 'billing';

const HelpView: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<HelpSection>('main');
  const [searchTerm, setSearchTerm] = useState('');

  if (currentSection === 'getting-started') return <div className="flex-1 bg-zinc-50/50 p-4 md:p-8 overflow-y-auto"><div className="max-w-5xl mx-auto"><GettingStartedGuide onBack={() => setCurrentSection('main')} /></div></div>;
  if (currentSection === 'training') return <div className="flex-1 bg-zinc-50/50 p-4 md:p-8 overflow-y-auto"><div className="max-w-5xl mx-auto"><AITrainingGuide onBack={() => setCurrentSection('main')} /></div></div>;
  if (currentSection === 'billing') return <div className="flex-1 bg-zinc-50/50 p-4 md:p-8 overflow-y-auto"><div className="max-w-5xl mx-auto"><BillingGuide onBack={() => setCurrentSection('main')} /></div></div>;

  return (
    <div className="flex-1 bg-zinc-50/50 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto pb-20">
        
        {/* HEADER & SEARCH */}
        <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl font-bold text-zinc-900 mb-3">Central de Ajuda</h1>
            <p className="text-zinc-500 mb-8">
                Encontre tutoriais, entenda todas as funcionalidades ou entre em contato com nosso time de sucesso.
            </p>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input 
                    type="text" 
                    placeholder="O que você está procurando? (Ex: Configurar Pix, Agendamento...)" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
            </div>
        </div>

        {/* QUICK ACCESS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div onClick={() => setCurrentSection('getting-started')} className="bg-white p-6 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all group cursor-pointer">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <PlayCircle size={20} />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">Primeiros Passos</h3>
                <p className="text-xs text-zinc-500">Guia rápido para configurar seu WhatsApp e Agenda em 5 minutos.</p>
            </div>
            <div onClick={() => setCurrentSection('training')} className="bg-white p-6 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all group cursor-pointer">
                <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center text-violet-600 mb-4 group-hover:scale-110 transition-transform">
                    <Zap size={20} />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">Treinando a IA</h3>
                <p className="text-xs text-zinc-500">Aprenda a subir PDFs e criar regras para deixar a IA com a sua cara.</p>
            </div>
            <div onClick={() => setCurrentSection('billing')} className="bg-white p-6 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all group cursor-pointer">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <CreditCard size={20} />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">Pagamentos e Faturas</h3>
                <p className="text-xs text-zinc-500">Entenda como funciona o faturamento e altere seu plano.</p>
            </div>
        </div>

        {/* SYSTEM FUNCTIONALITIES (DOCUMENTATION) */}
        <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
                <Layers size={20} className="text-zinc-900" />
                <h2 className="text-xl font-bold text-zinc-900">Mapa de Funcionalidades</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FEATURE_LIST.map((feature, idx) => (
                    <div key={idx} className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
                        <div className={`p-4 border-b border-zinc-100 flex items-center gap-3 ${feature.bg}`}>
                            <feature.icon size={20} className={feature.color} />
                            <h3 className={`font-bold text-sm ${feature.color.replace('text-', 'text-opacity-80 text-')}`}>{feature.category}</h3>
                        </div>
                        <div className="p-4">
                            <ul className="space-y-2">
                                {feature.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${feature.color.replace('text-', 'bg-')}`}></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* FAQ SECTION */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-12">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Perguntas Frequentes</h2>
            <div className="space-y-4">
                {FAQS.map((faq, i) => (
                    <div key={i} className="border-b border-zinc-100 last:border-0 pb-4 last:pb-0">
                        <h4 className="font-bold text-sm text-zinc-900 mb-1 flex items-center gap-2">
                            <span className="text-primary">Q.</span> {faq.q}
                        </h4>
                        <p className="text-sm text-zinc-500 pl-5 leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* SUPPORT FOOTER */}
        <div className="bg-zinc-900 rounded-2xl p-8 text-center md:text-left md:flex items-center justify-between shadow-xl">
            <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-white mb-2">Ainda precisa de ajuda?</h2>
                <p className="text-zinc-400 text-sm max-w-md">Nosso time de suporte especializado está disponível de Segunda a Sexta, das 09h às 18h.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    Chat ao Vivo
                </button>
                <button className="px-6 py-3 bg-zinc-800 text-white rounded-xl font-bold text-sm hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 border border-zinc-700">
                    <Mail size={18} />
                    Enviar E-mail
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default HelpView;
