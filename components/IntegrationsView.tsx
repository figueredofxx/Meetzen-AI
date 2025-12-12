
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Plus, RefreshCcw, Loader2, Lock, Trash2, Smartphone, Server, HelpCircle, ExternalLink } from 'lucide-react';
import { ToastType, PlanType } from '../types';

interface IntegrationsViewProps {
    showToast?: (title: string, type: ToastType, message?: string) => void;
    userPlan?: PlanType;
    onChangePlan?: () => void;
}

const WhatsAppIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
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

const GoogleCalendarIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 192 192"
    fill="currentColor"
    className={className}
  >
    <path d="M11.01,6.317v28.597h169.98V6.317c0-3.488-2.829-6.317-6.319-6.317H17.329C13.839,0,11.01,2.829,11.01,6.317z M141.567,8.5 c3.866,0,7,3.134,7,7s-3.134,7-7,7s-7-3.134-7-7S137.701,8.5,141.567,8.5z M50.433,8.5c3.866,0,7,3.134,7,7s-3.134,7-7,7 s-7-3.134-7-7S46.566,8.5,50.433,8.5z M3.426,56.231l7.583,50.194v1.264v40.079v37.914c0,3.488,2.829,6.317,6.319,6.317h157.343 c3.49,0,6.319-2.829,6.319-6.317v-37.914v-40.079v-1.264l7.583-50.194c0-3.488-2.83-6.317-6.319-6.317H9.746 C6.256,49.914,3.426,52.743,3.426,56.231z M111.974,83.568l27.661-2.9v79.331H129V91.571l-17.026,0.161V83.568z M46.017,139.696 l0.107-0.322h10.098c0,3.796,1.37,6.991,4.109,9.588c2.739,2.596,6.275,3.894,10.608,3.894c4.297,0,7.681-1.334,10.151-4.001 c2.471-2.668,3.706-6.15,3.706-10.447c0-4.905-1.137-8.575-3.411-11.011c-2.274-2.435-5.846-3.652-10.715-3.652h-8.701v-8.218h8.701 c4.727,0,8.065-1.173,10.017-3.518c1.951-2.346,2.927-5.631,2.927-9.856c0-3.938-1.066-7.116-3.196-9.534 c-2.131-2.416-5.291-3.625-9.48-3.625c-4.082,0-7.457,1.262-10.124,3.787c-2.668,2.523-4.002,5.685-4.002,9.48H46.715l-0.161-0.322 c-0.18-5.872,2.041-10.885,6.66-15.039c4.619-4.153,10.527-6.23,17.725-6.23c7.269,0,12.962,1.835,17.08,5.505 c4.117,3.671,6.177,9.069,6.177,16.194c0,3.652-0.958,6.982-2.873,9.99c-1.916,3.008-4.592,5.354-8.03,7.036 c3.938,1.576,6.937,3.966,8.997,7.17c2.059,3.205,3.088,7.082,3.088,11.629c0,7.162-2.265,12.774-6.795,16.838 c-4.53,4.064-10.412,6.097-17.644,6.097c-6.66,0-12.524-1.96-17.59-5.882C48.281,151.325,45.837,146.142,46.017,139.696z" />
  </svg>
);

interface WhatsAppInstance {
    id: string;
    name: string;
    number: string;
    status: 'connected' | 'disconnected' | 'connecting';
}

