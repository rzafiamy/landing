# Use latest Node with latest npm
FROM node:current-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package files to install deps first
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy entire app directory content into the container
COPY app/ .

# Default command is the dev server (can override in compose)
CMD ["npm", "run", "dev"]
