# 📦 API Users (Node.js + Express)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

API RESTful completa para gerenciamento de usuários, com sistema de autenticação, criptografia de senhas e integração com banco de dados relacional.

🔗 **Deploy disponível:** [Acesse a API aqui](https://api-users-bice.vercel.app)

---

## 🚀 Sobre o projeto

Este projeto é um exemplo prático de uma arquitetura de backend escalável. Ele utiliza o padrão **MVC** (Model-View-Controller) para organizar a lógica de negócio, rotas e persistência de dados.

### Principais funcionalidades:
* **CRUD de Usuários:** Listar, visualizar, criar, editar e deletar.
* **Segurança:** Hash de senhas com `bcrypt`.
* **Autenticação:** Proteção de rotas via `JWT` (JSON Web Token).
* **Recuperação de Senha:** Fluxo de geração e validação de tokens para troca de senha.

---

## 🛠️ Tecnologias

* **Node.js** & **Express** - Core da aplicação.
* **MySQL** - Banco de dados relacional.
* **Knex.js** - Query Builder para manipulação do banco.
* **BCrypt** - Criptografia de dados sensíveis.
* **JWT** - Tokens de acesso seguro.

---

## 📥 Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/giuseppinhu/api_users.git](https://github.com/giuseppinhu/api_users.git)
   ```
   
2. **Crie um arquivo .env na raiz do projeto e adicione suas credenciais:**
    ```bash
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASS=sua_senha
    DB_NAME=seu_banco_de_dados
    JWT_SECRET=sua_chave_mestra_secreta
    ```

3. **Iniciar o servidor**
    ```bash
    npm run start
    ```
| 💡 A API será executada por padrão em: http://localhost:3000

## 🔐 Autenticação e Segurança

A API utiliza JSON Web Token (JWT) para proteger rotas sensíveis. Para acessar endpoints protegidos (🔒), você deve enviar o token no cabeçalho (Header) da requisição: <br>
    
    ```bash
    Authorization: Bearer SEU_TOKEN_JWT_AQUI
    ```
    
## 📍 Endpoints

👥 Usuários e Autenticação
| Método | Rota           | Descrição                                      | Protegida |
|--------|----------------|-----------------------------------------------|-----------|
| POST   | /login         | Autentica usuário e gera o token de acesso    | 🔓 Não    |
| POST   | /user          | Cadastra um novo usuário no sistema           | 🔓 Não    |
| GET    | /users         | Lista todos os usuários cadastrados           | 🔒 Sim    |
| GET    | /user/:id      | Busca detalhes de um usuário específico       | 🔒 Sim    |
| PUT    | /user/:id      | Atualiza informações de um usuário existente  | 🔒 Sim    |
| DELETE | /users/:id     | Remove um usuário do banco de dados           | 🔒 Sim    |

🔑 Recuperação de Senha
| Método | Rota             | Descrição                                              |
|--------|------------------|--------------------------------------------------------|
| POST   | /recoverpassword | Solicita e gera token de recuperação por e-mail        |
| POST   | /changepassword  | Altera a senha utilizando um token válido              |
| POST   | /userbytoken     | Retorna os dados do usuário vinculado ao token          |

## 📂 Estrutura de Pastas

O projeto está organizado em pastas para manter o backend escalável e limpo:
 
  ```
  ├── controllers/       # Lógica das rotas
  ├── models/            # Definição de dados / estrutura
  ├── routes/            # Endpoints da API
  ├── middleware/        # Middlewares customizados
  ├── database/          # Conexão com banco
  └── index.js           # Entrada principal
  ```
Essa organização facilita manter lógica, rotas e modelos separados, o que melhora a manutenção. 

---
Feito com ❤️ por Giuseppe

    




