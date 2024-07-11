FROM node:alpine as builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire le projet
RUN npm run build

# Utiliser une image plus légère pour l'étape finale
FROM node:alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires à partir de l'étape de construction
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exposer le port
EXPOSE 3011

# Démarrer l'application en utilisant le port spécifié
CMD ["npm", "start"]
