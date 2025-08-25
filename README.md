# UMADJUF – Inscrições (Next.js + MongoDB + InfinityPay)

Projeto unificado que integra o **site institucional** com o **sistema oficial de inscrições** (painel admin, cupons, relatórios, exportação) com **branding UMADJUF**.

## 💻 Stack
- Next.js (App Router) + React + Tailwind CSS
- MongoDB (Mongoose)
- InfinityPay (pagamentos)
- JWT + bcrypt (autenticação admin)
- XLSX (exportação CSV/XLSX)

## 🔧 Setup

1. **Instalar dependências**
```bash
npm install
```

2. **Configurar `.env`**
```
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>/<db>
JWT_SECRET=troque-para-um-segredo-forte
INFINITYPAY_TOKEN=seu-token-infinitypay
INFINITYPAY_BASE_URL=https://api.sandbox.infinitypay.com.br

# Para seed do admin
ADMIN_EMAIL=admin@umadjuf.com.br
ADMIN_PASSWORD=admin123
```

3. **Criar admin**
```bash
npm run seed:admin
```

4. **Rodar**
```bash
npm run dev
```

## 🧭 Rotas

- **Públicas**
  - `/` – home
  - `/inscricao` – formulário de inscrição + cupom

- **Admin**
  - `/admin/login` – login
  - `/admin` – dashboard
  - `/admin/cupons` – CRUD cupons
  - `/admin/relatorios` – exporta CSV/XLSX

## 🎨 Branding
- Header com gradiente nas cores UMADJUF (`#e67f42` → `#d1683a`), ícone e tipografia limpa.
- Assets da pasta `public/` (`topoLogo.webp`, `logo.webp`, etc.) já incluídos.

## 🔐 Segurança
- JWT armazenado em cookie `httpOnly` (`admin_token`).
- APIs admin verificam token.
- Crie o admin com `npm run seed:admin` e altere as credenciais no `.env`.

## 🧾 Exportação
- Endpoint: `GET /api/admin/relatorios?format=csv|xlsx`

## 💳 Pagamentos (InfinityPay)
- Arquivo: `src/lib/infinitypay.ts`
- Ajuste o **endpoint** e **payload** conforme sua conta/contrato na InfinityPay (sandbox vs produção).
- O `POST /api/inscricao` cria a inscrição e inicia a criação de pagamento.

---

Feito com 💙 para a UMADJUF.
