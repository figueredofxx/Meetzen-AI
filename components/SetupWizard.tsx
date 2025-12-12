
import React, { useState } from 'react';
import { 
  ArrowRight, Check, Smartphone, Calendar, 
  Clock, Zap, Loader2, CheckCircle2, QrCode, 
  ShieldCheck, LayoutTemplate, Coffee
} from 'lucide-react';
import { LogoMeetZen } from './Sidebar';

interface SetupWizardProps {
  onFinish: () => void;
}

const steps = [
  { id: 1, title: 'Conectar WhatsApp', desc: 'Canal de atendimento' },
  { id: 2, title: 'Sincronizar Agenda', desc: 'Disponibilidade real' },
  { id: 3, title: 'Regras da IA', desc: 'Comportamento' },
];

const SetupWizard: React.FC<SetupWizardProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // States for connections
  const [waConnected, setWaConnected] = useState(false);
  const [calConnected, setCalConnected] = useState(false);
  const [aiConfig, setAiConfig] = useState({
      autoConfirm: true,
      openTime: '09:00',
      closeTime: '18:00',
      hasLunchBreak: true,
      lunchStart: '12:00',
      lunchEnd: '13:00'
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(curr => curr + 1);
    } else {
      setLoading(true);
      // Simulate saving everything
      setTimeout(() => {
        onFinish();
      }, 2000);
    }
  };

  const handleSkip = () => {
      // Logic for skipping (marking as optional/later)
      setCurrentStep(curr => curr + 1);
  };

  const simulateConnection = (type: 'wa' | 'cal') => {
      setLoading(true);
      setTimeout(() => {
          if (type === 'wa') setWaConnected(true);
          if (type === 'cal') setCalConnected(true);
          setLoading(false);
      }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Brand Header */}
      <div className="mb-8 flex items-center gap-2 text-zinc-900 animate-in slide-in-from-top-4 fade-in">
        <LogoMeetZen size={32} />
        <span className="text-xl font-bold tracking-tight">Meet Zen AI</span>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Sidebar Stepper */}
        <div className="w-full md:w-80 bg-zinc-900 p-8 flex flex-col justify-between text-white relative overflow-hidden">
            {/* Abstract bg shape */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            
            <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Configuração Inicial</h2>
                <p className="text-zinc-400 text-sm mb-10">Vamos preparar sua secretária virtual para começar a trabalhar.</p>

                <div className="space-y-8">
                    {steps.map((step, idx) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;

                        return (
                            <div key={step.id} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all duration-300 ${
                                        isActive 
                                            ? 'bg-primary border-primary text-white scale-110' 
                                            : isCompleted 
                                                ? 'bg-green-500 border-green-500 text-white' 
                                                : 'bg-transparent border-zinc-700 text-zinc-500'
                                    }`}>
                                        {isCompleted ? <Check size={14} /> : step.id}
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div className={`w-0.5 h-full mt-2 rounded-full transition-colors duration-500 ${isCompleted ? 'bg-green-500' : 'bg-zinc-800'}`}></div>
                                    )}
                                </div>
                                <div className={`pt-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                    <h3 className="font-bold text-sm">{step.title}</h3>
                                    <p className="text-xs text-zinc-400">{step.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="relative z-10 pt-8 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 flex items-center gap-2">
                    <ShieldCheck size={14} /> Seus dados estão criptografados.
                </p>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 md:p-12 flex flex-col bg-white relative">
            
            {/* STEP 1: WHATSAPP */}
            {currentStep === 1 && (
                <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="mb-8">
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide border border-green-100 mb-4 inline-block">Passo 1 de 3</span>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Conectar WhatsApp</h2>
                        <p className="text-zinc-500">Escaneie o QR Code para vincular seu número comercial à IA.</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        {!waConnected ? (
                            <div className="w-full max-w-sm bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center transition-all hover:border-zinc-300">
                                {loading ? (
                                    <div className="py-12">
                                        <Loader2 size={48} className="text-primary animate-spin mb-4 mx-auto" />
                                        <p className="text-zinc-900 font-bold">Conectando...</p>
                                        <p className="text-xs text-zinc-500">Aguardando validação do servidor</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-48 h-48 bg-white p-2 rounded-xl border border-zinc-100 mb-6 shadow-sm">
                                            {/* Fake QR Code Pattern */}
                                            <div className="w-full h-full bg-zinc-900 opacity-90 rounded-lg flex items-center justify-center text-white/20">
                                                <QrCode size={80} />
                                            </div>
                                        </div>
                                        <h3 className="text-zinc-900 font-bold mb-2">Escaneie com seu celular</h3>
                                        <p className="text-xs text-zinc-500 mb-6 max-w-[240px]">
                                            Abra o WhatsApp {'>'} Configurações {'>'} Aparelhos Conectados {'>'} Conectar Aparelho
                                        </p>
                                        <button 
                                            onClick={() => simulateConnection('wa')}
                                            className="px-6 py-2 bg-zinc-900 text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors w-full"
                                        >
                                            Simular Leitura do QR Code
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 animate-in zoom-in-95 duration-300">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-2">WhatsApp Conectado!</h3>
                                <p className="text-zinc-500">Número vinculado: <span className="font-mono text-zinc-700 font-bold">+55 11 99999-8888</span></p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* STEP 2: GOOGLE CALENDAR */}
            {currentStep === 2 && (
                <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="mb-8">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide border border-blue-100 mb-4 inline-block">Passo 2 de 3</span>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Sincronizar Agenda</h2>
                        <p className="text-zinc-500">Conecte o Google Agenda para que a IA verifique sua disponibilidade em tempo real.</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        {!calConnected ? (
                            <div className="w-full max-w-sm text-center">
                                <div className="bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm mb-6 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                                        <Calendar size={32} />
                                    </div>
                                    <h3 className="font-bold text-zinc-900 mb-2">Google Calendar</h3>
                                    <p className="text-xs text-zinc-500 mb-6">Ler e gravar eventos na sua agenda principal.</p>
                                    
                                    <button 
                                        onClick={() => simulateConnection('cal')}
                                        disabled={loading}
                                        className="w-full py-3 bg-white border border-zinc-300 text-zinc-700 font-bold rounded-xl hover:bg-zinc-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        {loading ? <Loader2 size={18} className="animate-spin" /> : (
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                        )}
                                        Conectar com Google
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-xs text-zinc-400">
                                        Pediremos permissão apenas para gerenciar seus eventos.
                                    </p>
                                    <button 
                                        onClick={handleSkip}
                                        className="text-xs font-medium text-zinc-500 hover:text-zinc-800 underline flex items-center justify-center gap-1"
                                    >
                                        Pular esta etapa por enquanto
                                    </button>
                                </div>
                            </div>
                        ) : (
                             <div className="text-center py-12 animate-in zoom-in-95 duration-300">
                                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Agenda Sincronizada!</h3>
                                <p className="text-zinc-500">Vinculado a: <span className="font-mono text-zinc-700 font-bold">doutor@clinica.com</span></p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* STEP 3: INITIAL AI CONFIG */}
            {currentStep === 3 && (
                <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="mb-8">
                        <span className="px-3 py-1 bg-violet-50 text-violet-700 text-xs font-bold rounded-full uppercase tracking-wide border border-violet-100 mb-4 inline-block">Passo 3 de 3</span>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Comportamento da IA</h2>
                        <p className="text-zinc-500">Defina as regras básicas para a secretária começar a operar agora.</p>
                    </div>

                    <div className="max-w-md w-full mx-auto space-y-6">
                        
                        {/* Auto Confirm Toggle */}
                        <div className="p-4 rounded-xl border border-zinc-200 bg-white hover:border-violet-300 transition-colors cursor-pointer" onClick={() => setAiConfig({...aiConfig, autoConfirm: !aiConfig.autoConfirm})}>
                            <div className="flex items-start gap-3">
                                <div className={`mt-1 p-1.5 rounded-lg ${aiConfig.autoConfirm ? 'bg-violet-100 text-violet-600' : 'bg-zinc-100 text-zinc-400'}`}>
                                    <Zap size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-zinc-900 text-sm">Confirmação Automática</h3>
                                        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${aiConfig.autoConfirm ? 'bg-violet-600' : 'bg-zinc-200'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${aiConfig.autoConfirm ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-1">
                                        Se houver vaga na agenda, a IA pode agendar e confirmar sem sua aprovação humana?
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="p-4 rounded-xl border border-zinc-200 bg-white">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock size={16} className="text-zinc-500" />
                                <h3 className="font-bold text-zinc-900 text-sm">Horário Padrão (Seg-Sex)</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 mb-1">Início</label>
                                    <input 
                                        type="time" 
                                        value={aiConfig.openTime}
                                        onChange={e => setAiConfig({...aiConfig, openTime: e.target.value})}
                                        className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 mb-1">Fim</label>
                                    <input 
                                        type="time" 
                                        value={aiConfig.closeTime}
                                        onChange={e => setAiConfig({...aiConfig, closeTime: e.target.value})}
                                        className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500"
                                    />
                                </div>
                            </div>

                            {/* Lunch Break Toggle */}
                            <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                                <input 
                                    type="checkbox" 
                                    id="lunchBreak" 
                                    checked={aiConfig.hasLunchBreak}
                                    onChange={(e) => setAiConfig({...aiConfig, hasLunchBreak: e.target.checked})}
                                    className="w-4 h-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                                />
                                <label htmlFor="lunchBreak" className="text-sm text-zinc-700 font-medium flex items-center gap-2 cursor-pointer">
                                    <Coffee size={14} className="text-zinc-400"/> Intervalo de Almoço
                                </label>
                            </div>

                            {aiConfig.hasLunchBreak && (
                                <div className="grid grid-cols-2 gap-4 mt-3 animate-in fade-in slide-in-from-top-2">
                                    <div>
                                        <input 
                                            type="time" 
                                            value={aiConfig.lunchStart}
                                            onChange={e => setAiConfig({...aiConfig, lunchStart: e.target.value})}
                                            className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            type="time" 
                                            value={aiConfig.lunchEnd}
                                            onChange={e => setAiConfig({...aiConfig, lunchEnd: e.target.value})}
                                            className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs"
                                        />
                                    </div>
                                </div>
                            )}

                            <p className="text-[10px] text-zinc-400 mt-3 flex items-center gap-1">
                                <LayoutTemplate size={10} />
                                Você poderá ajustar dias específicos (Sábados/Domingos) no painel completo depois.
                            </p>
                        </div>

                    </div>
                </div>
            )}

            {/* Footer Navigation */}
            <div className="mt-auto pt-8 border-t border-zinc-100 flex justify-between items-center">
                <button 
                    onClick={() => currentStep > 1 && setCurrentStep(c => c - 1)}
                    className={`text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}
                >
                    Voltar
                </button>
                
                <button 
                    onClick={handleNext}
                    disabled={
                        (currentStep === 1 && !waConnected) || 
                        (currentStep === 2 && !calConnected) ||
                        loading
                    }
                    className="px-8 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg shadow-zinc-900/10 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Finalizando...</span>
                        </>
                    ) : (
                        <>
                            {currentStep === 3 ? 'Ir para o Painel' : 'Próximo Passo'}
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
