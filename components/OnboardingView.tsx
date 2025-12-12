import React, { useState, useCallback } from 'react';
import { ArrowRight, ArrowLeft, Building2, User, CheckCircle2, Loader2, Stethoscope, Brain, Smile, Scale, Briefcase, UserCheck, FileText, Search } from 'lucide-react';
import { LogoMeetZen } from './Sidebar';
import { ToastType } from '../types';

interface OnboardingViewProps {
  onFinish: () => void;
  onBackToLogin: () => void;
  showToast: (title: string, type: ToastType, message?: string) => void;
}

const steps = [
  { id: 1, title: 'Seus Dados', icon: User },
  { id: 2, title: 'Configurar Negócio', icon: Building2 },
  { id: 3, title: 'Conclusão', icon: CheckCircle2 },
];

const NICHES = [
    { id: 'Odontologia', icon: Stethoscope, label: 'Odontologia', keywords: ['odonto', 'denta'] },
    { id: 'Psicologia', icon: Brain, label: 'Psicologia', keywords: ['psico', 'terapia'] },
    { id: 'Estetica', icon: Smile, label: 'Estética', keywords: ['estet', 'beleza', 'capilar'] },
    { id: 'Advocacia', icon: Scale, label: 'Advocacia', keywords: ['jurid', 'advoga', 'direito'] },
    { id: 'Consultoria', icon: Briefcase, label: 'Consultoria', keywords: ['consult', 'assessoria'] },
    { id: 'Outros', icon: UserCheck, label: 'Outros', keywords: [] },
];

