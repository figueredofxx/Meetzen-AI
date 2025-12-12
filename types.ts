
export enum MessageSender {
  Client = 'client',
  Agent = 'agent',
  AI = 'ai',
  System = 'system'
}

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  isInternal?: boolean; // For logs or thoughts
}

export enum ConversationStatus {
  Active = 'active', // Humano ou IA ativamente respondendo
  Queue = 'queue', // IA pediu ajuda
  Finished = 'finished'
}

export enum AgentStatus {
  AI = 'ai',
  Human = 'human',
  Paused = 'paused'
}

export interface ClientProfile {
  id: string;
  name: string;
  phone: string;
  tags: string[];
  notes: string;
  historyCount: number;
  noShowCount: number;
  joinedDate: string;
  avatar?: string;
}

export interface Conversation {
  id: string;
  client: ClientProfile;
  messages: Message[];
  status: ConversationStatus;
  agentStatus: AgentStatus;
  lastMessageAt: string;
  unreadCount: number;
  priority: 'low' | 'medium' | 'high';
  detectedIntent?: string;
  aiConfidence?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO string
  end: string;
  type: 'appointment' | 'blocked';
  clientName?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'arrived' | 'in-progress' | 'completed';
  paid?: boolean;
}

export interface ChartData {
  name: string;
  value: number;
}

/* CRM SPECIFIC TYPES */
export interface CRMServiceHistory {
  id: string;
  serviceName: string;
  date: string;
  value: number;
  professional: string;
}

export interface CRMLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'leads' | 'negotiation' | 'scheduled' | 'payment' | 'finished';
  value: number; // Valor da oportunidade atual
  totalSpent: number; // LTV
  createdAt: string;
  lastContact: string;
  source: string; // Instagram, Google, Indicação
  serviceInterest: string;
  history: CRMServiceHistory[];
  tags: string[];
  notes?: string;
}

export enum AppView {
  Landing = 'landing',
  SaaSAdmin = 'saas_admin', // NOVO
  Conversations = 'conversations',
  Agenda = 'agenda',
  CRM = 'crm',
  Automation = 'automation',
  Integrations = 'integrations',
  Company = 'company',
  Users = 'users',
  Reports = 'reports',
  Settings = 'settings',
  Help = 'help'
}

export type UserRole = 'super_admin' | 'admin' | 'staff' | 'professional';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  specialty?: string; // Only for professionals
  permissions: {
    chatHuman: boolean;
    monitorAI: boolean;
    takeover: boolean;
    editAgenda: boolean;
    viewReports: boolean;
    configAI: boolean;
  };
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

export type PlanType = 'starter' | 'pro' | 'infinity';
