
import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message, MessageSender, AgentStatus, ConversationStatus } from '../types';
import { Send, Bot, User, MoreVertical, Power, CheckCircle, Clock, ChevronLeft, Info, Trash2, Ban, Download, FileText } from 'lucide-react';

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (text: string, sender: MessageSender) => void;
  onToggleStatus: (status: AgentStatus) => void;
  onCloseChat: () => void;
  onOpenContext: () => void;
  isMobileView?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onSendMessage, onToggleStatus, onCloseChat, onOpenContext, isMobileView }) => {
  const [inputText, setInputText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText, MessageSender.Agent);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- FUNÇÕES DO MENU ---
  
  const handleExportChat = () => {
      // Simula a geração de um arquivo .txt ou .pdf
      const content = conversation.messages.map(m => `[${new Date(m.timestamp).toLocaleString()}] ${m.sender}: ${m.text}`).join('\n');
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-${conversation.client.name}.txt`;
      a.click();
      setIsMenuOpen(false);
  };

  const handleEmailTranscript = () => {
      // Simula envio para o email do admin
      const email = prompt("Digite o e-mail de destino:", "admin@nexus.com");
      if (email) {
          alert(`Transcrição enviada para ${email} com sucesso!`);
      }
      setIsMenuOpen(false);
  };

  const handleClearChat = () => {
      if (window.confirm("Tem certeza? Isso apagará o histórico visual desta conversa para você (o backup permanecerá no servidor).")) {
          // Em um app real, chamaria uma função prop onClearMessages(conversation.id)
          alert("Histórico visual limpo.");
      }
      setIsMenuOpen(false);
  };

  const handleBlockContact = () => {
      if (window.confirm(`Deseja realmente bloquear ${conversation.client.name}? A IA não responderá mais a este número.`)) {
          alert(`Contato ${conversation.client.name} bloqueado.`);
          onToggleStatus(AgentStatus.Paused); // Pausa a IA imediatamente
      }
      setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-full flex-1 bg-zinc-50/50 relative w-full">
      {/* Header */}
      <div className="h-16 px-4 md:px-6 bg-white border-b border-zinc-200 flex items-center justify-between flex-shrink-0 sticky top-0 z-10 shadow-sm md:shadow-none">
        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
          {/* Mobile Back Button */}
          <button onClick={onCloseChat} className="md:hidden p-1 text-zinc-500 -ml-1">
             <ChevronLeft size={24} />
          </button>
          
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
            {conversation.client.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold text-zinc-900 truncate">{conversation.client.name}</h2>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${conversation.agentStatus === AgentStatus.AI ? 'bg-green-500' : 'bg-zinc-400'}`}></span>
              <span className="text-xs text-zinc-500 truncate">
                {conversation.agentStatus === AgentStatus.AI ? 'IA Ativa' : 
                 conversation.agentStatus === AgentStatus.Human ? 'Humano' : 'Pausado'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          {conversation.agentStatus === AgentStatus.AI ? (
            <button
              onClick={() => onToggleStatus(AgentStatus.Human)}
              className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
            >
              <User size={14} /> <span className="hidden md:inline">Assumir</span>
            </button>
          ) : (
             <button
              onClick={() => onToggleStatus(AgentStatus.AI)}
              className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-white hover:bg-primary-hover transition-colors shadow-sm"
            >
              <Bot size={14} /> <span className="hidden md:inline">Ativar IA</span>
            </button>
          )}
          
          {/* Info Button (Mobile Only) to toggle Context Panel */}
          <button 
             onClick={onOpenContext}
             className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 lg:hidden"
          >
             <Info size={18} />
          </button>

          <button 
            className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors hidden md:block"
            title="Marcar como resolvido"
          >
            <CheckCircle size={18} />
          </button>
          
          {/* 3-DOT MENU */}
          <div className="relative hidden md:block">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${isMenuOpen ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
            >
                <MoreVertical size={18} />
            </button>
            
            {/* Dropdown Backdrop to close on click outside */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
            )}

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
                    <button onClick={handleExportChat} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors text-left border-b border-zinc-50">
                        <Download size={16} /> Exportar Chat
                    </button>
                    <button onClick={handleEmailTranscript} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors text-left border-b border-zinc-50">
                        <FileText size={16} /> Enviar Transcrição
                    </button>
                     <button onClick={handleClearChat} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors text-left border-b border-zinc-50">
                        <Trash2 size={16} /> Limpar Conversa
                    </button>
                    <button onClick={handleBlockContact} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                        <Ban size={16} /> Bloquear
                    </button>
                </div>
            )}
          </div>

        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {conversation.messages.map((msg) => {
          const isClient = msg.sender === MessageSender.Client;
          const isAI = msg.sender === MessageSender.AI;
          const isAgent = msg.sender === MessageSender.Agent;

          return (
            <div
              key={msg.id}
              className={`flex w-full ${isClient ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[85%] md:max-w-[70%] flex flex-col ${isClient ? 'items-start' : 'items-end'}`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    isClient
                      ? 'bg-white text-zinc-800 border border-zinc-200 rounded-tl-sm' // Client: Left, White
                      : isAI
                      ? 'bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-tr-sm' // AI: Right, Light Gray
                      : 'bg-primary text-white rounded-tr-sm' // Agent: Right, Purple
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`flex items-center gap-1 mt-1 px-1 ${isClient ? '' : 'flex-row-reverse'}`}>
                  {isAI && <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wide">Assistente Virtual</span>}
                  {isAgent && <span className="text-[10px] uppercase font-bold text-primary tracking-wide">Você</span>}
                  <span className="text-[10px] text-zinc-400 ml-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 md:p-4 bg-white border-t border-zinc-200">
        <div className="relative flex items-end gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={conversation.agentStatus === AgentStatus.AI ? "IA está respondendo..." : "Digite uma mensagem..."}
            rows={1}
            className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none max-h-32 transition-all placeholder:text-zinc-400"
            style={{ minHeight: '46px' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-3 bg-primary text-white rounded-xl hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm h-[46px] w-[46px] flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
