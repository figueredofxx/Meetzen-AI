import React, { useState } from 'react';
import { Conversation, ConversationStatus, AgentStatus } from '../types';
import { Search, Filter, Bot, User, CheckCircle2, MessageSquare, X } from 'lucide-react';

interface ChatListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ conversations, selectedId, onSelect }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'queue' | 'finished'>('all');
  const [search, setSearch] = useState('');

  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.client.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.client.phone.includes(search);
    const matchesFilter = filter === 'all' || 
                          (filter === 'active' && c.status === ConversationStatus.Active) ||
                          (filter === 'queue' && c.status === ConversationStatus.Queue) ||
                          (filter === 'finished' && c.status === ConversationStatus.Finished);
    return matchesSearch && matchesFilter;
  });

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full w-full md:w-80 bg-white border-r border-zinc-200 flex-shrink-0">
      <div className="p-4 border-b border-zinc-100 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow placeholder:text-zinc-400"
          />
          {search && (
            <button 
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
                <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['all', 'active', 'queue', 'finished'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                filter === f
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-primary/50'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'active' ? 'Ativos' : f === 'queue' ? 'Fila' : 'Finalizados'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
            <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`p-4 border-b border-zinc-50 cursor-pointer hover:bg-zinc-50 transition-colors ${
                selectedId === conv.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                }`}
            >
                <div className="flex justify-between items-start mb-1">
                <span className={`font-semibold text-sm ${selectedId === conv.id ? 'text-primary' : 'text-zinc-700'}`}>
                    {conv.client.name}
                </span>
                <span className="text-xs text-zinc-400 font-light">{formatTime(conv.lastMessageAt)}</span>
                </div>
                
                <p className="text-xs text-zinc-500 line-clamp-1 mb-2">
                {conv.messages[conv.messages.length - 1]?.text || 'Nova conversa'}
                </p>

                <div className="flex items-center gap-2">
                {conv.agentStatus === AgentStatus.AI && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px] font-medium border border-zinc-200">
                    <Bot size={10} /> IA Respondendo
                    </div>
                )}
                {conv.status === ConversationStatus.Queue && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-medium border border-amber-100">
                    <User size={10} /> Humano Necessário
                    </div>
                )}
                {conv.status === ConversationStatus.Finished && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">
                    <CheckCircle2 size={10} /> Finalizado
                    </div>
                )}
                {conv.unreadCount > 0 && (
                    <span className="ml-auto w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                    {conv.unreadCount}
                    </span>
                )}
                </div>
            </div>
            ))
        ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4 border border-zinc-100">
                    <MessageSquare size={24} className="text-zinc-300" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1">Nenhuma conversa</h3>
                <p className="text-xs text-zinc-500 max-w-[180px] leading-relaxed">
                    Não encontramos resultados para sua busca ou filtro atual.
                </p>
                {(search || filter !== 'all') && (
                    <button 
                        onClick={() => { setSearch(''); setFilter('all'); }}
                        className="mt-4 px-4 py-2 bg-zinc-100 text-zinc-600 rounded-lg text-xs font-medium hover:bg-zinc-200 transition-colors"
                    >
                        Limpar filtros
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;