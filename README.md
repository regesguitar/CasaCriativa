# Casa Criativa

Aplicação web para compartilhar e descobrir ideias criativas. Construída com Node.js, Express e Nunjucks, usando JavaScript moderno (ES Modules), validação de entrada e layout responsivo.

## 🚀 Recursos

- Compartilhe ideias: título, categoria, descrição, imagem e link
- Layout responsivo (mobile‑first) com melhorias de UX
- JavaScript moderno no frontend (ES6+, módulos, validação de formulário)
- Segurança: Helmet, Rate Limiting e validação com express‑validator
- Logs com Winston e páginas de erro amigáveis
- Banco de dados SQLite com schema inicial

## 🧩 Stack

- Backend: Node.js, Express, Nunjucks, SQLite3, ES Modules
- Segurança e performance: Helmet, express‑rate‑limit, express‑validator, compression
- Frontend: CSS responsivo e JS modular (`/public/scripts.js`)

## 📦 Instalação

1. Clone o repositório
   ```bash
   git clone https://github.com/regesguitar/CasaCriativa.git
   cd CasaCriativa
   ```
2. Instale as dependências
   ```bash
   npm install
   ```
3. Configure variáveis de ambiente (opcional)
   - Crie `.env` (veja chaves abaixo). Exemplo rápido:
     ```env
     PORT=3000
     DATABASE_PATH=./WORKSHOPDEV.db
     ```
4. Inicie o servidor
   ```bash
   npm run dev
   ```
5. Acesse em `http://localhost:3000`

## 🔧 Scripts

- `npm start` – inicia em modo produção
- `npm run dev` – inicia em desenvolvimento com reload (nodemon)
- `npm run setup` – (opcional) rotina de setup do projeto

## 🌍 Variáveis de Ambiente

- `NODE_ENV` – `development` | `production` (padrão: `development`)
- `PORT` – porta do servidor (padrão: `3000`)
- `DATABASE_PATH` – caminho do arquivo SQLite (padrão: `./WORKSHOPDEV.db`)
- `RATE_LIMIT_WINDOW_MS` – janela de rate limit (padrão: `900000`)
- `RATE_LIMIT_MAX_REQUESTS` – requisições por janela (padrão: `100`)

## 📚 Rotas

- `GET /` – Home com últimas ideias
- `GET /ideias` – Listagem completa
- `POST /` – Criação de ideia (com validação)
- `GET /api/ideas` – API JSON com as ideias

## 🗄️ Banco de Dados (SQLite)

Tabela `ideas`:
```sql
CREATE TABLE IF NOT EXISTS ideas(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image TEXT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 💡 Dicas de Uso

- No formulário, “Título”, “Categoria” e “Descrição” são obrigatórios.
- “Imagem” e “Link” são opcionais, mas devem ser URLs válidas se preenchidos.
- O modal abre pelo botão “Nova Ideia” e pode ser fechado por ESC, clique fora ou botão “Voltar”.

## 🤝 Contribuição

1. Crie um branch: `git checkout -b feat/nova-funcionalidade`
2. Commit: `git commit -m "feat: adiciona nova funcionalidade"`
3. Push: `git push origin feat/nova-funcionalidade`
4. Abra um Pull Request

## 📄 Licença

ISC. Veja `LICENSE` (se aplicável).

---

Casa Criativa – software livre para compartilhar boas ideias.
