
import React, { useState } from 'react';
import { CalendarEvent, ToastType, PlanType } from '../types';
import { MOCK_EVENTS } from '../constants';
import { ChevronLeft, ChevronRight, Clock, Plus, UserCheck, DollarSign, PlayCircle, MoreHorizontal, Edit, XCircle, FileText, Ban, X, Calendar, User, Check, QrCode } from 'lucide-react';

interface AgendaViewProps {
    showToast?: (title: string, type: ToastType, message?: string) => void;
    userPlan?: PlanType;
}

const AgendaView: React.FC<AgendaViewProps> = ({ showToast, userPlan = 'starter' }) => {
  // Simplified static calendar for demo
  const hours = Array.from({ length: 9 }, (_, i) => i + 9); // 9am to 5pm
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const isStarter = userPlan === 'starter';

  // Modal States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null); // State for View Details
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventFormData, setEventFormData] = useState({
      title: '',
      start: '09:00',
      end: '10:00',
      type: 'appointment' as 'appointment' | 'blocked'
  });

  // --- BUSINESS LOGIC ACTIONS ---

  const handleCheckIn = (eventId: string) => {
      setEvents(prev => prev.map(e => {
          if (e.id === eventId) return { ...e, status: 'arrived' };
          return e;
      }));
      if (showToast) showToast('Paciente Chegou', 'success', 'Status atualizado para: Na Recepção');
  };

  const handlePayment = (eventId: string) => {
      if (isStarter) {
          alert("O módulo financeiro e cobrança Pix só está disponível no plano Zen Pro ou superior.");
          return;
      }

      const event = events.find(e => e.id === eventId);
      
      // Basic Pix or Manual logic
      const confirmMessage = `Gerar cobrança ou confirmar pagamento para ${event?.title}?`;

      if (window.confirm(confirmMessage)) {
          setEvents(prev => prev.map(e => {
              if (e.id === eventId) return { ...e, paid: true };
              return e;
          }));
          if (showToast) showToast('Pagamento Recebido', 'success', 'Financeiro atualizado com sucesso.');
      }
  };

  const handleStartAppointment = (eventId: string) => {
      setEvents(prev => prev.map(e => {
          if (e.id === eventId) return { ...e, status: 'in-progress' };
          return e;
      }));
      if (showToast) showToast('Atendimento Iniciado', 'info', 'O cronômetro da consulta foi iniciado.');
  };

  // --- CRUD ACTIONS ---

  const handleOpenNewEvent = () => {
      setEditingEventId(null);
      setEventFormData({ title: '', start: '09:00', end: '10:00', type: 'appointment' });
      setIsEventModalOpen(true);
  };

  const handleSaveEvent = () => {
      if (!eventFormData.title) return;

      const baseDate = "2025-10-25"; // Hardcoded for demo
      const startIso = `${baseDate}T${eventFormData.start}:00`;
      const endIso = `${baseDate}T${eventFormData.end}:00`;

      if (editingEventId) {
          // Edit existing
          setEvents(prev => prev.map(e => e.id === editingEventId ? {
              ...e,
              title: eventFormData.title,
              start: startIso,
              end: endIso,
              type: eventFormData.type,
              clientName: eventFormData.type === 'appointment' ? eventFormData.title : undefined
          } : e));
      } else {
          // Create new
          const newEvent: CalendarEvent = {
              id: Date.now().toString(),
              title: eventFormData.title,
              start: startIso,
              end: endIso,
              type: eventFormData.type,
              status: 'confirmed',
              paid: false,
              clientName: eventFormData.type === 'appointment' ? eventFormData.title : undefined
          };
          setEvents(prev => [...prev, newEvent]);
      }
      setIsEventModalOpen(false);
      if (showToast) showToast(editingEventId ? 'Agendamento Atualizado' : 'Agendamento Criado', 'success');
  };

  const handleEditEvent = (eventId: string) => {
      setActiveMenuId(null);
      setSelectedEvent(null); // Close details if open
      const event = events.find(e => e.id === eventId);
      if (event) {
          setEditingEventId(eventId);
          const startDate = new Date(event.start);
          const endDate = new Date(event.end);
          setEventFormData({
              title: event.title,
              start: startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
              end: endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
              type: event.type
          });
          setIsEventModalOpen(true);
      }
  };

  const handleViewDetails = (eventId: string) => {
      setActiveMenuId(null);
      const event = events.find(e => e.id === eventId);
      if (event) {
          setSelectedEvent(event);
      }
  };

  const handleCancelEvent = (eventId: string) => {
      setActiveMenuId(null);
      setSelectedEvent(null);
      if (window.confirm("Deseja realmente cancelar este agendamento? O horário ficará livre.")) {
           setEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: 'cancelled' as any, type: 'blocked' } : e));
           if (showToast) showToast('Agendamento Cancelado', 'info');
      }
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto" onClick={() => setActiveMenuId(null)}>
      {/* AGENDA SECTION */}
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-2xl font-bold text-zinc-900">Agenda do Dia</h1>
            <p className="text-zinc-500 text-sm">Gerencie o fluxo de atendimento presencial.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-zinc-50 rounded-lg p-1 border border-zinc-200">
             <button className="p-1 hover:bg-white rounded shadow-sm transition-all"><ChevronLeft size={20} className="text-zinc-600"/></button>
             <span className="px-4 text-sm font-medium text-zinc-900">25 Outubro 2025</span>
             <button className="p-1 hover:bg-white rounded shadow-sm transition-all"><ChevronRight size={20} className="text-zinc-600"/></button>
          </div>
          <button 
            onClick={handleOpenNewEvent}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-2 shadow-primary/20"
          >
            <Plus size={16} />
            Novo Agendamento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-full mx-auto">
         {hours.map(hour => {
            const event = events.find(e => new Date(e.start).getHours() === hour && e.status !== 'cancelled');
            
            // Visual Styles based on Status
            const isArrived = event?.status === 'arrived';
            const isInProgress = event?.status === 'in-progress';
            const isCompleted = event?.status === 'completed';
            const isPaid = event?.paid;

            return (
               <div key={hour} className="flex gap-4 group">
                  <div className="w-16 pt-2 text-right text-sm text-zinc-400 font-medium font-mono">
                     {hour}:00
                  </div>
                  <div className={`flex-1 min-h-[5rem] rounded-xl border p-1 relative transition-all ${
                     event 
                        ? event.type === 'blocked' 
                           ? 'bg-zinc-100 border-zinc-200' 
                           : isInProgress 
                                ? 'bg-white border-green-400 ring-1 ring-green-100 shadow-md'
                                : isArrived
                                    ? 'bg-amber-50/30 border-amber-200 shadow-sm'
                                    : 'bg-white border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300'
                        : 'bg-white border-dashed border-zinc-200 hover:bg-zinc-50'
                  }`}>
                     {event ? (
                        <div className="flex justify-between items-center h-full p-2 pl-3 relative">
                           <div className="flex items-center gap-4">
                              <div className={`w-1.5 h-10 rounded-full ${
                                  isInProgress ? 'bg-green-500 animate-pulse' :
                                  isArrived ? 'bg-amber-400' :
                                  isCompleted ? 'bg-zinc-400' :
                                  event.status === 'confirmed' ? 'bg-primary' : 'bg-zinc-300'
                              }`}></div>
                              
                              <div>
                                 <h4 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                                     {event.title}
                                     {isArrived && !isInProgress && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold uppercase">Na Recepção</span>}
                                     {isInProgress && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> Em Atendimento</span>}
                                 </h4>
                                 <div className="flex items-center gap-3 text-xs text-zinc-500 mt-0.5">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(event.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(event.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    {event.type === 'appointment' && <span className="px-1.5 py-0.5 bg-zinc-100 rounded text-zinc-600 border border-zinc-200">Particular</span>}
                                 </div>
                              </div>
                           </div>
                           
                           {event.type !== 'blocked' && !isCompleted && (
                               <div className="flex items-center gap-2 relative">
                                    {/* Receptionist Actions */}
                                    <div className="flex items-center bg-zinc-50 rounded-lg p-1 border border-zinc-100 shadow-sm">
                                        <button 
                                            title="Confirmar Presença (Check-in)"
                                            onClick={() => handleCheckIn(event.id)}
                                            disabled={isArrived || isInProgress}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-all ${
                                                isArrived || isInProgress
                                                    ? 'bg-amber-100 text-amber-700 cursor-default' 
                                                    : 'text-zinc-600 hover:bg-white hover:text-green-700 hover:shadow-sm'
                                            }`}
                                        >
                                            <UserCheck size={14} />
                                            <span className="hidden xl:inline">{isArrived || isInProgress ? 'Chegou' : 'Check-in'}</span>
                                        </button>
                                        
                                        <div className="w-px h-4 bg-zinc-200 mx-1"></div>
                                        
                                        <button 
                                            title={isStarter ? "Finaceiro disponível no Zen Pro" : "Gerar Cobrança Pix via IA"}
                                            onClick={() => !isPaid && handlePayment(event.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-all ${
                                                isStarter ? 'opacity-50 cursor-not-allowed' :
                                                isPaid 
                                                    ? 'bg-green-100 text-green-700 cursor-default' 
                                                    : 'text-zinc-600 hover:bg-white hover:text-blue-700 hover:shadow-sm'
                                            }`}
                                        >
                                            {isPaid ? <Check size={14} /> : !isStarter ? <QrCode size={14} /> : <DollarSign size={14} />}
                                            <span className="hidden xl:inline">{isPaid ? 'Pago' : !isStarter ? 'Cobrar' : 'Pago'}</span>
                                        </button>
                                        
                                        <div className="w-px h-4 bg-zinc-200 mx-1"></div>
                                        
                                        <button 
                                            title="Iniciar Atendimento"
                                            onClick={() => handleStartAppointment(event.id)}
                                            disabled={isInProgress}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-all ${
                                                isInProgress
                                                    ? 'bg-green-600 text-white shadow-sm cursor-default'
                                                    : 'text-zinc-600 hover:bg-primary hover:text-white hover:shadow-sm'
                                            }`}
                                        >
                                            <PlayCircle size={14} />
                                            <span className="hidden xl:inline">{isInProgress ? 'Atendendo' : 'Iniciar'}</span>
                                        </button>
                                    </div>
                                    
                                    <div className="relative">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveMenuId(activeMenuId === event.id ? null : event.id);
                                            }}
                                            className={`p-2 rounded hover:bg-zinc-100 ${activeMenuId === event.id ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-300 hover:text-zinc-600'}`}
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeMenuId === event.id && (
                                            <div 
                                                className="absolute right-0 top-full mt-1 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl z-30 overflow-hidden animate-in zoom-in-95 duration-200"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button onClick={() => handleEditEvent(event.id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-left border-b border-zinc-50">
                                                    <Edit size={14} /> Editar Agendamento
                                                </button>
                                                <button onClick={() => handleViewDetails(event.id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-left border-b border-zinc-50">
                                                    <FileText size={14} /> Ver Detalhes
                                                </button>
                                                <button onClick={() => handleCancelEvent(event.id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 text-left">
                                                    <XCircle size={14} /> Cancelar / No-Show
                                                </button>
                                            </div>
                                        )}
                                    </div>
                               </div>
                           )}
                        </div>
                     ) : (
                        <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                           <button onClick={handleOpenNewEvent} className="text-xs font-medium text-zinc-400 hover:text-zinc-600 flex items-center gap-1"><Plus size={14}/> Agendar Horário</button>
                        </div>
                     )}
                  </div>
               </div>
            )
         })}
      </div>

      {/* NEW/EDIT EVENT MODAL */}
      {isEventModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-zinc-900">{editingEventId ? 'Editar Agendamento' : 'Novo Agendamento'}</h3>
                      <button onClick={() => setIsEventModalOpen(false)}><X size={20} className="text-zinc-400 hover:text-zinc-600"/></button>
                  </div>
                  <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-medium text-zinc-700 mb-1">Título / Cliente</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                            value={eventFormData.title}
                            onChange={(e) => setEventFormData({...eventFormData, title: e.target.value})}
                            autoFocus
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-medium text-zinc-700 mb-1">Início</label>
                              <input 
                                type="time" 
                                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                                value={eventFormData.start}
                                onChange={(e) => setEventFormData({...eventFormData, start: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-medium text-zinc-700 mb-1">Fim</label>
                              <input 
                                type="time" 
                                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                                value={eventFormData.end}
                                onChange={(e) => setEventFormData({...eventFormData, end: e.target.value})}
                              />
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-medium text-zinc-700 mb-1">Tipo</label>
                          <select 
                            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                            value={eventFormData.type}
                            onChange={(e) => setEventFormData({...eventFormData, type: e.target.value as any})}
                          >
                              <option value="appointment">Atendimento</option>
                              <option value="blocked">Bloqueio (Almoço/Folga)</option>
                          </select>
                      </div>
                      <button 
                        onClick={handleSaveEvent}
                        className="w-full py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors"
                      >
                          Salvar
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm animate-in zoom-in-95 overflow-hidden">
                  <div className="p-6 border-b border-zinc-100 flex justify-between items-start bg-zinc-50/50">
                      <div>
                          <h3 className="text-xl font-bold text-zinc-900">{selectedEvent.title}</h3>
                          <div className="flex gap-2 mt-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                selectedEvent.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                                selectedEvent.status === 'arrived' ? 'bg-amber-100 text-amber-700' :
                                selectedEvent.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-zinc-100 text-zinc-600'
                            }`}>
                                {selectedEvent.status === 'confirmed' ? 'Confirmado' : 
                                 selectedEvent.status === 'arrived' ? 'Na Recepção' :
                                 selectedEvent.status === 'in-progress' ? 'Em Atendimento' : 'Pendente'}
                            </span>
                            {selectedEvent.paid && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-700">Pago</span>}
                          </div>
                      </div>
                      <button onClick={() => setSelectedEvent(null)}><X size={20} className="text-zinc-400 hover:text-zinc-600"/></button>
                  </div>
                  
                  <div className="p-6 space-y-5">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                              <Calendar size={20} />
                          </div>
                          <div>
                              <p className="text-xs text-zinc-500 font-medium uppercase">Data</p>
                              <p className="text-sm font-bold text-zinc-900">25 Outubro 2025</p>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-zinc-100 text-zinc-600 flex items-center justify-center">
                              <Clock size={20} />
                          </div>
                          <div>
                              <p className="text-xs text-zinc-500 font-medium uppercase">Horário</p>
                              <p className="text-sm font-bold text-zinc-900">
                                  {new Date(selectedEvent.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(selectedEvent.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </p>
                          </div>
                      </div>

                      {selectedEvent.clientName && (
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                  <User size={20} />
                              </div>
                              <div>
                                  <p className="text-xs text-zinc-500 font-medium uppercase">Cliente</p>
                                  <p className="text-sm font-bold text-zinc-900">{selectedEvent.clientName}</p>
                              </div>
                          </div>
                      )}

                      <div className="pt-4 flex gap-3 border-t border-zinc-100 mt-2">
                          <button 
                            onClick={() => handleEditEvent(selectedEvent.id)} 
                            className="flex-1 py-2.5 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
                          >
                              <Edit size={14} /> Editar
                          </button>
                          <button 
                            onClick={() => handleCancelEvent(selectedEvent.id)}
                            className="flex-1 py-2.5 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                          >
                              <XCircle size={14} /> Cancelar
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AgendaView;
