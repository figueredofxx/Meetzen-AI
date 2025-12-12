
import React, { useState, Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import ContextPanel from './components/ContextPanel';
import LandingPage from './components/LandingPage';
import LoginView from './components/LoginView';
import OnboardingView from './components/OnboardingView';
import SetupWizard from './components/SetupWizard';
import ResetPasswordView from './components/ResetPasswordView';
import PricingPage from './components/PricingPage';
import Toast from './components/Toast';
import { AppView, Conversation, MessageSender, AgentStatus, ToastMessage, ToastType, PlanType, UserRole } from './types';
import { MOCK_CONVERSATIONS } from './constants';
import { Loader2, Menu, Calendar, MessageSquare, ShieldAlert } from 'lucide-react';
import { LogoMeetZen } from './components/Sidebar';

// Lazy load heavy components
const AgendaView = lazy(() => import('./components/AgendaView'));
const CRMView = lazy(() => import('./components/CRMView'));
const ReportsView = lazy(() => import('./components/ReportsView'));
const IAAutomationView = lazy(() => import('./components/IAAutomationView'));
const IntegrationsView = lazy(() => import('./components/IntegrationsView'));
const CompanyView = lazy(() => import('./components/CompanyView'));
const UsersView = lazy(() => import('./components/UsersView'));
const SettingsView = lazy(() => import('./components/SettingsView'));
const HelpView = lazy(() => import('./components/HelpView'));
const SaaSAdminView = lazy(() => import('./components/SaaSAdminView'));

type ScreenState = 'landing' | 'login' | 'onboarding' | 'setup' | 'app' | 'reset-password' | 'pricing';

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

const LoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center bg-zinc-50 h-full">
    <div className="flex flex-col items-center gap-3">
      <Loader2 size={32} className="text-primary animate-spin" />
      <p className="text-sm text-zinc-500 font-medium">Carregando...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('landing');
  const [currentView, setCurrentView] = useState<AppView>(AppView.Conversations);
  const [userPlan, setUserPlan] = useState<PlanType>('starter'); 
  const [userRole, setUserRole] = useState<UserRole>('admin'); // Default role
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Mobile UI States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contextPanelOpen, setContextPanelOpen] = useState(false);

  const showToast = (title: string, type: ToastType = 'success', message?: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSendMessage = (text: string, sender: MessageSender) => {
    if (!selectedConversationId) return;

    const newMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date().toISOString()
    };

    setConversations(prev => prev.map(c => {
      if (c.id === selectedConversationId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessageAt: newMessage.timestamp,
          agentStatus: sender === MessageSender.Agent ? AgentStatus.Human : c.agentStatus
        };
      }
      return c;
    }));

    if (sender === MessageSender.Client && selectedConversation?.agentStatus === AgentStatus.AI) {
      setTimeout(() => {
         const aiMessage = {
            id: (Date.now() + 1).toString(),
            sender: MessageSender.AI,
            text: "Entendi. Vou verificar essa informação para você agora mesmo.",
            timestamp: new Date().toISOString()
         };
         setConversations(prev => prev.map(c => {
            if (c.id === selectedConversationId) {
               return {
                  ...c,
                  messages: [...c.messages, aiMessage],
                  lastMessageAt: aiMessage.timestamp
               };
            }
            return c;
         }));
      }, 2000);
    }
  };

  const handleToggleStatus = (status: AgentStatus) => {
    if (!selectedConversationId) return;
    setConversations(prev => prev.map(c => 
      c.id === selectedConversationId ? { ...c, agentStatus: status } : c
    ));
    showToast(
        status === AgentStatus.AI ? "IA Ativada" : "Modo Humano Ativado",
        "info",
        status === AgentStatus.AI ? "O assistente virtual retomou o controle." : "Você assumiu o controle da conversa."
    );
  };

  const handleUpdateClient = (clientId: string, data: any) => {
     console.log('Update client', clientId, data);
     showToast("Dados atualizados", "success");
  };

  // View Switching Logic
  const handleViewChange = (view: AppView) => {
      setCurrentView(view);
      setSidebarOpen(false); // Close mobile sidebar on nav
      if (view !== AppView.Conversations) {
          setSelectedConversationId(null); 
      }
  };

  // Toggle Plan Logic for Demo
  const togglePlanDemo = () => {
      setUserPlan(prev => {
          if (prev === 'starter') return 'pro';
          if (prev === 'pro') return 'infinity';
          return 'starter';
      });
  };

  // Toggle Role Logic for Demo (Super Admin Mode)
  const toggleAdminRole = () => {
      setUserRole(prev => {
          if (prev === 'admin') {
              showToast("Modo Super Admin Ativado", "success", "Acesso total à infraestrutura concedido.");
              return 'super_admin';
          } else {
              showToast("Modo Clínica Admin", "info", "Visualização do usuário final.");
              // If currently in SaaS Admin view, kick back to dashboard
              if (currentView === AppView.SaaSAdmin) setCurrentView(AppView.Conversations);
              return 'admin';
          }
      });
  };

  const renderMainContent = () => {
    // Basic Role Guard
    if (currentView === AppView.SaaSAdmin && userRole !== 'super_admin') {
        return <div className="p-8 text-center text-red-500">Acesso Negado</div>;
    }

    switch (currentView) {
      case AppView.Conversations:
        return (
          <div className="flex h-full w-full overflow-hidden relative">
            <div className={`${selectedConversationId ? 'hidden md:flex' : 'flex'} w-full md:w-auto h-full`}>
                <ChatList 
                  conversations={conversations} 
                  selectedId={selectedConversationId} 
                  onSelect={(id) => setSelectedConversationId(id)} 
                />
            </div>
            {selectedConversation ? (
              <div className={`${selectedConversationId ? 'flex' : 'hidden md:flex'} flex-1 h-full overflow-hidden relative`}>
                <ChatWindow 
                  conversation={selectedConversation} 
                  onSendMessage={handleSendMessage}
                  onToggleStatus={handleToggleStatus}
                  onCloseChat={() => setSelectedConversationId(null)}
                  onOpenContext={() => setContextPanelOpen(true)}
                  isMobileView={true} 
                />
                <div className="hidden lg:block h-full">
                    <ContextPanel 
                    conversation={selectedConversation}
                    onUpdateClient={handleUpdateClient}
                    onPasteSuggestion={(text) => handleSendMessage(text, MessageSender.Agent)}
                    />
                </div>
                {contextPanelOpen && (
                    <div className="absolute inset-0 z-20 bg-black/20 lg:hidden flex justify-end" onClick={() => setContextPanelOpen(false)}>
                        <div className="w-80 h-full bg-white shadow-2xl animate-in slide-in-from-right" onClick={e => e.stopPropagation()}>
                             <ContextPanel 
                                conversation={selectedConversation}
                                onUpdateClient={handleUpdateClient}
                                onPasteSuggestion={(text) => {
                                    handleSendMessage(text, MessageSender.Agent);
                                    setContextPanelOpen(false);
                                }}
                                onClose={() => setContextPanelOpen(false)}
                            />
                        </div>
                    </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex flex-1 items-center justify-center bg-zinc-50/50 flex-col gap-6 p-8 text-center animate-in fade-in duration-500">
                 <div className="relative">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-zinc-100 z-10 relative">
                        <LogoMeetZen size={48} className="text-primary/80" />
                    </div>
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
                 </div>
                 <div className="max-w-xs space-y-2">
                    <h2 className="text-xl font-bold text-zinc-900">Pronto para atender?</h2>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        Selecione uma conversa à esquerda para visualizar o histórico, interagir com clientes ou monitorar a IA.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-3 mt-4">
                    <button onClick={() => setCurrentView(AppView.Conversations)} className="flex flex-col items-center justify-center p-4 bg-white border border-zinc-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group w-32">
                        <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <WhatsAppIcon size={18} />
                        </div>
                        <span className="text-xs font-medium text-zinc-700">Ver Todos</span>
                    </button>
                    <button onClick={() => setCurrentView(AppView.Agenda)} className="flex flex-col items-center justify-center p-4 bg-white border border-zinc-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group w-32">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <Calendar size={18} />
                        </div>
                        <span className="text-xs font-medium text-zinc-700">Agenda</span>
                    </button>
                 </div>
              </div>
            )}
          </div>
        );
      case AppView.Agenda: return <Suspense fallback={<LoadingFallback />}><AgendaView showToast={showToast} userPlan={userPlan} /></Suspense>;
      case AppView.CRM: return <Suspense fallback={<LoadingFallback />}><CRMView userPlan={userPlan} onChangePlan={() => setUserPlan('pro')} /></Suspense>;
      case AppView.Reports: return <Suspense fallback={<LoadingFallback />}><ReportsView userPlan={userPlan} onChangePlan={() => setUserPlan('pro')} /></Suspense>;
      case AppView.Automation: return <Suspense fallback={<LoadingFallback />}><IAAutomationView userPlan={userPlan} onChangePlan={() => setUserPlan('pro')} /></Suspense>;
      case AppView.Integrations: return <Suspense fallback={<LoadingFallback />}><IntegrationsView showToast={showToast} userPlan={userPlan} onChangePlan={() => setUserPlan('infinity')} /></Suspense>;
      case AppView.Company: return <Suspense fallback={<LoadingFallback />}><CompanyView showToast={showToast} /></Suspense>;
      case AppView.Users: return <Suspense fallback={<LoadingFallback />}><UsersView userPlan={userPlan} onChangePlan={() => setUserPlan('pro')} /></Suspense>;
      case AppView.Settings: return <Suspense fallback={<LoadingFallback />}><SettingsView showToast={showToast} userPlan={userPlan} onChangePlan={(p) => setUserPlan(p)} /></Suspense>;
      case AppView.Help: return <Suspense fallback={<LoadingFallback />}><HelpView /></Suspense>;
      case AppView.SaaSAdmin: return <Suspense fallback={<LoadingFallback />}><SaaSAdminView showToast={showToast} /></Suspense>;
      default: return null;
    }
  };

  if (currentScreen === 'landing') return <LandingPage onEnterApp={() => setCurrentScreen('login')} onGoToPricing={() => setCurrentScreen('pricing')} />;
  
  if (currentScreen === 'pricing') return (
      <PricingPage 
        onBack={() => setCurrentScreen('landing')}
        onEnterApp={() => setCurrentScreen('login')}
      />
  );

  if (currentScreen === 'login') return (
      <>
        <Toast toasts={toasts} removeToast={removeToast} />
        <LoginView 
          onLogin={() => { showToast("Login realizado", "success"); setCurrentScreen('app'); }}
          onGoToOnboarding={() => setCurrentScreen('onboarding')}
          onForgotPassword={() => setCurrentScreen('reset-password')}
          onBack={() => setCurrentScreen('landing')}
          showToast={showToast}
        />
      </>
  );

  if (currentScreen === 'reset-password') return (
      <>
        <Toast toasts={toasts} removeToast={removeToast} />
        <ResetPasswordView 
            onBackToLogin={() => setCurrentScreen('login')}
        />
      </>
  );

  if (currentScreen === 'onboarding') return (
      <>
        <Toast toasts={toasts} removeToast={removeToast} />
        <OnboardingView 
          onFinish={() => { showToast("Conta criada!", "success"); setCurrentScreen('setup'); }}
          onBackToLogin={() => setCurrentScreen('login')}
          showToast={showToast}
        />
      </>
  );

  if (currentScreen === 'setup') return (
      <SetupWizard 
          onFinish={() => { showToast("Tudo pronto! Bem-vindo.", "success", "Sua secretária virtual está online."); setCurrentScreen('app'); }}
      />
  );

  return (
    <div className="flex h-screen w-screen bg-zinc-50 overflow-hidden font-sans relative">
      <Toast toasts={toasts} removeToast={removeToast} />
      
      {/* Super Admin Toggle Button (Demo Only) - Positioned Fixed Bottom Left */}
      <button 
        onClick={toggleAdminRole} 
        className="fixed bottom-4 left-4 z-[100] bg-black/80 hover:bg-black text-white p-2 rounded-full shadow-2xl transition-all"
        title="Alternar Role (Demo)"
      >
        {userRole === 'super_admin' ? <ShieldAlert size={20} className="text-red-500" /> : <ShieldAlert size={20} className="text-zinc-500" />}
      </button>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-zinc-200 z-30 flex items-center px-4 justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-zinc-600">
              <Menu size={24} />
          </button>
          <span className="font-bold text-zinc-900">Meet Zen AI</span>
          <div className="w-8"></div>
      </div>

      {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
      )}

      <div className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
          <Sidebar 
            currentView={currentView} 
            onChangeView={handleViewChange} 
            userPlan={userPlan} 
            userRole={userRole}
            onTogglePlan={togglePlanDemo} 
            onLogout={() => setCurrentScreen('landing')}
          />
      </div>

      <main className="flex-1 flex flex-col overflow-hidden pt-14 md:pt-0">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default App;
