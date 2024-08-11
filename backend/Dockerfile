# Utiliser une image de base Node.js officielle
FROM node:14

# Définir le répertoire de travail
WORKDIR /server

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 5000

# Démarrer l'application
CMD ["npm", "start"]
