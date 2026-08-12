# NexerX — CRM SaaS para Freelancers

Um aplicativo full-stack profissional para gerenciar clientes, projetos, tarefas e finanças, construído com Next.js, React, TypeScript e um backend robusto.

## 🎯 Visão Geral

NexerX é um CRM (Customer Relationship Management) moderno, desenvolvido especificamente para freelancers e agências. O projeto é organizado com uma separação clara entre frontend e backend, seguindo as melhores práticas de arquitetura e código profissional.

## 📚 Stack Tecnológico

### Frontend
- **Next.js** - Framework React com SSR/SSG
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Componentes UI de alta qualidade
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **TanStack Query** - Gerenciamento de estado e cache
- **Zustand** - Estado global (quando necessário)
- **date-fns** - Manipulação de datas
- **Lucide React** - Ícones

### Backend
- **Next.js Route Handlers** - APIs REST
- **Better Auth** - Autenticação segura
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Database
- **Zod** - Validação no servidor

## 🚀 Como Começar

### Pré-requisitos
- Node.js (v18+)
- npm, pnpm, yarn ou bun
- PostgreSQL (local ou remoto)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/nexerx.git
   cd nexerx
   ```

2. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```

   Edite `.env` com suas configurações:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/nexerx"
   BETTER_AUTH_SECRET="gere-uma-chave-segura-aqui"
   BETTER_AUTH_URL="http://localhost:3000"
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   # ou
   pnpm install
   ```

4. **Configure o banco de dados:**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura de Pastas

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                # Grupo de rotas de autenticação
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/           # Grupo de rotas do dashboard
│   │   ├── dashboard/
│   │   └── layout.tsx
│   │
│   ├── api/                   # Rotas da API
│   │   └── auth/[...all]/     # Better Auth routes
│   │
│   ├── layout.tsx             # Layout raiz
│   ├── page.tsx               # Página raiz
│   └── globals.css            # Estilos globais
│
├── components/                # Componentes React
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Layout components
│   │   ├── app-shell.tsx
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── mobile-sidebar.tsx
│   └── shared/                # Componentes reutilizáveis
│
├── features/                  # Funcionalidades/módulos
│   └── [future modules]
│
├── hooks/                     # Custom React hooks
│
├── lib/                       # Utilitários e helpers
│   ├── client/               # Utilitários apenas de cliente
│   ├── server/               # Utilitários apenas de servidor
│   ├── auth/                 # Utilitários de autenticação
│   └── utils.ts              # Utilitários gerais
│
├── server/                   # Lógica backend
│   ├── auth/                 # Configuração de autenticação
│   ├── services/             # Serviços de negócio
│   ├── repositories/         # Acesso a dados
│   └── permissions/          # Permissões e autorização
│
├── db/                       # Banco de dados
│   ├── schema/              # Schemas do Drizzle
│   ├── migrations/          # Migrações
│   ├── client.ts            # Instância do database
│   └── index.ts             # Exports
│
├── providers/               # Context providers
│   └── query-provider.tsx
│
└── types/                   # Types e interfaces globais
```

## 🔐 Frontend vs Backend

### Onde colocar cada coisa?

#### ✅ FRONTEND (src/app, src/components, src/features)
- Páginas e layouts
- Componentes React
- Formulários com React Hook Form
- Validação com Zod (cliente)
- Estado visual com Zustand (quando necessário)
- Chamadas à API com TanStack Query
- Interação do usuário

#### ✅ BACKEND (src/server, src/db, src/lib/server, src/lib/auth, src/app/api)
- Autenticação com Better Auth
- Acesso ao banco de dados com Drizzle
- Lógica de negócios
- Permissões e autorização
- Validação com Zod (servidor)
- Funções seguras (Server Actions)
- Rotas da API (Route Handlers)

#### ❌ NÃO coloque no Frontend
- Consultas diretas ao banco
- Secrets e API keys
- Lógica de permissões
- Dados sensíveis

## 🔑 Autenticação

A autenticação é gerenciada pelo **Better Auth**:

1. Rotas de autenticação ficam em `/api/auth/[...all]`
2. Configuração em `src/server/auth/index.ts`
3. Utilitários em `src/lib/auth/`

### Páginas de Autenticação
- `/auth` - Autenticação (login, registro, recuperação de senha)

## 💾 Banco de Dados

### Configuração Drizzle + PostgreSQL

