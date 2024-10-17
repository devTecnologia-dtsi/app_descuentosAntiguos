FROM node:23-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ng build
# Servir la app con Nginx
FROM nginx:1.27.2-alpine
COPY --from=build /app/dist/descuentos /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]