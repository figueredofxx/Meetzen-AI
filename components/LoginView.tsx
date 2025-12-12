
import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, Loader2, Check, Eye, EyeOff, Star, ShieldCheck } from 'lucide-react';
import { ToastType } from '../types';
import { LogoMeetZen } from './Sidebar';

interface LoginViewProps {
  onLogin: () => void;
  onGoToOnboarding: () => void;
  onForgotPassword: () => void;
  onBack: () => void;
  showToast: (title: string, type: ToastType, message?: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onGoToOnboarding, onForgotPassword, onBack, showToast }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate network validation
    setTimeout(() => {
        if (email === 'admin@admin.com' && password === '123456') {
            setStatus('success');
            setTimeout(() => {
                onLogin();
            }, 800);
        } else {
            setStatus('idle');
            showToast('Falha no login', 'error', 'E-mail ou senha incorretos. Tente admin@admin.com / 123456');
        }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white w-full">
      
      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen relative z-10 bg-white">
        
        {/* Header / Back Button - Sticky on mobile to always allow exit */}
        <div className="px-6 py-6 sm:px-12 sm:py-8 lg:px-24 flex-shrink-0 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors group"
            >
                <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center group-hover:bg-zinc-200 transition-colors shadow-sm">
                    <LogoMeetZen size={16} />
                </div>
                <span className="font-bold text-sm tracking-tight text-zinc-900">Meet Zen AI</span>
            </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 pb-8 w-full max-w-xl mx-auto lg:max-w-none">
            
            {/* Title Section */}
            <div className="mb-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                        <Lock size={20} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">Bem-vindo de volta</h1>
                </div>
                <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
                    Digite suas credenciais para acessar o painel de controle da sua clínica.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-100">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide ml-1">E-mail</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input 
                            type="email" 
                            inputMode="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
                            placeholder="seu@email.com"
                            required
                            disabled={status !== 'idle'}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Senha</label>
                        <button 
                            type="button"
                            onClick={onForgotPassword} 
                            className="text-xs text-primary font-medium hover:underline p-1 -mr-1"
                        >
                            Esqueceu a senha?
                        </button>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input 
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
                            placeholder="••••••••"
                            required
                            disabled={status !== 'idle'}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-2 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="pt-2">
                    <button 
                        type="submit" 
                        disabled={status !== 'idle'}
                        className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group relative overflow-hidden text-base ${
                            status === 'success' 
                                ? 'bg-green-600 text-white shadow-green-900/20 scale-[0.98]' 
                                : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-zinc-900/20 hover:-translate-y-0.5 active:scale-95'
                        } disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none`}
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                <span>Autenticando...</span>
                            </>
                        ) : status === 'success' ? (
                            <>
                                <Check size={20} />
                                <span>Login realizado!</span>
                            </>
                        ) : (
                            <>
                                Entrar na Plataforma
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="text-center pt-6 pb-4">
                <p className="text-sm text-zinc-500">
                    Ainda não tem conta?{' '}
                    <button onClick={onGoToOnboarding} className="text-primary font-bold hover:underline p-1">
                        Começar teste grátis
                    </button>
                </p>
            </div>
        </div>
        
        {/* Footer Text */}
        <div className="px-6 py-6 text-center mt-auto flex-shrink-0">
            <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5">
                <ShieldCheck size={12} />
                Ambiente seguro criptografado de ponta a ponta.
            </p>
        </div>
      </div>

      {/* RIGHT SIDE - BRANDING / VISUAL (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 relative items-center justify-center p-12 overflow-hidden fixed right-0 h-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-lg text-white space-y-8 animate-in slide-in-from-right-8 fade-in duration-700 delay-100">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full backdrop-blur-md">
                 <Star size={12} className="text-yellow-400 fill-yellow-400" />
                 <span className="text-xs font-medium text-zinc-200">Recomendado por +500 clínicas</span>
             </div>

             <h2 className="text-4xl font-bold leading-tight">
                "O Meet Zen reduziu nosso no-show a zero em menos de um mês."
             </h2>
             
             <div className="space-y-4">
                <p className="text-zinc-400 text-lg leading-relaxed">
                    Nossa IA não é apenas um chatbot. É um agente autônomo treinado para entender contexto, negociar horários e garantir que sua agenda esteja sempre cheia e otimizada.
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-400">
                        RC
                    </div>
                    <div>
                        <p className="font-bold text-white">Dr. Roberto Campos</p>
                        <p className="text-sm text-zinc-500">Cirurgião Dentista</p>
                    </div>
                </div>
             </div>
        </div>
      </div>

    </div>
  );
};

export default LoginView;
