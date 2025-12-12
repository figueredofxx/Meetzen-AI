import { Conversation, ConversationStatus, AgentStatus, MessageSender, CalendarEvent, ChartData } from './types';

export const MOCK_CLIENTS = [
  {
    id: 'c1',
    name: 'Ana Silva',
    phone: '+55 11 99999-1234',
    tags: ['VIP', 'Recorrente'],
    notes: 'Prefere horários pela manhã.',
    historyCount: 12,
    noShowCount: 0,
    joinedDate: '2024-01-15'
  },
  {
    id: 'c2',
    name: 'Carlos Mendes',
    phone: '+55 11 98888-5678',
    tags: ['Novo'],
    notes: 'Interessado em plano anual.',
    historyCount: 1,
    noShowCount: 0,
    joinedDate: '2025-02-10'
  },
  {
    id: 'c3',
    name: 'Mariana Costa',
    phone: '+55 21 97777-4321',
    tags: ['Risco de Churn'],
    notes: 'Reclamou do preço na última visita.',
    historyCount: 5,
    noShowCount: 2,
    joinedDate: '2023-11-20'
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    client: MOCK_CLIENTS[0],
    status: ConversationStatus.Active,
    agentStatus: AgentStatus.AI,
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: 1,
    priority: 'low',
    detectedIntent: 'Agendamento',
    aiConfidence: 0.95,
    messages: [
      { id: 'm1', sender: MessageSender.Client, text: 'Olá, gostaria de saber os horários disponíveis para amanhã.', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
      { id: 'm2', sender: MessageSender.AI, text: 'Olá Ana! Para amanhã tenho horários às 10h e às 14h. Algum desses funciona para você?', timestamp: new Date(Date.now() - 1000 * 60 * 59).toISOString() },
      { id: 'm3', sender: MessageSender.Client, text: 'O das 10h seria perfeito.', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() }
    ]
  },
  {
    id: 'conv2',
    client: MOCK_CLIENTS[1],
    status: ConversationStatus.Queue,
    agentStatus: AgentStatus.Paused,
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    unreadCount: 0,
    priority: 'high',
    detectedIntent: 'Reclamação',
    aiConfidence: 0.45,
    messages: [
      { id: 'm4', sender: MessageSender.Client, text: 'Tive um problema com a cobrança.', timestamp: new Date(Date.now() - 1000 * 60 * 130).toISOString() },
      { id: 'm5', sender: MessageSender.AI, text: 'Entendo, Carlos. Vou transferir para um especialista analisar.', timestamp: new Date(Date.now() - 1000 * 60 * 129).toISOString() }
    ]
  },
  {
    id: 'conv3',
    client: MOCK_CLIENTS[2],
    status: ConversationStatus.Finished,
    agentStatus: AgentStatus.Human,
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unreadCount: 0,
    priority: 'medium',
    detectedIntent: 'Financeiro',
    aiConfidence: 0.88,
    messages: [
      { id: 'm6', sender: MessageSender.Client, text: 'Já realizei o pagamento.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString() },
      { id: 'm7', sender: MessageSender.Agent, text: 'Obrigado, Mariana! Já confirmamos aqui. Até a próxima.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }
    ]
  }
];

export const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Ana Silva', start: '2025-10-25T10:00:00', end: '2025-10-25T11:00:00', type: 'appointment', clientName: 'Ana Silva', status: 'confirmed' },
  { id: 'e2', title: 'Almoço', start: '2025-10-25T12:00:00', end: '2025-10-25T13:00:00', type: 'blocked', status: 'confirmed' },
  { id: 'e3', title: 'Carlos Mendes', start: '2025-10-25T14:30:00', end: '2025-10-25T15:00:00', type: 'appointment', clientName: 'Carlos Mendes', status: 'pending' },
];

export const STATS_DATA: ChartData[] = [
  { name: 'Seg', value: 12 },
  { name: 'Ter', value: 19 },
  { name: 'Qua', value: 15 },
  { name: 'Qui', value: 22 },
  { name: 'Sex', value: 30 },
  { name: 'Sab', value: 10 },
];

export const INTENT_DATA: ChartData[] = [
  { name: 'Agendamento', value: 45 },
  { name: 'Financeiro', value: 25 },
  { name: 'Dúvidas', value: 20 },
  { name: 'Outros', value: 10 },
];