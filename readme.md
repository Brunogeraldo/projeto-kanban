#Kanban App

Este é um aplicativo Kanban simples construído com React e Node.js (NestJS). O objetivo do projeto é permitir que os usuários gerenciem suas tarefas de forma visual e interativa.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React, Axios, React Beautiful DnD  
- **Backend:** Node.js, NestJS, TypeORM  
- **Banco de Dados:** MySQL

## 📋 Pré-requisitos
Antes de começar, você precisará ter instalado:
- Node.js (versão 14 ou superior)  
- MySQL (ou outro banco de dados suportado pelo TypeORM)

## ⚙️ Configuração do Ambiente

## 1. Clonar o Repositório  
- Clone o repositório do projeto para sua máquina local:
```bash
  git clone https://github.com/Brunogeraldo/projeto-kanban.git
```


## 2. Configurar o Backend e frontend

### 2.1. Navegar até a pasta do backend:
```bash
cd trello-nest-main
```
### 2.2. Instalar Dependências:
```bash
npm install
```

### 2.3. Configurar o Banco de Dados:
Crie um banco de dados no MySQL e atualize as credenciais no arquivo src/app.module.ts:

```typescript
`TypeOrmModule.forRoot({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "SEU_USUARIO",
  password: "SUA_SENHA",
  database: "NOME_DO_BANCO_DE_DADOS",
  entities: [Category, User, Tarefa, Cartao],
  synchronize: true
}),
```

### 2.4. Rodar o Servidor Backend:
Inicie o servidor backend:
```bash
npm run start
```
O servidor estará rodando em: http://localhost:3000.

## 3. Configurar o Frontend
### 3.1. Navegar até a pasta do frontend:

```bash
cd trello-frontend
```
### 3.2. Instalar Dependências:

```bash
npm install
```

### 3.3. Rodar o Servidor Frontend:
Inicie o servidor frontend:

```bash
npm start
```

O aplicativo estará rodando em: http://localhost:3001.

## 🚀 Usando o Aplicativo
Acesse o aplicativo no seu navegador em: http://localhost:3001.
Adicione novas tarefas usando o formulário na parte inferior do Kanban.
As tarefas podem ser filtradas e visualizadas em diferentes colunas: "A Fazer", "Em Progresso" e "Concluído".
Clique em uma tarefa para ver mais detalhes sobre ela.


