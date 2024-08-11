# Utiliser une image de base Node.js officielle
FROM node:14

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Installer un serveur HTTP simple pour servir les fichiers construits
RUN npm install -g serve

# Exposer le port de l'application
EXPOSE 3000

# Démarrer le serveur pour servir les fichiers construits
CMD ["serve", "-s", "build"]
