# SplitSmart - App de Divisão de Despesas

Aplicação web para gerenciar e dividir despesas compartilhadas com roommates, parceiros ou amigos.

## 🚀 Tecnologias

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (Autenticação e Banco de Dados)
- **Lucide Icons**

## 📋 Funcionalidades

- ✅ Autenticação completa (Login, Cadastro, Recuperação de senha)
- ✅ Divisão automática de despesas
- ✅ Múltiplos tipos de grupos (Casal, Roommates, Viagem, Time)
- ✅ Categorização de despesas
- ✅ Dashboard com visão geral
- ✅ Gerenciamento de grupos
- ✅ Histórico de despesas

## 🔧 Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

**Como obter as credenciais do Supabase:**

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá em **Settings** → **API**
4. Copie a **URL** e a **anon/public key**
5. Cole no arquivo `.env.local`

### 3. Executar o projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🔐 Fluxo de Autenticação

### Arquivos criados/modificados:

1. **`src/lib/supabase.ts`** - Cliente Supabase e helpers de autenticação
2. **`src/app/auth/page.tsx`** - Página de login/cadastro com abas
3. **`src/middleware.ts`** - Middleware para proteger rotas autenticadas
4. **`src/app/page.tsx`** - Landing page com botões conectados ao fluxo de auth
5. **`src/components/custom/navbar.tsx`** - Navbar com menu de logout

### Como funciona:

1. **Cadastro**: Usuário preenche nome, e-mail, senha e aceita os termos
   - Validações: e-mail válido, senha mínima de 8 caracteres, senhas coincidem
   - Após sucesso, redireciona para `/dashboard`

2. **Login**: Usuário insere e-mail e senha
   - Após sucesso, redireciona para `/dashboard`
   - Link "Esqueci minha senha" envia e-mail de recuperação

3. **Proteção de rotas**: Middleware verifica autenticação
   - Rotas protegidas: `/dashboard`, `/groups`, `/expenses`, `/settings`
   - Se não autenticado, redireciona para `/auth?mode=login`

4. **Logout**: Menu no avatar do usuário (canto superior direito)
   - Clique no avatar → "Sair"
   - Faz signOut no Supabase e redireciona para `/`

### Landing Page:

- **"Começar Agora"** → `/auth?mode=signup`
- **"Criar Conta Grátis"** → `/auth?mode=signup`
- **"Ver Grupos"** → `/groups` (se autenticado) ou `/auth?mode=login` (se não autenticado)

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── auth/
│   │   └── page.tsx          # Página de login/cadastro
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard principal
│   ├── groups/
│   │   └── page.tsx          # Gerenciamento de grupos
│   ├── expenses/
│   │   └── page.tsx          # Criação de despesas
│   ├── settings/
│   │   └── page.tsx          # Configurações
│   ├── layout.tsx            # Layout global
│   └── page.tsx              # Landing page
├── components/
│   └── custom/
│       ├── navbar.tsx        # Barra de navegação
│       ├── group-card.tsx    # Card de grupo
│       └── expense-card.tsx  # Card de despesa
├── lib/
│   ├── supabase.ts           # Cliente Supabase
│   ├── types.ts              # Tipos TypeScript
│   └── constants.ts          # Constantes da aplicação
└── middleware.ts             # Middleware de autenticação
```

## 🎨 Design System

- **Cores principais**: Gradientes roxos/violeta
- **Tipografia**: Geist Sans (padrão Next.js)
- **Componentes**: Cards arredondados, sombras suaves
- **Responsividade**: Mobile-first design

## 📝 Próximos Passos

- [ ] Integração com API de pagamentos PIX
- [ ] OCR para extração de dados de recibos
- [ ] Gráficos e relatórios detalhados
- [ ] Notificações push
- [ ] Modo offline

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Sugestões e melhorias são bem-vindas!

## 📄 Licença

MIT
