# Impact Hub UFSCar

Plataforma web full-stack do Impact Hub UFSCar para gerenciamento de recursos educacionais.

## Stack

| Camada     | Tecnologia                      |
|------------|---------------------------------|
| Backend    | Node.js + Express               |
| Banco      | SQLite (via better-sqlite3)     |
| Auth       | JWT + bcrypt                    |
| Frontend   | HTML / CSS / JavaScript vanilla |

---

## Estrutura do projeto

```
impactufscar-hub/
├── backend/
│   ├── src/
│   │   ├── index.js          # Ponto de entrada Express
│   │   ├── db.js             # Inicialização do SQLite
│   │   ├── seed.js           # Seed: admin + recursos de exemplo
│   │   ├── middleware/
│   │   │   └── auth.js       # Middleware JWT
│   │   └── routes/
│   │       ├── auth.js       # POST /api/auth/login
│   │       └── resources.js  # CRUD /api/resources
│   ├── data/                 # Criado automaticamente (hub.db)
│   ├── .env                  # Variáveis locais (não commitado)
│   └── package.json
├── frontend/
│   ├── index.html            # Página pública de recursos
│   ├── admin.html            # Painel admin
│   ├── css/styles.css
│   └── js/
│       ├── app.js            # Lógica da página pública
│       └── admin.js          # Lógica do painel admin
├── public/
│   └── logo.png              # Logo da organização
├── .env.example              # Template de variáveis de ambiente
├── .gitignore
└── README.md
```

---

## Pré-requisitos

- **Node.js 18+** (recomendado 20+)
- **npm**

---

## Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/AdreXavier/impactufscar-hub.git
cd impactufscar-hub
```

### 2. Instale as dependências do backend

```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp ../.env.example .env
```

Edite o arquivo `.env` (especialmente `JWT_SECRET`) antes de usar em produção.

### 4. Crie o banco de dados e o usuário admin

```bash
npm run seed
```

Isso vai criar o arquivo `backend/data/hub.db` com:
- Um usuário admin (e-mail e senha definidos no `.env`)
- 5 recursos de exemplo

> ⚠️ **Troque a senha padrão** em produção! Edite `ADMIN_EMAIL` e `ADMIN_PASSWORD` no `.env` antes de rodar o seed.

### 5. Inicie o servidor

```bash
# Desenvolvimento (reinicia automaticamente ao editar arquivos)
npm run dev

# Produção
npm start
```

O servidor estará disponível em:

- 🌐 Site público: [http://localhost:3000](http://localhost:3000)
- 🔐 Painel admin: [http://localhost:3000/admin.html](http://localhost:3000/admin.html)
- 📡 API: [http://localhost:3000/api](http://localhost:3000/api)

---

## Credenciais padrão

| Campo  | Valor padrão              |
|--------|---------------------------|
| E-mail | `admin@impactufscar.com`  |
| Senha  | `impact2026!`             |

> As credenciais são definidas no `.env` antes de rodar o seed.

---

## API Endpoints

| Método   | Rota                     | Auth  | Descrição                    |
|----------|--------------------------|-------|------------------------------|
| `POST`   | `/api/auth/login`        | —     | Login; retorna JWT           |
| `GET`    | `/api/resources`         | —     | Lista todos os recursos      |
| `GET`    | `/api/resources/categories` | —  | Lista categorias distintas   |
| `POST`   | `/api/resources`         | ✅    | Cria um novo recurso         |
| `PUT`    | `/api/resources/:id`     | ✅    | Atualiza um recurso          |
| `DELETE` | `/api/resources/:id`     | ✅    | Remove um recurso            |
| `GET`    | `/api/health`            | —     | Health check                 |

Endpoints protegidos exigem header:
```
Authorization: Bearer <token>
```

---

## Variáveis de ambiente

Veja `.env.example` para todas as variáveis disponíveis:

| Variável         | Padrão                           | Descrição                            |
|------------------|----------------------------------|--------------------------------------|
| `PORT`           | `3000`                           | Porta do servidor                    |
| `JWT_SECRET`     | *(obrigatório)*                  | Segredo para assinar JWTs            |
| `JWT_EXPIRES_IN` | `8h`                             | Validade do token                    |
| `ADMIN_EMAIL`    | `admin@impactufscar.com`         | E-mail do admin inicial (seed)       |
| `ADMIN_PASSWORD` | `impact2026!`                    | Senha do admin inicial (seed)        |
| `DB_PATH`        | `./data/hub.db`                  | Caminho para o arquivo SQLite        |
| `CORS_ORIGIN`    | `*`                              | Origin permitida (restringir em prod)|

---

## Desenvolvimento

```bash
cd backend

# Reiniciar seed (apaga o banco e recria)
rm -f data/hub.db && npm run seed

# Modo watch (Node.js 18+)
npm run dev
```

---

## Licença

MIT — veja [LICENSE](LICENSE)
