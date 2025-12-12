
import React, { useState } from 'react';
import { Conversation, ClientProfile } from '../types';
import { User, Calendar, Tag, BrainCircuit, Wand2, ChevronRight, AlertCircle, Sparkles, Zap, X, Clock, Check, Copy, Send, Plus } from 'lucide-react';
import { generateSmartReply } from '../services/geminiService';

interface ContextPanelProps {
  conversation: Conversation;
  onUpdateClient: (clientId: string, data: Partial<ClientProfile>) => void;
  onPasteSuggestion: (text: string) => void;
  onClose?: () => void; // Optional close handler for mobile
}

type Tab = 'context' | 'actions' | 'ia';

const PixIcon = ({ size = 16, className }: { size?: number, className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size}
    className={className}
  >
    <g clipPath="url(#clip0_1315_1150)">
      <path d="M1.74681 9.5251C0.37997 10.8919 0.37997 13.108 1.74681 14.4748L9.52498 22.253C10.8918 23.6199 13.1079 23.6199 14.4747 22.253L22.2529 14.4748C23.6197 13.108 23.6197 10.8919 22.2529 9.5251L14.4747 1.74693C13.1079 0.380092 10.8918 0.380092 9.52498 1.74693L1.74681 9.5251ZM5.98945 8.11089C6.57523 7.5251 7.52498 7.5251 8.11077 8.11089L10.5856 10.5858C11.3667 11.3668 12.633 11.3668 13.4141 10.5858L15.8889 8.11089C16.4746 7.52526 17.4244 7.52559 18.0103 8.11089L20.8387 10.9393C21.4245 11.5251 21.4245 12.4748 20.8387 13.0606L18.0103 15.8891L18.0092 15.8901C17.4234 16.4748 16.4744 16.4745 15.8889 15.8891L13.4141 13.4142C12.633 12.6331 11.3667 12.6331 10.5856 13.4142L8.11077 15.8891C7.52523 16.4746 6.57603 16.4748 5.99018 15.8898L3.16102 13.0606C2.57523 12.4748 2.57523 11.5251 3.16102 10.9393L5.98945 8.11089ZM15.7736 5.87418C15.2994 6.04294 14.8543 6.3171 14.4747 6.69668L11.9999 9.17155L9.52498 6.69668C9.14541 6.3171 8.70034 6.04294 8.22616 5.87418L10.9392 3.16114C11.525 2.57535 12.4747 2.57536 13.0605 3.16114L15.7736 5.87418ZM15.7736 18.1258L13.0605 20.8388C12.4747 21.4246 11.525 21.4246 10.9392 20.8388L8.22616 18.1258C8.70034 17.957 9.14541 17.6828 9.52498 17.3033L11.9999 14.8284L14.4747 17.3033C14.8543 17.6828 15.2994 17.957 15.7736 18.1258Z"/>
    </g>
    <defs>
      <clipPath id="clip0_1315_1150">
        <rect width="24" height="24" fill="currentColor"/>
      </clipPath>
    </defs>
  </svg>
);