1. Schema em `src/db/schema/`
2. Migrações automáticas em `drizzle/`
3. Comandos úteis:
   ```bash
   npm run db:generate  # Gera migrações
   npm run db:migrate   # Aplica migrações
   npm run db:studio    # Abre Drizzle Studio (GUI)
   ```

### Schema Atual
- **users** - Usuários do sistema
- **accounts** - Contas vinculadas (OAuth)
- **sessions** - Sessões ativas
- **verifications** - Tokens de verificação
- **workspaces** - Espaços de trabalho (multi-tenancy)
- **workspace_members** - Membros de workspace

## 🎨 Componentes UI

Os componentes seguem o padrão **shadcn/ui**:

- `Button` - Botão
- `Input` - Campo de entrada
- `Label` - Rótulo
- `Card` - Container
- `Avatar` - Avatar do usuário
- `Badge` - Badge
- `Separator` - Divisor
- `Sheet` - Drawer/Modal
- `DropdownMenu` - Menu dropdown
- `Tooltip` - Tooltip
- `Skeleton` - Loading state

## 📱 Responsividade

- ✅ Desktop (1280px+)
- ✅ Tablet (768px - 1279px)
- ✅ Mobile (<768px)

No mobile, a sidebar vira um drawer que abre com um botão hamburger.

## 🔧 Comandos Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Faz build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run typecheck    # Verifica tipos com TypeScript

# Database
npm run db:generate  # Gera migrations
npm run db:migrate   # Aplica migrations
npm run db:studio    # Abre Drizzle Studio
```

## 📊 Dashboard

O dashboard inicial inclui:
- Resumo de clientes
- Projetos ativos com progress bar
- Tarefas pendentes
- Receita do período
- Atividade recente

Todos os dados são mockados para demonstração. A arquitetura permite substituir por dados reais sem reescrever a UI.

## 🔮 Próximas Features

Planejadas mas não implementadas ainda:

- [ ] Módulo de Clientes
- [ ] Módulo de Projetos
- [ ] Módulo de Tarefas
- [ ] Módulo de Financeiro
- [ ] Calendário
- [ ] Arquivos e armazenamento (S3/R2)
- [ ] Notificações (Resend)
- [ ] Filas de processamento (Inngest/Trigger.dev)
- [ ] Pagamentos (Stripe/Mercado Pago)
- [ ] Logs e monitoramento (Sentry)
- [ ] Redis para cache
- [ ] Permissões granulares
- [ ] Settings e configurações

## 🚀 Deploy

### Vercel (Recomendado)

1. Push para GitHub
2. Conecte no Vercel
3. Configure variáveis de ambiente
4. Deploy automático

```bash
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
CMD ["npm", "start"]
```

## 📝 Convenções de Código

- **TypeScript strict mode** - Sempre
- **Nomes descritivos** - Nunca `data`, `temp`, `helper`
- **Componentes pequenos** - Max 200 linhas
- **Funções pequenas** - Max 50 linhas
- **Sem magic numbers** - Sempre use constantes
- **Validação clara** - Zod schema na entrada/saída
- **Imports organizados** - Aliases `@/`

## 🔒 Segurança

- ✅ Environment variables protegidas
- ✅ Server-only secrets
- ✅ Validação Zod em servidor e cliente
- ✅ CORS configurado
- ✅ Rate limiting (futura)
- ✅ SQL injection protection (Drizzle)

## 📄 Licença

Privado - Todos os direitos reservados

## 👨‍💻 Desenvolvimento

Para adicionar uma nova feature:

1. Crie a pasta em `src/features/[feature-name]`
2. Organize: `components/`, `hooks/`, `schemas/`, `types/`
3. Implemente backend em `src/server/[feature-name]/`
4. Use TanStack Query para API calls
5. Validate com Zod
6. Teste responsividade

## ❓ FAQ

**P: Posso usar Redux?**
R: Não. Prefira TanStack Query + Zustand quando realmente necessário.

**P: Como criar novas páginas?**
R: `src/app/(dashboard)/[feature]/page.tsx`

**P: Devo usar Server Components?**
R: Sim, quando possível. Use `"use client"` apenas quando necessário.

**P: Como fazer queries ao banco?**
R: Sempre no backend via Route Handlers ou Server Actions, nunca no frontend.

---

**Desenvolvido com ❤️ para freelancers e agências**
