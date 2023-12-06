//URL DEMONSTRATIVA: https://amazona-frontend-pearl.vercel.app/

# Configuração do Front-End da Aplicação

Esta documentação descreve os passos necessários para configurar e executar o front-end de uma aplicação com base no arquivo `package.json` e no arquivo `.env` fornecidos.

## Requisitos Prévios

Antes de começar, certifique-se de que você possui os seguintes requisitos prévios instalados em seu sistema:

- **Node.js e npm:** Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em seu sistema. Você pode baixá-los em [nodejs.org](https://nodejs.org/).

## Instalação

Siga os passos abaixo para configurar e executar o front-end da aplicação:

1. **Clonar o Repositório:**

   ```bash
   git clone <URL_DO_REPOSITÓRIO>
   ```

2. **Navegar para a Pasta do Front-End:**

   ```bash
   cd frontend
   ```

3. **Instalar Dependências:**

   ```bash
   npm install
   ```

4. **Configurar Variáveis de Ambiente:**

   Crie um arquivo `.env` na raiz do diretório do front-end (se já não existir) e defina as variáveis de ambiente necessárias. No seu caso, o arquivo `.env` já foi fornecido com a seguinte configuração:

   ```plaintext
   REACT_APP_API_URL=http://localhost:3001
   ```

5. **Executar a Aplicação:**

   ```bash
   npm start
   ```

   A aplicação será iniciada e estará disponível em [http://localhost:3000](http://localhost:3000).

## Scripts Personalizados

O arquivo `package.json` inclui alguns scripts personalizados que podem ser úteis durante o desenvolvimento:

- `npm start`: Inicia o servidor de desenvolvimento e abre a aplicação em seu navegador padrão.
- `npm build`: Compila a aplicação para produção.
- `npm test`: Executa testes unitários da aplicação.
- `npm eject`: Ejeta a configuração do Create React App para personalizações avançadas.

## Conclusão

Você configurou e executou com sucesso o front-end da aplicação. Certifique-se de que o back-end da aplicação também esteja em execução e configurado corretamente para que o front-end possa se comunicar com ele. Para quaisquer problemas ou dúvidas adicionais, consulte a documentação da aplicação ou entre em contato com a equipe de desenvolvimento.

---

# Configuração do Back-End da Aplicação

Esta documentação descreve os passos necessários para configurar e executar o back-end de uma aplicação com base no arquivo `.env` e no arquivo `package.json` fornecidos.

## Requisitos Prévios

Antes de começar, certifique-se de que você possui os seguintes requisitos prévios instalados em seu sistema:

- **Node.js e npm:** Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em seu sistema. Você pode baixá-los em [nodejs.org](https://nodejs.org/).

- **MongoDB:** Certifique-se de ter um servidor MongoDB em execução ou configure um serviço MongoDB na nuvem, conforme necessário.

## Configuração do Back-End

Siga os passos abaixo para configurar e executar o back-end da aplicação:

1. **Clonar o Repositório:**

   ```bash
   git clone <URL_DO_REPOSITÓRIO>
   ```

2. **Navegar para a Pasta do Back-End:**

   ```bash
   cd backend
   ```

3. **Instalar Dependências:**

   ```bash
   npm install
   ```

4. **Configurar Variáveis de Ambiente:**

   Crie um arquivo `.env` na raiz do diretório do back-end (se já não existir) e defina as variáveis de ambiente necessárias. No seu caso, o arquivo `.env` já foi fornecido com a seguinte configuração:

5. **Executar o Back-End:**

   - Para ambiente de desenvolvimento com reinicialização automática (usando nodemon):

     ```bash
     npm run dev
     ```

   - Para ambiente de produção:

     ```bash
     npm run start
     ```

   Certifique-se de que o servidor esteja em execução na porta especificada no arquivo `.env`.

## Scripts Personalizados

O arquivo `package.json` inclui alguns scripts personalizados que podem ser úteis durante o desenvolvimento:

- `npm run dev`: Inicia o servidor do back-end em modo de desenvolvimento com reinicialização automática usando o nodemon.
- `npm run start`: Inicia o servidor do back-end em modo de produção.
- `npm test`: Executa testes unitários da aplicação.
- 

## Conclusão

Você configurou e executou com sucesso o back-end da aplicação. Certifique-se de que o front-end da aplicação esteja configurado corretamente para se comunicar com o back-end. Para quaisquer problemas ou dúvidas adicionais, consulte a documentação da aplicação ou entre em contato com a equipe de desenvolvimento.

![image](https://github.com/omanramalho42/shop-frontend/assets/64960771/7f0ea222-c2c1-4bd5-9e81-f5ffa3d3950d)