const OnboardingView: React.FC<OnboardingViewProps> = ({ onFinish, onBackToLogin, showToast }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchingCnpj, setIsSearchingCnpj] = useState(false);

  // Consolidated Form State to prevent multiple re-renders
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cnpj: '',
    companyName: '',
    niche: ''
  });

  // --- LOGIC ---

  // Lightweight CNPJ Mask (Regex)
  const maskCnpj = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  // CNPJ Fetcher - Using ReceitaWS (queryRFFree logic)
  const fetchCnpjData = async (cnpjRaw: string) => {
    const cleanCnpj = cnpjRaw.replace(/\D/g, '');
    if (cleanCnpj.length !== 14) return;

    setIsSearchingCnpj(true);

    try {
        // NOTE: In a real production environment, calling ReceitaWS directly from the client 
        // will likely be blocked by CORS unless using a Proxy or JSONP.
        // We implement the standard fetch here. If it fails due to CORS, we handle gracefully.
        const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cleanCnpj}`);
        
        if (response.ok) {
            const data = await response.json();
            
            if (data.status === 'OK') {
                // Auto-fill logic
                const companyName = data.fantasia || data.nome;
                const email = data.email || formData.email;
                
                // Try to infer niche based on activity text
                let inferredNiche = '';
                const activityText = (data.atividade_principal?.[0]?.text || '').toLowerCase();
                
                const foundNiche = NICHES.find(n => 
                    n.keywords.some(k => activityText.includes(k))
                );
                if (foundNiche) inferredNiche = foundNiche.id;

                setFormData(prev => ({
                    ...prev,
                    companyName: companyName,
                    email: prev.email || email, // Only fill email if empty
                    niche: inferredNiche || prev.niche
                }));
                showToast("Empresa Localizada!", "success", `Dados de ${companyName} carregados.`);
            } else {
                 showToast("Atenção", "warning", "CNPJ não encontrado ou inválido na Receita.");
            }
        } else {
             throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.warn("CNPJ Auto-fetch failed (likely CORS or rate limit). This is expected in client-side demos.", error);
        // Silent fail or simple toast to not block user flow
        // showToast("Info", "info", "Preencha os dados manualmente.");
    } finally {
        setIsSearchingCnpj(false);
    }
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const masked = maskCnpj(raw);
      setFormData(prev => ({ ...prev, cnpj: masked }));

      // Trigger search when full length is reached (14 digits + formatting = 18 chars)
      if (masked.length === 18) {
          fetchCnpjData(masked);
      }
  };

  const handleNext = () => {
    // Validation Logic
    if (currentStep === 1) {
        if (!formData.name || !formData.email || !formData.password) {
            showToast("Campos obrigatórios", "error", "Preencha todos os dados pessoais.");
            return;
        }
    }
    
    if (currentStep === 2) {
        if (!formData.companyName || !formData.niche) {
            showToast("Dados da empresa", "error", "Nome da empresa e ramo de atuação são obrigatórios.");
            return;
        }
    }

    if (currentStep < 3) {
      setCurrentStep(curr => curr + 1);
    } else {
      setIsLoading(true);
      // Simulate API Submission
      setTimeout(() => {
        onFinish();
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1);
    } else {
      onBackToLogin();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
       
      {/* Header */}
      <div className="mb-8 text-center animate-in slide-in-from-top-4 fade-in duration-700">
         <div className="inline-flex items-center gap-2 mb-4 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer" onClick={onBackToLogin}>
             <LogoMeetZen size={24} />
             <span className="font-bold text-lg tracking-tight text-zinc-900">Meet Zen AI</span>
         </div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden flex flex-col md:flex-row min-h-[550px]">
        
        {/* Sidebar Progress */}
        <div className="w-full md:w-72 bg-zinc-50 border-b md:border-b-0 md:border-r border-zinc-200 p-8 flex flex-col justify-between">
           <div>
               <h2 className="text-xl font-bold text-zinc-900 mb-2">Configuração</h2>
               <p className="text-sm text-zinc-500 mb-8">Siga os passos para ativar sua conta.</p>
               
               <div className="flex md:flex-col gap-4 md:gap-0 relative">
                   <div className="hidden md:block absolute left-[19px] top-4 bottom-4 w-0.5 bg-zinc-200 -z-0"></div>
                   
                   {steps.map((step) => {
                       const isActive = step.id === currentStep;
                       const isCompleted = step.id < currentStep;
                       return (
                           <div key={step.id} className="relative z-10 flex md:items-center gap-4 mb-0 md:mb-8 last:mb-0 group">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-110' 
                                        : isCompleted 
                                            ? 'bg-green-100 border-green-100 text-green-700' 
                                            : 'bg-white border-zinc-200 text-zinc-300'
                                }`}>
                                    {isCompleted ? <CheckCircle2 size={18} /> : <step.icon size={18} />}
                                </div>
                                <div className="hidden md:block">
                                    <p className={`text-sm font-bold transition-colors ${isActive ? 'text-zinc-900' : isCompleted ? 'text-zinc-700' : 'text-zinc-400'}`}>
                                        {step.title}
                                    </p>
                                    {isActive && <p className="text-xs text-primary animate-in fade-in">Em andamento</p>}
                                </div>
                           </div>
                       )
                   })}
               </div>
           </div>

           <div className="hidden md:block pt-8 border-t border-zinc-200">
               <p className="text-xs text-zinc-400">Precisa de ajuda? <a href="#" className="text-primary hover:underline">Fale com suporte</a></p>
           </div>
        </div>

        {/* Main Content Form */}
        <div className="flex-1 p-6 md:p-10 flex flex-col">
           <div className="flex-1">
                {currentStep === 1 && (
                    <div className="space-y-6 max-w-md mx-auto animate-in slide-in-from-right-8 fade-in duration-300">
                        <div>
                            <h3 className="text-2xl font-bold text-zinc-900">Vamos começar por você</h3>
                            <p className="text-zinc-500 mt-1">Crie seus dados de administrador.</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5 ml-1">Nome Completo</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
                                    placeholder="Ex: Ana Souza"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5 ml-1">E-mail Corporativo</label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
                                    placeholder="ana@clinica.com"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5 ml-1">Senha</label>
                                <input 
                                    type="password" 
                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
                                    placeholder="Crie uma senha forte"
                                    value={formData.password}
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                         <div>
                            <h3 className="text-2xl font-bold text-zinc-900">Sobre seu negócio</h3>
                            <p className="text-zinc-500 mt-1">Preencha o CNPJ para busca automática ou digite manualmente.</p>
                        </div>

                        <div className="space-y-6">
                            {/* CNPJ Input with Auto-Fetch */}
                             <div>
                                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5 ml-1 flex justify-between">
                                    <span>CNPJ (Opcional)</span>
                                    {isSearchingCnpj && <span className="text-primary flex items-center gap-1"><Loader2 size={10} className="animate-spin"/> Buscando na Receita...</span>}
                                </label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className={`w-full pl-10 pr-4 py-3 bg-zinc-50 border ${isSearchingCnpj ? 'border-primary' : 'border-zinc-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400 font-mono`}
                                        placeholder="00.000.000/0000-00"
                                        value={formData.cnpj}
                                        onChange={handleCnpjChange}
                                        maxLength={18}
                                        autoFocus
                                    />
                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                    {formData.cnpj.length > 0 && formData.cnpj.length < 18 && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Digite completo para buscar"></div>
                                        </div>
                                    )}
                                </div>
                                <p className="text-[10px] text-zinc-400 mt-1 ml-1">
                                    Ao digitar os 14 números, buscaremos os dados oficiais automaticamente.
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5 ml-1">Nome da Empresa</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
                                    placeholder="Ex: Clínica Sorriso"
                                    value={formData.companyName}
                                    onChange={e => setFormData({...formData, companyName: e.target.value})}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 uppercase mb-3 ml-1">Qual seu ramo de atuação?</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {NICHES.map((niche) => {
                                        const isSelected = formData.niche === niche.id;
                                        return (
                                            <button
                                                key={niche.id}
                                                onClick={() => setFormData({...formData, niche: niche.id})}
                                                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                                                    isSelected 
                                                        ? 'border-primary bg-primary/5 shadow-sm' 
                                                        : 'border-zinc-100 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                                                }`}
                                            >
                                                <niche.icon size={24} className={`mb-2 ${isSelected ? 'text-primary' : 'text-zinc-400'}`} />
                                                <span className={`text-xs font-medium ${isSelected ? 'text-primary font-bold' : 'text-zinc-600'}`}>
                                                    {niche.label}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-500 py-8">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-green-200 rounded-full opacity-20 animate-ping"></div>
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center relative z-10">
                                {isLoading ? (
                                    <Loader2 size={40} className="text-green-600 animate-spin" />
                                ) : (
                                    <CheckCircle2 size={40} className="text-green-600" />
                                )}
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-zinc-900 mb-2">Tudo pronto!</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto text-lg leading-relaxed mb-6">
                            Sua conta foi criada com sucesso. Estamos preparando seu ambiente seguro.
                        </p>
                        
                        {/* Summary of Data */}
                        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 text-left w-full max-w-xs space-y-2">
                             <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">Empresa:</span>
                                <span className="font-bold text-zinc-900">{formData.companyName}</span>
                             </div>
                             <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">Admin:</span>
                                <span className="font-bold text-zinc-900">{formData.name}</span>
                             </div>
                        </div>
                    </div>
                )}
           </div>

           {/* Navigation Buttons */}
           <div className="flex justify-between items-center pt-8 border-t border-zinc-100 mt-auto">
               {currentStep === 1 ? (
                   <button 
                        onClick={onBackToLogin}
                        className="px-6 py-3 text-zinc-500 font-medium hover:text-zinc-900 transition-colors"
                   >
                        Já tenho conta
                   </button>
               ) : (
                   <button 
                        onClick={handleBack}
                        disabled={isLoading}
                        className="px-6 py-3 text-zinc-500 font-medium hover:text-zinc-900 transition-colors flex items-center gap-2 hover:-translate-x-1"
                   >
                        <ArrowLeft size={18} /> Voltar
                   </button>
               )}

               <button 
                    onClick={handleNext}
                    disabled={isLoading}
                    className="px-8 py-3.5 bg-zinc-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-zinc-800 transition-all flex items-center gap-2 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
               >
                    {isLoading ? 'Finalizando...' : currentStep === 3 ? 'Acessar Painel' : 'Continuar'}
                    {!isLoading && <ArrowRight size={18} />}
               </button>
           </div>
        </div>
      </div>
      
      {/* Mobile Help Text */}
      <div className="mt-8 text-center md:hidden">
         <p className="text-xs text-zinc-400">Precisa de ajuda? <a href="#" className="text-primary hover:underline">Suporte</a></p>
      </div>

    </div>
  );
};

export default OnboardingView;