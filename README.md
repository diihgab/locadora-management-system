# Sistema de Gerenciamento de Locadora

Este projeto é um sistema de gerenciamento para uma locadora de filmes, desenvolvido com uma arquitetura moderna de microserviços utilizando Docker, Node.js, Vue.js, e MySQL.

## Características

- Sistema de gerenciamento de filmes (CRUD)
- Interface de usuário responsiva com Vue.js
- API RESTful com Node.js e Express
- Banco de dados MySQL para armazenamento persistente
- Containerização com Docker para fácil implantação e escalabilidade

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, Prisma ORM
- **Frontend**: Vue.js 3, Tailwind CSS
- **Banco de Dados**: MySQL
- **Containerização**: Docker e Docker Compose

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Docker
- Docker Compose
- Node.js (para desenvolvimento local)
- npm ou yarn (para desenvolvimento local)

## Configuração

1. Clone o repositório:
   ```
   git clone https://github.com/diihgab/locadora-management-system.git
   cd locadora-management-system
   ```

2. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:
   ```
   DATABASE_URL=mysql://root:rootpassword@db:3306/locadora
   ```

3. Construa e inicie os containers Docker:
   ```
   docker-compose up --build
   ```

## Uso

Após a inicialização dos containers, você pode acessar:

- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3000`

## Desenvolvimento

Para desenvolvimento local:

1. Navegue até a pasta `backend` e execute:
   ```
   npm install
   npm run dev
   ```

2. Em outro terminal, navegue até a pasta `frontend` e execute:
   ```
   npm install
   npm run serve
   ```

## Estrutura do Projeto

```
locadora-management-system/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Contribuindo

Contribuições são bem-vindas! Por favor, sinta-se à vontade para submeter um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.