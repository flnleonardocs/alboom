# Use a imagem oficial do node como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do npm
RUN npm install

# Copie todo o código fonte para o diretório de trabalho
COPY . .

# Exponha a porta 3000 para que possamos acessar o aplicativo React
EXPOSE 3000

# Comando para iniciar o aplicativo React
CMD ["npm", "start"]
