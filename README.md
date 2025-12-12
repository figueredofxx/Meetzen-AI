
# 🧘 Meet Zen AI - Documentação Técnica Oficial

**Versão do Sistema:** 2.1.0 (Flexible SaaS Release)
**Status:** Produção
**Data da Revisão:** Outubro 2025

---

## 1. Visão Geral do Produto

O **Meet Zen AI** é uma plataforma SaaS (Software as a Service) "White-label Ready" desenvolvida para clínicas, consultórios e escritórios de alta demanda. O sistema atua como uma **Secretária Virtual Autônoma**, capaz de gerenciar agendas, qualificar leads, receber pagamentos via Pix e realizar atendimento humanizado 24/7.

### 1.1 Diferenciais Competitivos
*   **Hibridez Nativa:** O sistema permite alternância fluida entre "Modo IA Autônomo" e "Intervenção Humana".
*   **Inteligência Contextual:** Utiliza o Google Gemini 2.5 para entender contexto, histórico e sentimento, fugindo de árvores de decisão rígidas.
*   **Ecossistema Integrado:** Une Chat, Agenda e CRM em uma única tela, eliminando a necessidade de múltiplas abas.

---

## 2. Arquitetura Técnica

A aplicação é uma SPA (Single Page Application) construída sobre princípios de **Clean Architecture** no Frontend, priorizando performance e manutenibilidade.

### 2.1 Stack Tecnológica
*   **Core Framework:** React 18 (Functional Components, Hooks).
*   **Linguagem:** TypeScript (Tipagem estrita para `Conversation`, `Client`, `Lead`, etc).
*   **Estilização & UI:** Tailwind CSS (Utility-first, Design System customizado "Zen UI").
*   **AI Engine:** Google GenAI SDK (`@google/genai`).
*   **Infraestrutura WhatsApp:** Evolution API v1 (Dockerized).

### 2.2 Estrutura de Diretórios
```bash
/
├── components/             # Blocos de construção da UI
├── services/               # Camada de Serviços e Integração Externa
├── types.ts                # Definições de Interfaces TypeScript
├── constants.ts            # Mock Data
├── docker-compose.yml      # Orquestração da Evolution API
├── .env.example            # Configuração de Ambiente
└── App.tsx                 # Roteador Principal
```

---

## 3. 🚀 Instalação da Infraestrutura WhatsApp (Evolution API)

Para que o sistema envie e receba mensagens reais, é necessário subir a Evolution API. Já deixamos tudo configurado no `docker-compose.yml`.

### 3.1 Pré-requisitos Servidor
*   Docker & Docker Compose instalados.
*   Portas 8080 (API), 27017 (Mongo) e 6379 (Redis) livres.

### 3.2 Passo a Passo de Deploy

1.  **Configurar Variáveis:**
    Renomeie o arquivo `.env.example` para `.env` e defina sua chave de segurança:
    ```bash
    cp .env.example .env
    # Edite o AUTHENTICATION_API_KEY para algo seguro
    ```

2.  **Subir os Containers:**
    Na raiz do projeto, execute:
    ```bash
    docker-compose up -d
    ```

3.  **Configuração Simplificada:**
    Acesse a aba **Integrações** no painel Admin e adicione novas instâncias com 1 clique (para planos Infinity). O sistema gerencia a conexão com a Evolution API automaticamente.

---

## 4. Detalhamento dos Módulos

### 4.1 Módulo de Atendimento (`ChatWindow` + `ContextPanel`)
O núcleo operacional do sistema.
*   **Ações Rápidas (ContextPanel):** Reagendar, Pix, Tags.
*   **Sugestões Inteligentes (Smart Reply):** Sugestões via Gemini Flash.

### 4.2 Módulo de Agenda (`AgendaView`)
*   **Status Flow:** Confirmação e Check-in visual.
*   **Horários Flexíveis:** Controle granular de turnos por dia da semana (ex: Seg 09-12h e 14-18h, Sab 09-12h) com múltiplos intervalos.
*   **Sincronização:** Google Calendar (Simulado no Frontend, Integrável via n8n/Backend).

### 4.3 Módulo CRM & Vendas (`CRMView`)
*   **Kanban Drag-and-Drop:** Gestão visual de leads.
*   **Feature Gating:** Bloqueio visual para planos Starter.

---

## 5. Implementação de IA (Google Gemini)

A lógica de IA reside em `services/geminiService.ts`. O sistema utiliza Few-Shot Prompting injetado dinamicamente baseado no Template escolhido.

---

## 6. Painel SaaS (Super Admin)

O sistema possui um modo **Super Admin** oculto para gestão da própria plataforma SaaS (Multi-tenant).

*   **Dashboard Financeiro:** Acompanhamento de MRR (Monthly Recurring Revenue) e crescimento.
*   **Gestão de Tenants:** Criação, bloqueio e monitoramento de clientes (clínicas).
*   **Infraestrutura:** Configuração global da URL da Evolution API e chaves mestras.

Para acessar em modo demo, clique no ícone de *Escudo* no canto inferior esquerdo da tela.

---

*Documentação mantida pela Equipe de Engenharia Meet Zen AI.*
