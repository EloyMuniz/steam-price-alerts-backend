# steam-price-alerts-backend

This project is an application that monitors game prices on Steam. It sends personalized alerts via email when a game reaches the price set by the user. It's an open-source, non-profit solution aimed at gamers looking for deals.

# Backend Project CNPJ

Este projeto é uma aplicação de monitoramento de preços de jogos na Steam. Ele envia alertas personalizados por email quando um jogo atinge o preço definido pelo usuário. É uma solução open-source, sem fins lucrativos, voltada para gamers que buscam ofertas. Foi desenvolvido com Node.JS, Typescript, Prisma e Express.

## Tecnologias Utilizadas

- **Node.js**
- **Express** - Framework para API REST
- **Prisma ORM** - Para interação com o banco de dados
- **TypeScript** - Tipagem estática para JavaScript
- **tsup** - Para build do projeto

## Configuração do Projeto

### Instalação das Dependências

```bash
# Usando Yarn
yarn install

# Ou usando NPM
npm install
```

### Scripts Disponíveis

- **Gerar Cliente Prisma**:
  ```bash
  npx prisma generate
  ```
- **Executar Migrações**:
  ```bash
  npx prisma migrate deploy
  ```
- **Modo Desenvolvimento**:
  ```bash
  yarn dev
  ```
- **Build do Projeto**:
  ```bash
  yarn build
  ```
- **Iniciar o Servidor**:
  ```bash
  yarn start
  ```

## Estrutura do Projeto

```
backend-project-cnpj/
├── prisma/               # Configurações do Prisma
│   ├── migrations/       # Migrações do banco de dados
│   ├── schema.prisma     # Definição do banco de dados
│
├── src/                  # Código fonte
│   ├── errors/           # Erros customizáveis
│   ├── controllers/      # Controladores das rotas
│   ├── middlewares/      # Middlewares para requisições
│   ├── repositories/     # Repositório de dados
        ├──interfaces/    #Contratos para os repositórios
│   ├── routes/           # Definição das rotas
│   ├── services/         # Regras de negócio
│   ├── utils/            # Funções auxiliares
│   ├── index.ts          # Ponto de entrada da aplicação
│
├── .env                  # Configuração de variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Configuração do projeto e dependências
├── tsconfig.json         # Configuração do TypeScript
├── README.md             # Documentação do projeto
```

## Contribuição

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature-minha-feature`)
3. Commit suas alterações (`git commit -m 'Adicionando minha feature'`)
4. Push para a branch (`git push origin feature-minha-feature`)
5. Abra um Pull Request

---

Este README pode ser melhorado futuramente com mais detalhes sobre endpoints e exemplos de uso da API.
