
import React from 'react';
import { Calendar, Settings, BarChart3, Sparkles, LogOut, Link, Building2, Users, Target, Zap, CreditCard, LifeBuoy, Lock, Crown, ShieldAlert } from 'lucide-react';
import { AppView, PlanType, UserRole } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  userPlan: PlanType;
  userRole: UserRole; // Need role to show SaaS Admin
  onTogglePlan: () => void;
  onLogout: () => void;
}

const WhatsAppIcon = ({ size = 18, className }: { size?: number, className?: string }) => (
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

const GeminiIcon = ({ size = 18, className }: { size?: number, className?: string }) => (
    <svg fill="currentColor" fillRule="evenodd" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} style={{flex:'none', lineHeight:1}}>
        <title>Gemini</title>
        <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"></path>
    </svg>
);

export const LogoMeetZen = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21H3.00463C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3M20.1213 3.87868C21.2929 5.05025 21.2929 6.94975 20.1213 8.12132C18.9497 9.29289 17.0503 9.29289 15.8787 8.12132C14.7071 6.94975 14.7071 5.05025 15.8787 3.87868C17.0503 2.70711 18.9497 2.70711 20.1213 3.87868Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, userPlan, userRole, onTogglePlan, onLogout }) => {
  const isStarter = userPlan === 'starter';
  const isInfinity = userPlan === 'infinity';
  const isSuperAdmin = userRole === 'super_admin';

  const menuItems = [
    { id: AppView.Conversations, icon: WhatsAppIcon, label: 'Conversas', colorClass: 'text-green-600', activeBg: 'bg-green-50 text-green-700', locked: false },
    { id: AppView.Agenda, icon: Calendar, label: 'Agenda', colorClass: 'text-blue-600', activeBg: 'bg-blue-50 text-blue-700', locked: false },
    { id: AppView.CRM, icon: Target, label: 'CRM & Vendas', colorClass: 'text-orange-500', activeBg: 'bg-orange-50 text-orange-700', locked: isStarter },
    { id: AppView.Integrations, icon: Link, label: 'Integrações', colorClass: 'text-cyan-600', activeBg: 'bg-cyan-50 text-cyan-700', locked: false },
    { id: AppView.Automation, icon: GeminiIcon, label: 'IA & Automação', colorClass: 'text-violet-600', activeBg: 'bg-violet-50 text-violet-700', locked: false },
    { id: AppView.Reports, icon: BarChart3, label: 'Relatórios', colorClass: 'text-emerald-600', activeBg: 'bg-emerald-50 text-emerald-700', locked: isStarter },
    { id: AppView.Users, icon: Users, label: 'Usuários', colorClass: 'text-indigo-600', activeBg: 'bg-indigo-50 text-indigo-700', locked: isStarter },
    { id: AppView.Company, icon: Building2, label: 'Dados da Empresa', colorClass: 'text-zinc-600', activeBg: 'bg-zinc-100 text-zinc-900', locked: false },
    { id: AppView.Settings, icon: CreditCard, label: 'Assinatura', colorClass: 'text-yellow-600', activeBg: 'bg-yellow-50 text-yellow-700', locked: false },
    { id: AppView.Help, icon: LifeBuoy, label: 'Ajuda & Suporte', colorClass: 'text-pink-600', activeBg: 'bg-pink-50 text-pink-700', locked: false },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-zinc-200 flex flex-col justify-between flex-shrink-0">
      <div className="flex flex-col h-full">
        <div className="p-6 flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <LogoMeetZen size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-900">Meet Zen AI</span>
        </div>

        <nav className="px-3 space-y-1 flex-1 overflow-y-auto">
          {/* Super Admin Section */}
          {isSuperAdmin && (
              <div className="mb-4 pb-4 border-b border-zinc-100">
                  <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-2">Administração</p>
                  <button
                    onClick={() => onChangeView(AppView.SaaSAdmin)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                        currentView === AppView.SaaSAdmin
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:bg-zinc-100'
                    }`}
                    >
                    <ShieldAlert size={18} />
                    <span>Painel SaaS</span>
                  </button>
              </div>
          )}

          <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-2 mt-2">Operação</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${
                currentView === item.id
                  ? item.activeBg
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
              }`}
            >
              <item.icon 
                size={18} 
                strokeWidth={2} 
                className={`${currentView === item.id ? '' : 'text-zinc-400 group-hover:text-zinc-600'} ${currentView === item.id ? 'currentColor' : ''}`}
                style={{ color: currentView === item.id ? undefined : undefined }} // Reset inline style
              />
              <span className={currentView === item.id ? '' : ''}>{item.label}</span>
              
              {/* Lock Icon */}
              {item.locked && (
                  <div className="ml-auto flex items-center gap-1">
                      <Lock size={12} className="text-zinc-400" />
                  </div>
              )}
              
              {!item.locked && currentView === item.id && (
                  <span className={`ml-auto w-1.5 h-1.5 rounded-full ${item.colorClass.replace('text-', 'bg-')}`} />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-zinc-100 bg-white z-10">
         {/* Plan Display / Toggle for Demo */}
         <div className="mb-4 px-2 cursor-pointer group" onClick={onTogglePlan} title="Clique para alternar plano (Demo)">
            <div className={`flex items-center gap-2 px-3 py-2 border rounded-lg w-full justify-center transition-all ${
                isStarter ? 'bg-zinc-50 border-zinc-200' : isInfinity ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-primary/5 border-primary/20'
            }`}>
                {isInfinity ? <Crown size={12} className="text-yellow-400" /> : <Sparkles size={12} className={isStarter ? 'text-zinc-400' : 'text-primary'} />}
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isStarter ? 'text-zinc-500' : isInfinity ? 'text-white' : 'text-primary'}`}>
                    {isStarter ? 'Zen Starter' : isInfinity ? 'Zen Infinity' : 'Zen Pro'}
                </span>
            </div>
            <p className="text-[10px] text-zinc-300 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Demo: Clique p/ mudar</p>
         </div>

        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
            {isSuperAdmin ? 'SA' : 'JD'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-zinc-900 truncate">{isSuperAdmin ? 'Super Admin' : 'John Doe'}</span>
            <span className="text-xs text-zinc-500 truncate">{isSuperAdmin ? 'SaaS Owner' : 'Clinic Admin'}</span>
          </div>
        </div>
         <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors">
            <LogOut size={16} />
            Sair
         </button>
      </div>
    </div>
  );
};

export default Sidebar;