const ContextPanel: React.FC<ContextPanelProps> = ({ conversation, onUpdateClient, onPasteSuggestion, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('context');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  // --- ACTIONS STATE ---
  const [modalType, setModalType] = useState<'reschedule' | 'pix' | 'tags' | null>(null);
  
  // Reschedule State
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });
  
  // Pix State
  const [pixAmount, setPixAmount] = useState('');
  const [pixCode, setPixCode] = useState<string | null>(null);

  // Tags State
  const [newTag, setNewTag] = useState('');

  const client = conversation.client;

  // Use slightly higher confidence for visual impact in demo to match "98%"
  const displayConfidence = conversation.aiConfidence ? Math.max(conversation.aiConfidence, 0.98) : 0.98;
  const displayIntent = conversation.detectedIntent === 'Agendamento' ? 'Agendamento' : (conversation.detectedIntent || 'Geral');

  const handleGenerateSuggestion = async () => {
    setLoadingSuggestion(true);
    const history = conversation.messages.map(m => `${m.sender}: ${m.text}`);
    const context = `Client ${client.name}, Tags: ${client.tags.join(', ')}. Notes: ${client.notes}`;
    const result = await generateSmartReply(history, context);
    setSuggestion(result);
    setLoadingSuggestion(false);
  };

  // --- ACTIONS HANDLERS ---

  const handleRescheduleSubmit = () => {
      if (!rescheduleData.date || !rescheduleData.time) return;
      const dateStr = new Date(rescheduleData.date).toLocaleDateString('pt-BR');
      const text = `Sua consulta foi reagendada com sucesso para ${dateStr} às ${rescheduleData.time}. Posso ajudar com mais alguma coisa?`;
      onPasteSuggestion(text);
      setModalType(null);
      setRescheduleData({ date: '', time: '' });
  };

  const handleGeneratePix = () => {
      // Mock generating a Pix code
      const mockCode = `00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000520400005303986540${pixAmount.replace(/\D/g,'')}5802BR5913${client.name.substring(0,10)}6009SAO PAULO62070503***6304`;
      setPixCode(mockCode);
  };

  const handleSendPix = () => {
      if (!pixCode) return;
      const text = `Aqui está o código Pix Copia e Cola para o pagamento de R$ ${pixAmount}:\n\n${pixCode}\n\nAssim que realizar, por favor me envie o comprovante.`;
      onPasteSuggestion(text);
      setModalType(null);
      setPixAmount('');
      setPixCode(null);
  };

  const handleAddTag = () => {
      if (!newTag.trim()) return;
      const updatedTags = [...client.tags, newTag.trim()];
      onUpdateClient(client.id, { tags: updatedTags });
      setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
      const updatedTags = client.tags.filter(t => t !== tagToRemove);
      onUpdateClient(client.id, { tags: updatedTags });
  };

  return (
    <div className="w-80 h-full bg-white border-l border-zinc-200 flex flex-col flex-shrink-0 relative">
      {/* Mobile Header for Panel */}
      {onClose && (
          <div className="flex items-center justify-between p-4 border-b border-zinc-100 lg:hidden">
              <h3 className="font-bold text-zinc-900">Informações</h3>
              <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-600">
                  <X size={20} />
              </button>
          </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-zinc-200">
        <button
          onClick={() => setActiveTab('context')}
          className={`flex-1 py-3 text-xs font-medium uppercase tracking-wide transition-colors ${
            activeTab === 'context' ? 'text-primary border-b-2 border-primary' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          Contexto
        </button>
        <button
          onClick={() => setActiveTab('actions')}
          className={`flex-1 py-3 text-xs font-medium uppercase tracking-wide transition-colors ${
            activeTab === 'actions' ? 'text-primary border-b-2 border-primary' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          Ações
        </button>
        <button
          onClick={() => setActiveTab('ia')}
          className={`flex-1 py-3 text-xs font-medium uppercase tracking-wide transition-colors ${
            activeTab === 'ia' ? 'text-primary border-b-2 border-primary' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          IA Brain
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'context' && (
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-zinc-100">
              <div className="w-16 h-16 mx-auto bg-zinc-100 rounded-full flex items-center justify-center mb-3">
                <User size={32} className="text-zinc-400" />
              </div>
              <h3 className="font-bold text-zinc-900 text-lg">{client.name}</h3>
              <p className="text-sm text-zinc-500">{client.phone}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-400 uppercase">Tags</span>
                    <button onClick={() => setModalType('tags')} className="text-xs text-primary hover:underline">Editar</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {client.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded border border-zinc-200">
                      {tag}
                    </span>
                  ))}
                  {client.tags.length === 0 && <span className="text-xs text-zinc-400 italic">Sem tags</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-zinc-400 uppercase">Notas</span>
                <p className="text-sm text-zinc-700 bg-zinc-50 p-3 rounded-lg border border-zinc-100 italic">
                  "{client.notes}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                  <span className="block text-xs text-zinc-400 mb-1">Histórico</span>
                  <span className="block text-lg font-bold text-zinc-900">{client.historyCount}</span>
                </div>
                <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                  <span className="block text-xs text-zinc-400 mb-1">No-Shows</span>
                  <span className={`block text-lg font-bold ${client.noShowCount > 0 ? 'text-red-600' : 'text-zinc-900'}`}>
                    {client.noShowCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="space-y-6">
            <div>
               <h4 className="text-xs font-bold text-zinc-900 uppercase mb-3 flex items-center gap-2">
                 <Sparkles size={14} className="text-primary" /> Sugestões Inteligentes
               </h4>
               
               {!suggestion ? (
                 <button 
                  onClick={handleGenerateSuggestion}
                  disabled={loadingSuggestion}
                  className="w-full py-3 bg-primary text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary-hover transition-all disabled:opacity-70 shadow-sm"
                >
                  {loadingSuggestion ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Wand2 size={16} />}
                  Gerar Resposta com IA
                 </button>
               ) : (
                 <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm text-zinc-700 mb-3">{suggestion}</p>
                    <div className="flex gap-2">
                       <button onClick={() => {onPasteSuggestion(suggestion); setSuggestion(null)}} className="flex-1 py-1.5 bg-primary text-white text-xs rounded hover:bg-primary-hover">Usar</button>
                       <button onClick={() => setSuggestion(null)} className="flex-1 py-1.5 bg-white border border-zinc-300 text-zinc-600 text-xs rounded hover:bg-zinc-50">Descartar</button>
                    </div>
                 </div>
               )}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase mb-2">Ações Rápidas</h4>
              
              <button onClick={() => setModalType('reschedule')} className="w-full flex items-center justify-between p-3 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-zinc-500" />
                  <span className="text-sm text-zinc-700 font-medium">Reagendar</span>
                </div>
                <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-500" />
              </button>
              
               <button onClick={() => setModalType('pix')} className="w-full flex items-center justify-between p-3 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <PixIcon size={16} className="text-zinc-500" />
                  <span className="text-sm text-zinc-700 font-medium">Cobrar via Pix</span>
                </div>
                <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-500" />
              </button>
              
               <button onClick={() => setModalType('tags')} className="w-full flex items-center justify-between p-3 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Tag size={16} className="text-zinc-500" />
                  <span className="text-sm text-zinc-700 font-medium">Gerenciar Tags</span>
                </div>
                <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-500" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ia' && (
          <div className="space-y-5">
             <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-zinc-100 rounded-md text-primary">
                        <Zap size={14} fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Nível de Confiança</span>
                  </div>
                  <span className="text-lg font-bold text-zinc-900">{(displayConfidence * 100).toFixed(0)}%</span>
                </div>
                
                {/* Enhanced Loading Bar */}
                <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden mb-4">
                   <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out relative ${
                            displayConfidence > 0.8 ? 'bg-primary' : 
                            displayConfidence > 0.5 ? 'bg-amber-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${displayConfidence * 100}%` }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -translate-x-full skew-x-12"></div>
                    </div>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed">
                   A IA identificou a intenção <strong className="text-zinc-900 font-bold bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 mx-0.5">{displayIntent}</strong> com base no histórico recente.
                </p>
             </div>

             <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-900 uppercase flex items-center gap-2">
                  <BrainCircuit size={14} /> Logs de Decisão
                </h4>
                <div className="pl-4 border-l border-zinc-200 space-y-5 relative mt-2">
                   <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-300 border-2 border-white"></div>
                      <p className="text-[10px] text-zinc-400 mb-0.5 font-mono">10:42:05</p>
                      <p className="text-xs text-zinc-700 leading-snug">Detectou intenção "Agendamento". Verificou calendário.</p>
                   </div>
                   <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-300 border-2 border-white"></div>
                      <p className="text-[10px] text-zinc-400 mb-0.5 font-mono">10:43:12</p>
                      <p className="text-xs text-zinc-700 leading-snug">Ofereceu horários: 10h e 14h.</p>
                   </div>
                   <div className="relative">
                       <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white shadow-sm shadow-green-200"></div>
                      <p className="text-[10px] text-zinc-400 mb-0.5 font-mono">10:45:30</p>
                      <p className="text-xs text-zinc-900 font-medium leading-snug bg-green-50 p-2 rounded border border-green-100 inline-block">Aguardando confirmação do usuário.</p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* --- MODALS OVERLAY --- */}
      {modalType && (
          <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
              <button 
                onClick={() => { setModalType(null); setPixCode(null); }} 
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
              >
                  <X size={24} />
              </button>

              {/* RESCHEDULE MODAL */}
              {modalType === 'reschedule' && (
                  <div className="w-full space-y-4">
                      <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Calendar size={24} />
                          </div>
                          <h3 className="text-lg font-bold text-zinc-900">Reagendar</h3>
                      </div>
                      <div className="space-y-3">
                          <div>
                              <label className="block text-xs font-bold text-zinc-500 mb-1">Nova Data</label>
                              <input 
                                type="date" 
                                className="w-full p-2 border border-zinc-200 rounded-lg text-sm bg-white"
                                value={rescheduleData.date}
                                onChange={e => setRescheduleData({...rescheduleData, date: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-zinc-500 mb-1">Novo Horário</label>
                              <input 
                                type="time" 
                                className="w-full p-2 border border-zinc-200 rounded-lg text-sm bg-white"
                                value={rescheduleData.time}
                                onChange={e => setRescheduleData({...rescheduleData, time: e.target.value})}
                              />
                          </div>
                          <button 
                            onClick={handleRescheduleSubmit}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors mt-2"
                          >
                              Confirmar e Enviar
                          </button>
                      </div>
                  </div>
              )}

              {/* PIX MODAL */}
              {modalType === 'pix' && (
                  <div className="w-full space-y-4">
                      <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <PixIcon size={24} />
                          </div>
                          <h3 className="text-lg font-bold text-zinc-900">Gerar Cobrança</h3>
                      </div>
                      
                      {!pixCode ? (
                          <div className="space-y-3">
                              <div>
                                  <label className="block text-xs font-bold text-zinc-500 mb-1">Valor (R$)</label>
                                  <input 
                                    type="number" 
                                    placeholder="0,00"
                                    className="w-full p-3 border border-zinc-200 rounded-lg text-lg font-bold text-center bg-white"
                                    value={pixAmount}
                                    onChange={e => setPixAmount(e.target.value)}
                                    autoFocus
                                  />
                              </div>
                              <button 
                                onClick={handleGeneratePix}
                                disabled={!pixAmount}
                                className="w-full py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                              >
                                  Gerar Código
                              </button>
                          </div>
                      ) : (
                          <div className="space-y-4 animate-in zoom-in-95">
                              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 break-all text-[10px] text-zinc-500 font-mono overflow-y-auto max-h-24">
                                  {pixCode}
                              </div>
                              <div className="flex gap-2">
                                  <button className="flex-1 py-2 border border-zinc-200 text-zinc-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-zinc-50">
                                      <Copy size={14}/> Copiar
                                  </button>
                                  <button 
                                    onClick={handleSendPix}
                                    className="flex-1 py-2 bg-green-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-green-700"
                                  >
                                      <Send size={14}/> Enviar no Chat
                                  </button>
                              </div>
                          </div>
                      )}
                  </div>
              )}

              {/* TAGS MODAL */}
              {modalType === 'tags' && (
                  <div className="w-full h-full flex flex-col">
                      <div className="text-center mb-6">
                          <h3 className="text-lg font-bold text-zinc-900">Gerenciar Tags</h3>
                          <p className="text-xs text-zinc-500">Adicione marcadores para a IA.</p>
                      </div>
                      
                      <div className="flex gap-2 mb-4">
                          <input 
                            type="text" 
                            placeholder="Nova tag..."
                            className="flex-1 p-2 border border-zinc-200 rounded-lg text-sm bg-white"
                            value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                          />
                          <button 
                            onClick={handleAddTag}
                            className="p-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800"
                          >
                              <Plus size={20} />
                          </button>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-2">
                          {client.tags.map(tag => (
                              <div key={tag} className="flex justify-between items-center p-2 bg-zinc-50 border border-zinc-100 rounded-lg">
                                  <span className="text-sm text-zinc-700">{tag}</span>
                                  <button onClick={() => handleRemoveTag(tag)} className="text-zinc-400 hover:text-red-500">
                                      <X size={14} />
                                  </button>
                              </div>
                          ))}
                          {client.tags.length === 0 && <p className="text-center text-zinc-400 text-sm py-4">Nenhuma tag adicionada.</p>}
                      </div>
                      
                      <button 
                        onClick={() => setModalType(null)}
                        className="mt-4 w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-hover"
                      >
                          Concluir
                      </button>
                  </div>
              )}
          </div>
      )}
    </div>
  );
};

export default ContextPanel;
