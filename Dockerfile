# Build Project
FROM node:16.13.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Deploy Project
FROM nginx:alpine
COPY --from=node /app/dist/angular-demo /usr/share/nginx/html

EXPOSE 80