const IntegrationsView: React.FC<IntegrationsViewProps> = ({ showToast, userPlan = 'starter', onChangePlan }) => {
  const [waInstances, setWaInstances] = useState<WhatsAppInstance[]>([
      { id: '1', name: 'Atendimento Principal', number: '', status: 'disconnected' }
  ]);
  
  // In a real app, this status is fetched from the backend (which checks Evolution API status)
  const [systemOnline, setSystemOnline] = useState(true); 

  const [googleConnected, setGoogleConnected] = useState(false);
  const [loadingWa, setLoadingWa] = useState<string | null>(null);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const isInfinity = userPlan === 'infinity';

  const handleAddInstance = () => {
      if (!isInfinity) {
          if (onChangePlan) onChangePlan(); 
          return;
      }
      
      const newId = Date.now().toString();
      setWaInstances(prev => [...prev, { id: newId, name: `WhatsApp ${prev.length + 1}`, number: '', status: 'disconnected' }]);
  };

  const handleConnectInstance = (id: string) => {
      setLoadingWa(id);
      // Simulate calling backend to get QR code from Evolution API
      setTimeout(() => {
          setLoadingWa(null);
          setWaInstances(prev => prev.map(inst => 
              inst.id === id ? { ...inst, status: 'connected', number: '+55 11 98888-7777' } : inst
          ));
          if (showToast) showToast("WhatsApp Conectado", "success", "A IA já está pronta para responder neste número.");
      }, 2500);
  };

  const handleDisconnectInstance = (id: string) => {
      if (window.confirm("Desconectar este número? A IA parará de responder nele.")) {
          setWaInstances(prev => prev.filter(inst => inst.id !== id));
          if (showToast) showToast("Instância removida", "info");
      }
  };

   const toggleGoogle = () => {
      setLoadingGoogle(true);
      setTimeout(() => {
          setLoadingGoogle(false);
          const newState = !googleConnected;
          setGoogleConnected(newState);
           if (showToast) showToast(
              newState ? "Google Agenda Conectado" : "Google Agenda Desconectado",
              newState ? "success" : "info",
              newState ? "Sincronização iniciada com sucesso." : "Sincronização parada."
          );
      }, 1200);
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-10 mb-20">
        <div>
           <h1 className="text-2xl font-bold text-zinc-900 mb-2">Canais de Atendimento</h1>
           <p className="text-zinc-500">Gerencie por onde seus clientes entram em contato.</p>
        </div>

        {/* --- SYSTEM STATUS ALERT --- */}
        {!systemOnline && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-amber-800 animate-in slide-in-from-top-2">
                <Server size={20} />
                <div>
                    <p className="font-bold text-sm">Servidor em Manutenção</p>
                    <p className="text-xs">Não é possível gerar novos QR Codes no momento. Tente novamente em alguns minutos.</p>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* WhatsApp Integration Panel */}
            <div className={`p-6 border border-zinc-200 rounded-xl bg-white flex flex-col min-h-[320px] transition-opacity`}>
                <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                            <WhatsAppIcon size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-zinc-900">WhatsApp</h3>
                            <p className="text-xs text-zinc-500">Powered by Evolution API</p>
                        </div>
                    </div>
                    {isInfinity && (
                        <span className="px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase rounded-full tracking-wide">Infinity</span>
                    )}
                </div>

                <div className="flex-1 space-y-4">
                    {waInstances.map((instance) => (
                        <div key={instance.id} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <Smartphone size={16} className="text-zinc-400"/>
                                    <span className="text-sm font-bold text-zinc-700">{instance.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${instance.status === 'connected' ? 'bg-green-500' : 'bg-red-400'}`}></span>
                                    <span className="text-[10px] text-zinc-500 uppercase font-medium">{instance.status === 'connected' ? 'Online' : 'Offline'}</span>
                                </div>
                            </div>
                            
                            {instance.status === 'connected' ? (
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-mono text-zinc-600 bg-white px-2 py-1 rounded border border-zinc-100 inline-block">
                                        {instance.number}
                                    </p>
                                    <button 
                                        onClick={() => handleDisconnectInstance(instance.id)}
                                        className="text-zinc-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Desconectar"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => handleConnectInstance(instance.id)}
                                    disabled={loadingWa === instance.id || !systemOnline}
                                    className="w-full py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loadingWa === instance.id && <Loader2 size={12} className="animate-spin" />}
                                    Gerar QR Code
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100">
                    <button 
                        onClick={handleAddInstance}
                        className={`w-full py-3 border border-dashed rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 group ${
                            isInfinity 
                                ? 'border-zinc-300 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-400' 
                                : 'border-zinc-200 text-zinc-400 hover:bg-zinc-50'
                        }`}
                    >
                        {isInfinity ? <Plus size={16} className="text-zinc-500 group-hover:text-zinc-900"/> : <Lock size={14} />}
                        {isInfinity ? 'Adicionar nova instância' : 'Múltiplas instâncias (Requer Infinity)'}
                    </button>
                </div>
            </div>

            {/* Google Calendar Integration */}
            <div className="p-6 border border-zinc-200 rounded-xl bg-white flex flex-col justify-between min-h-[320px]">
                <div className="space-y-4">
                     <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                <GoogleCalendarIcon size={28} />
                            </div>
                            <h3 className="font-bold text-lg text-zinc-900">Google Agenda</h3>
                        </div>
                         <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${googleConnected ? 'bg-green-50 text-green-700 border-green-200' : 'bg-zinc-50 text-zinc-500 border-zinc-200'}`}>
                            {googleConnected ? 'Conectado' : 'Desconectado'}
                        </span>
                    </div>
                    <p className="text-sm text-zinc-500">
                        {googleConnected
                            ? "Sincronizado com sua agenda principal para verificação de disponibilidade em tempo real."
                            : "Vincule sua agenda para que a IA possa consultar disponibilidade e agendar automaticamente."}
                    </p>
                    
                    {googleConnected && (
                         <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100 space-y-1">
                            <span className="text-xs text-zinc-400 uppercase font-semibold">Calendário Principal</span>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-zinc-900">consultorio@gmail.com</p>
                                <RefreshCcw size={14} className="text-zinc-400 cursor-pointer hover:text-zinc-600" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-100">
                     {googleConnected ? (
                         <button 
                            onClick={toggleGoogle}
                            disabled={loadingGoogle}
                            className="w-full py-2 px-4 bg-white border border-zinc-200 text-zinc-600 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
                        >
                            {loadingGoogle && <Loader2 size={14} className="animate-spin" />}
                            Desconectar Conta Google
                        </button>
                     ) : (
                        <button 
                            onClick={toggleGoogle}
                            disabled={loadingGoogle}
                            className="w-full py-2.5 bg-white border border-zinc-300 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            {loadingGoogle && <Loader2 size={16} className="animate-spin" />}
                            {loadingGoogle ? 'Autenticando...' : 'Conectar com Google'}
                        </button>
                     )}
                </div>
            </div>

            {/* Future Integrations */}
            <div className="p-6 border border-zinc-200 border-dashed rounded-xl bg-zinc-50/50 flex flex-col justify-between col-span-1 md:col-span-2">
                <div className="flex items-start justify-between">
                    <div>
                         <h3 className="font-bold text-lg text-zinc-900 mb-1">Em breve</h3>
                         <p className="text-sm text-zinc-500 mb-4">Estamos trabalhando para integrar novas ferramentas.</p>
                         <div className="flex gap-2 flex-wrap">
                            {['Telegram', 'Instagram Inbox', 'Salesforce', 'HubSpot', 'VoIP'].map(tool => (
                                <span key={tool} className="px-3 py-1 bg-white border border-zinc-200 text-zinc-600 text-xs rounded-full">
                                    {tool}
                                </span>
                            ))}
                         </div>
                    </div>
                    <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-400">
                        <Plus size={20} />
                    </div>
                </div>
                 <div className="mt-6 pt-4 border-t border-zinc-200/50">
                    <button className="text-sm text-zinc-500 font-medium hover:text-zinc-900 underline transition-colors">
                        Sugerir ou registrar interesse
                    </button>
                 </div>
            </div>

        </div>
        
        {/* Help Footer */}
        <div className="flex items-center justify-center gap-2 text-zinc-400 text-xs">
            <HelpCircle size={14} />
            <p>Precisa configurar a API manualmente? Contate o suporte técnico.</p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsView;
