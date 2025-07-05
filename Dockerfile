# --- Etapa 1: Compilación (Builder) ---
# Usamos la imagen completa de Node.js v20 que incluye las herramientas de compilación
FROM node:20 as builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias e instalamos TODO (incl. devDependencies)
COPY package*.json ./
RUN npm install

# Copiamos el resto del código fuente (la carpeta 'src', 'tsconfig.json', etc.)
COPY . .

# Ejecutamos el script de 'build' para compilar el TypeScript a JavaScript en la carpeta 'dist'
RUN npm run build

# --- Etapa 2: Producción (Production) ---
# Usamos una imagen ligera de Node.js v20 para la versión final
FROM node:20-slim

WORKDIR /app

# Copiamos los package files de nuevo
COPY package*.json ./

# Instalamos SOLAMENTE las dependencias de producción para mantener la imagen ligera
RUN npm install --only=production

# Copiamos el código compilado desde la etapa 'builder'
COPY --from=builder /app/dist ./dist

# Exponemos el puerto que usará la aplicación. Google Cloud Run usa el puerto 8080 por defecto.
# Asegúrate que tu app en 'src/index.ts' escuche en process.env.PORT || 8080
EXPOSE 8080

# El comando para iniciar la aplicación. Ejecuta el script "start": "node dist/index.js"
CMD ["npm", "start"]