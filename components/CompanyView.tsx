
import React, { useState } from 'react';
import { Building2, Save, Upload, MapPin, Mail, Phone, Briefcase, Clock, Loader2, Check, QrCode, Crown, Lock, Plus, Trash2, Copy, PlusCircle } from 'lucide-react';
import { ToastType } from '../types';

interface CompanyViewProps {
    showToast?: (title: string, type: ToastType, message?: string) => void;
}

type DaySchedule = {
    isOpen: boolean;
    intervals: { start: string; end: string }[];
};

const DAYS_MAP: Record<string, string> = {
    seg: 'Segunda-feira',
    ter: 'Terça-feira',
    qua: 'Quarta-feira',
    qui: 'Quinta-feira',
    sex: 'Sexta-feira',
    sab: 'Sábado',
    dom: 'Domingo'
};

const CompanyView: React.FC<CompanyViewProps> = ({ showToast }) => {
  const [saving, setSaving] = useState(false);
  
  // Mock Plan Check (In real app, pass this as prop)
  const isInfinity = true; 

  // Advanced Schedule State
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({
      seg: { isOpen: true, intervals: [{ start: '09:00', end: '12:00' }, { start: '13:00', end: '18:00' }] },
      ter: { isOpen: true, intervals: [{ start: '09:00', end: '12:00' }, { start: '13:00', end: '18:00' }] },
      qua: { isOpen: true, intervals: [{ start: '09:00', end: '12:00' }, { start: '13:00', end: '18:00' }] },
      qui: { isOpen: true, intervals: [{ start: '09:00', end: '12:00' }, { start: '13:00', end: '18:00' }] },
      sex: { isOpen: true, intervals: [{ start: '09:00', end: '12:00' }, { start: '13:00', end: '17:00' }] },
      sab: { isOpen: false, intervals: [{ start: '09:00', end: '13:00' }] },
      dom: { isOpen: false, intervals: [] },
  });

  const handleSave = () => {
      setSaving(true);
      setTimeout(() => {
          setSaving(false);
          if (showToast) showToast("Dados salvos", "success", "As informações da empresa foram atualizadas.");
      }, 1000);
  };

  // Schedule Handlers
  const toggleDay = (day: string) => {
      setSchedule(prev => ({
          ...prev,
          [day]: { ...prev[day], isOpen: !prev[day].isOpen }
      }));
  };

  const addInterval = (day: string) => {
      setSchedule(prev => ({
          ...prev,
          [day]: { 
              ...prev[day], 
              intervals: [...prev[day].intervals, { start: '12:00', end: '13:00' }] 
          }
      }));
  };

  const removeInterval = (day: string, index: number) => {
      setSchedule(prev => ({
          ...prev,
          [day]: { 
              ...prev[day], 
              intervals: prev[day].intervals.filter((_, i) => i !== index) 
          }
      }));
  };

  const updateInterval = (day: string, index: number, field: 'start' | 'end', value: string) => {
      setSchedule(prev => {
          const newIntervals = [...prev[day].intervals];
          newIntervals[index] = { ...newIntervals[index], [field]: value };
          return {
              ...prev,
              [day]: { ...prev[day], intervals: newIntervals }
          };
      });
  };

  const copyToWeekdays = () => {
      const model = schedule['seg'];
      setSchedule(prev => ({
          ...prev,
          ter: JSON.parse(JSON.stringify(model)),
          qua: JSON.parse(JSON.stringify(model)),
          qui: JSON.parse(JSON.stringify(model)),
          sex: JSON.parse(JSON.stringify(model)),
      }));
      if(showToast) showToast("Horários replicados", "info", "O horário de Segunda foi copiado até Sexta.");
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <div>
                 <h1 className="text-2xl font-bold text-zinc-900 mb-1">Dados da Empresa</h1>
                 <p className="text-zinc-500">Informações utilizadas pelo agente para identificação e contexto.</p>
            </div>
            <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {saving ? <Loader2 size={16} className="animate-spin"/> : <Save size={16} />}
                {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
        </div>

        <div className="space-y-6">
            {/* Whitelabel Section (Infinity Exclusive) */}
            <div className={`p-6 border rounded-xl shadow-sm relative overflow-hidden transition-all ${isInfinity ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200'}`}>
                {!isInfinity && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-zinc-100">
                            <Lock size={14} className="text-zinc-400" />
                            <span className="text-xs font-bold text-zinc-600">Recurso Zen Infinity</span>
                        </div>
                    </div>
                )}
                
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-sm font-bold mb-1 flex items-center gap-2">
                            <Crown size={16} className="text-yellow-400" /> Whitelabel & Marca Própria
                        </h3>
                        <p className={`text-xs ${isInfinity ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Remova a marca "Meet Zen AI" e use a sua identidade visual no chat e rodapé.
                        </p>
                    </div>
                    {isInfinity && (
                        <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 text-[10px] font-bold uppercase rounded border border-yellow-400/20">Ativo</span>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-sm font-medium">Remover "Powered by Meet Zen AI"</span>
                        <div className="w-10 h-6 bg-green-500 rounded-full p-1 cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm translate-x-4"></div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-2 opacity-80">Nome da Marca no Rodapé</label>
                        <input 
                            type="text" 
                            defaultValue="Nexus Clinic Tech" 
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-zinc-500"
                        />
                    </div>
                </div>
            </div>

            {/* Logo e Nome */}
            <div className="p-6 bg-white border border-zinc-200 rounded-xl shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
                    <Building2 size={16} /> Identidade
                </h3>
                <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-24 h-24 bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-100 transition-colors">
                            <Upload size={24} className="text-zinc-400" />
                        </div>
                        <span className="text-xs text-zinc-500">Logotipo</span>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-700 mb-1">Nome do Negócio</label>
                            <input 
                                type="text" 
                                defaultValue="Nexus Clinic" 
                                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-700 mb-1">CNPJ / CPF</label>
                                <input 
                                    type="text" 
                                    defaultValue="12.345.678/0001-90" 
                                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-700 mb-1">Área de Atuação</label>
                                <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                                    <option>Odontologia</option>
                                    <option>Psicologia</option>
                                    <option>Estética</option>
                                    <option>Advocacia</option>
                                    <option>Consultoria</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contato e Endereço */}
            <div className="p-6 bg-white border border-zinc-200 rounded-xl shadow-sm">
                 <h3 className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
                    <MapPin size={16} /> Localização e Contato
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                     <div>
                        <label className="block text-xs font-medium text-zinc-700 mb-1 flex items-center gap-1"><Phone size={12}/> Telefone Principal</label>
                        <input 
                            type="text" 
                            defaultValue="+55 11 99999-0000" 
                            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-700 mb-1 flex items-center gap-1"><Mail size={12}/> E-mail Oficial</label>
                        <input 
                            type="email" 
                            defaultValue="contato@nexus.com" 
                            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                        />
                    </div>
                </div>
                <div>
                     <label className="block text-xs font-medium text-zinc-700 mb-1">Endereço (Opcional)</label>
                     <input 
                        type="text" 
                        placeholder="Rua, Número, Bairro, Cidade - UF"
                        className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                    />
                </div>
            </div>

            {/* Horário Avançado */}
            <div className="p-6 bg-white border border-zinc-200 rounded-xl shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                        <Clock size={16} /> Horário de Funcionamento
                    </h3>
                    <button 
                        onClick={copyToWeekdays}
                        className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                        title="Copia os horários de segunda para terça a sexta"
                    >
                        <Copy size={12} /> Replicar Seg p/ Semana
                    </button>
                 </div>
                <p className="text-xs text-zinc-500 mb-6">
                    Configure os horários de atendimento da IA. Fora destes horários, ela avisará que a clínica está fechada.
                </p>
                
                <div className="space-y-2">
                    {Object.keys(DAYS_MAP).map((key) => (
                        <div key={key} className={`flex flex-col md:flex-row md:items-start gap-4 p-3 rounded-lg border transition-colors ${schedule[key].isOpen ? 'bg-white border-zinc-200' : 'bg-zinc-50 border-zinc-100'}`}>
                            
                            {/* Day Toggle */}
                            <div className="flex items-center gap-3 w-32 pt-2">
                                <button 
                                    onClick={() => toggleDay(key)}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${schedule[key].isOpen ? 'bg-green-500' : 'bg-zinc-300'}`}
                                >
                                    <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-transform ${schedule[key].isOpen ? 'left-6' : 'left-1'}`}></div>
                                </button>
                                <span className={`text-sm font-medium ${schedule[key].isOpen ? 'text-zinc-900' : 'text-zinc-400'}`}>
                                    {DAYS_MAP[key]}
                                </span>
                            </div>

                            {/* Intervals */}
                            <div className="flex-1 space-y-2">
                                {schedule[key].isOpen ? (
                                    <>
                                        {schedule[key].intervals.map((interval, index) => (
                                            <div key={index} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                                                <input 
                                                    type="time" 
                                                    value={interval.start}
                                                    onChange={(e) => updateInterval(key, index, 'start', e.target.value)}
                                                    className="px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded text-sm focus:outline-none focus:border-primary"
                                                />
                                                <span className="text-zinc-400">-</span>
                                                <input 
                                                    type="time" 
                                                    value={interval.end}
                                                    onChange={(e) => updateInterval(key, index, 'end', e.target.value)}
                                                    className="px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded text-sm focus:outline-none focus:border-primary"
                                                />
                                                {schedule[key].intervals.length > 1 && (
                                                    <button onClick={() => removeInterval(key, index)} className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button 
                                            onClick={() => addInterval(key)}
                                            className="text-xs text-primary font-medium hover:text-primary-hover flex items-center gap-1 mt-1"
                                        >
                                            <PlusCircle size={12} /> Adicionar intervalo (almoço/pausa)
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-sm text-zinc-400 italic pt-2 block">Fechado</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dados Financeiros / Pix */}
            <div className="p-6 bg-white border border-zinc-200 rounded-xl shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                        <QrCode size={16} /> Dados Financeiros (Pix)
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200">
                        NECESSÁRIO PARA COBRANÇA
                    </span>
                 </div>
                <p className="text-xs text-zinc-500 mb-4">
                    Configure sua chave Pix para que a IA possa gerar QRCodes de pagamento para sinal ou valor total.
                </p>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <label className="block text-xs font-medium text-zinc-700 mb-1">Tipo de Chave</label>
                            <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                                <option value="cnpj">CNPJ</option>
                                <option value="cpf">CPF</option>
                                <option value="email">E-mail</option>
                                <option value="phone">Celular</option>
                                <option value="random">Chave Aleatória</option>
                            </select>
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-zinc-700 mb-1">Chave Pix</label>
                            <input 
                                type="text" 
                                placeholder="Digite sua chave pix..."
                                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                            />
                        </div>
                    </div>
                    <div>
                         <label className="block text-xs font-medium text-zinc-700 mb-1">Nome do Beneficiário (conforme banco)</label>
                         <input 
                            type="text" 
                            placeholder="Ex: Nexus Clinic LTDA"
                            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                        />
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyView;
