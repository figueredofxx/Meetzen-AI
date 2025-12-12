
import React, { useState } from 'react';
import { User as UserIcon, Shield, Briefcase, Plus, MoreVertical, X, Check, Edit2, KeyRound, Trash, Lock } from 'lucide-react';
import { User, UserRole, PlanType } from '../types';

const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: 'João Silva',
        email: 'joao@nexus.com',
        role: 'admin',
        status: 'active',
        permissions: {
            chatHuman: true, monitorAI: true, takeover: true, editAgenda: true, viewReports: true, configAI: true
        }
    },
    {
        id: 'u2',
        name: 'Maria Oliveira',
        email: 'maria@nexus.com',
        role: 'staff',
        status: 'active',
         permissions: {
            chatHuman: true, monitorAI: true, takeover: true, editAgenda: true, viewReports: false, configAI: false
        }
    }
];

interface UsersViewProps {
    userPlan?: PlanType;
    onChangePlan?: () => void;
}

const UsersView: React.FC<UsersViewProps> = ({ userPlan = 'nexus', onChangePlan }) => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUserRole, setNewUserRole] = useState<UserRole>('staff');
    const [activeMenuUserId, setActiveMenuUserId] = useState<string | null>(null);
    
    // Limits
    const userLimit = userPlan === 'starter' ? 2 : userPlan === 'pro' ? 10 : 9999;
    const isLimitReached = users.length >= userLimit;

    // --- ACTIONS ---

    const handleCreateUser = () => {
        if (isLimitReached) {
            alert(`Seu plano ${userPlan === 'starter' ? 'Zen Starter' : 'Zen Pro'} permite no máximo ${userLimit} usuários.`);
            return;
        }
        setIsModalOpen(true);
    };

    const handleEditUser = (userId: string) => {
        setActiveMenuUserId(null);
        alert(`Editando permissões para usuário ${userId}. (Funcionalidade abriria o modal com dados pré-carregados).`);
        setIsModalOpen(true); // Abre modal para simular
    };

    const handleResetPassword = (userId: string) => {
        setActiveMenuUserId(null);
        const user = users.find(u => u.id === userId);
        if (user) {
            alert(`Link de redefinição de senha enviado para ${user.email}.`);
        }
    };

    const handleDeleteUser = (userId: string) => {
        setActiveMenuUserId(null);
        if (window.confirm("Tem certeza que deseja desativar/remover este usuário?")) {
            setUsers(prev => prev.filter(u => u.id !== userId));
        }
    };

    return (
        <div className="relative flex-1 h-full overflow-hidden">
            
            {/* --- CONTENT --- */}
            <div 
                className="flex-1 bg-white p-8 overflow-y-auto relative h-full"
                onClick={() => setActiveMenuUserId(null)}
            >
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 mb-1">Usuários</h1>
                            <p className="text-zinc-500">
                                Gerencie sua equipe. 
                                <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded ${isLimitReached ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {users.length} / {userLimit === 9999 ? '∞' : userLimit} Utilizados
                                </span>
                            </p>
                        </div>
                        
                        {isLimitReached ? (
                            <button 
                                onClick={onChangePlan}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-500 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
                            >
                                <Lock size={16} /> Aumentar Limite
                            </button>
                        ) : (
                            <button 
                                onClick={handleCreateUser}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm"
                            >
                                <Plus size={16} />
                                Criar Usuário
                            </button>
                        )}
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm min-h-[400px]">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-zinc-50 border-b border-zinc-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Nome / E-mail</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Função</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-zinc-50 transition-colors relative">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold text-xs">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-zinc-900">{user.name}</div>
                                                    <div className="text-xs text-zinc-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {user.role === 'admin' && <Shield size={14} className="text-zinc-900" />}
                                                {user.role === 'staff' && <UserIcon size={14} className="text-zinc-500" />}
                                                {user.role === 'professional' && <Briefcase size={14} className="text-blue-600" />}
                                                <span className="text-sm text-zinc-700 capitalize">
                                                    {user.role === 'staff' ? 'Atendente' : user.role === 'professional' ? 'Profissional' : 'Administrador'}
                                                </span>
                                            </div>
                                            {user.specialty && <span className="text-[10px] text-zinc-400 ml-6">{user.specialty}</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                            }`}>
                                                {user.status === 'active' ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <div className="relative inline-block text-left">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveMenuUserId(activeMenuUserId === user.id ? null : user.id);
                                                    }}
                                                    className={`p-1.5 rounded transition-colors ${activeMenuUserId === user.id ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {activeMenuUserId === user.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-zinc-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                                                        <button onClick={() => handleEditUser(user.id)} className="flex w-full items-center gap-2 px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50 text-left border-b border-zinc-50">
                                                            <Edit2 size={14} /> Editar
                                                        </button>
                                                        <button onClick={() => handleResetPassword(user.id)} className="flex w-full items-center gap-2 px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50 text-left border-b border-zinc-50">
                                                            <KeyRound size={14} /> Resetar Senha
                                                        </button>
                                                        <button onClick={() => handleDeleteUser(user.id)} className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 text-left">
                                                            <Trash size={14} /> {user.status === 'active' ? 'Desativar' : 'Ativar'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal de Criação de Usuário */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white">
                                <h2 className="text-lg font-bold text-zinc-900">Novo Usuário</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                {/* Dados Básicos */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Nome Completo</label>
                                        <input type="text" className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Ex: Ana Souza" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">E-mail</label>
                                        <input type="email" className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="email@exemplo.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Senha Inicial</label>
                                        <input type="password" className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" defaultValue="12345678" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-700 mb-1">Função</label>
                                        <select 
                                            value={newUserRole} 
                                            onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                                            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                        >
                                            <option value="staff">Atendente</option>
                                            <option value="professional">Profissional</option>
                                            <option value="admin">Administrador</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Campos Específicos de Profissional */}
                                {newUserRole === 'professional' && (
                                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Briefcase size={16} className="text-blue-600" />
                                            <span className="text-sm font-bold text-blue-800">Dados do Profissional</span>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-blue-800 mb-1">Especialidade</label>
                                            <input type="text" className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Ex: Psicólogo, Dentista..." />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-blue-800 mb-1">Tempo por Sessão (min)</label>
                                                <input type="number" defaultValue="60" className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-blue-800 mb-1">Intervalo (min)</label>
                                                <input type="number" defaultValue="10" className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Permissões */}
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-900 uppercase mb-3">Permissões de Acesso</h3>
                                    <div className="space-y-2">
                                        {[
                                            { label: 'Acesso ao chat humano', checked: true },
                                            { label: 'Acompanhar conversas da IA (monitoramento)', checked: newUserRole !== 'professional' },
                                            { label: 'Reassumir atendimento', checked: newUserRole !== 'professional' },
                                            { label: 'Editar agenda global', checked: newUserRole !== 'professional' },
                                            { label: 'Ver relatórios financeiros', checked: newUserRole === 'admin' },
                                            { label: 'Configurar IA e Comportamento', checked: newUserRole === 'admin' },
                                        ].map((perm, idx) => (
                                            <label key={idx} className="flex items-center gap-3 p-2 border border-zinc-100 rounded hover:bg-zinc-50 cursor-pointer">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${perm.checked ? 'bg-primary border-primary' : 'bg-white border-zinc-300'}`}>
                                                    {perm.checked && <Check size={12} className="text-white" />}
                                                </div>
                                                <span className="text-sm text-zinc-700">{perm.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-zinc-100 flex gap-3 bg-zinc-50">
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2.5 bg-white border border-zinc-300 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
                                >
                                    Salvar Usuário
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersView;
