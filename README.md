
# NestJS + JWT + Prisma API Template

Template base para construção de APIs, desenvolvido para padronizar meus novos projetos e aplicar conceitos teóricos utilizando o ecossistema NestJS.

## Tecnologias

- **Framework:** NestJS (v11)
- **Banco de Dados:** PostgreSQL (via Docker)
- **ORM:** Prisma (v7) com `@prisma/adapter-pg`
- **Autenticação:** JWT (`@nestjs/jwt` v12) com hash de senhas nativo (`crypto/scrypt`)
- **Linguagem:** TypeScript / Node.js (v24+)

##  Pré-requisitos

- Node.js (v24 ou superior)
- Docker e Docker Compose (usados **apenas** para subir o banco de dados)

##  Instalação e Execução

1. Instale as dependências:
```bash
npm install

```

2. Configure o ambiente:

```bash
cp .env-example .env
# Adicione a URL de conexão do PostgreSQL e o secret do JWT no arquivo .env

```

3. Suba o banco de dados via Docker:

```bash
docker-compose up -d

```

4. Execute as migrations do Prisma:

```bash
npx prisma migrate dev

```

5. Inicie a aplicação:

```bash
npm run start:dev

```

##  Rotas (Endpoints)

### Autenticação (`/auth`)

* `POST /auth/signup` - Cria um novo usuário com senha criptografada.
* `POST /auth/signin` - Realiza o login e retorna o `acess_token` JWT.

### Usuários (`/user`)

* `POST /user` - Criação de usuário (via Módulo User)
* `GET /user` - Lista todos os usuários
* `GET /user/:id` - Busca usuário específico por ID
* `PATCH /user/:id` - Atualiza dados do usuário
* `DELETE /user/:id` - Remove um usuário

## Segurança Aplicada

* Verificação de e-mails duplicados (`ConflictException`).
* Validação de credenciais incorretas (`BadRequestException`).
* Salt de 8 bytes e hash de 32 bytes aplicados nativamente antes da persistência no banco.

```

```
