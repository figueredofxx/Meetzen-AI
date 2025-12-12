import React, { useState } from 'react';
import { ArrowLeft, Mail, Loader2, CheckCircle2, KeyRound, ShieldCheck } from 'lucide-react';
import { LogoMeetZen } from './Sidebar';

interface ResetPasswordViewProps {
  onBackToLogin: () => void;
}

const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simula requisição de API
    setTimeout(() => {
        setStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-24 relative">
        <button 
            onClick={onBackToLogin}
            className="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors group"
        >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Voltar para Login</span>
        </button>

        <div className="max-w-md w-full mx-auto animate-in slide-in-from-left-8 fade-in duration-500">
            
            {status === 'success' ? (
                <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-200">
                        <CheckCircle2 size={40} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 mb-2">E-mail enviado!</h2>
                        <p className="text-zinc-500 leading-relaxed">
                            Enviamos instruções de recuperação para <span className="font-bold text-zinc-800">{email}</span>.
                        </p>
                        <p className="text-xs text-zinc-400 mt-2">
                            Verifique sua caixa de entrada e spam. O link expira em 1 hora.
                        </p>
                    </div>
                    <button 
                        onClick={onBackToLogin}
                        className="w-full py-3.5 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all shadow-lg"
                    >
                        Voltar para Login
                    </button>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="text-sm text-zinc-500 hover:text-zinc-900 underline"
                    >
                        Tentar outro e-mail
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                            <KeyRound size={24} />
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Redefinir Senha</h1>
                        <p className="text-zinc-500 leading-relaxed">
                            Não se preocupe, acontece. Digite o e-mail associado à sua conta e enviaremos um link para criar uma nova senha.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide ml-1">E-mail Corporativo</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
                                    placeholder="seu@email.com"
                                    required
                                    disabled={status === 'loading'}
                                    autoFocus
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={status === 'loading' || !email}
                            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Enviando...</span>
                                </>
                            ) : (
                                'Enviar Link de Recuperação'
                            )}
                        </button>
                    </form>
                </>
            )}
        </div>
        
        <div className="mt-auto pt-10 text-center">
            <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5">
                <ShieldCheck size={12} />
                Processo seguro e criptografado.
            </p>
        </div>
      </div>

      {/* RIGHT SIDE - VISUAL */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-900/90 to-primary/20"></div>
        
        <div className="relative z-10 max-w-lg text-center space-y-6 animate-in slide-in-from-right-8 fade-in duration-700 delay-100">
             <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800 rounded-2xl mb-4 border border-zinc-700 shadow-2xl">
                 <LogoMeetZen size={40} className="text-white" />
             </div>
             
             <h2 className="text-3xl font-bold text-white leading-tight">
                Recupere seu acesso e volte a vender.
             </h2>
             <p className="text-zinc-400 text-lg leading-relaxed">
                Sua secretária virtual continua trabalhando enquanto você recupera sua senha. Nenhuma mensagem foi perdida.
             </p>
        </div>
      </div>

    </div>
  );
};

export default ResetPasswordView;