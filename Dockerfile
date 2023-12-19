# Stage 1: Install dependencies
FROM node:lts-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Create the final image
FROM node:lts-alpine
WORKDIR /app
COPY . .
CMD ["npm", "start"]
