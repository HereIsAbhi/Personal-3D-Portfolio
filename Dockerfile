# Use official Node.js image for build
FROM node:18 AS build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with retry mechanism and increased timeout
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install --no-fund --no-audit

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
