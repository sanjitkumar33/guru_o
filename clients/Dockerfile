# Stage 1: Install dependencies, including dev dependencies for building
FROM node:22-alpine AS deps


# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package.json ./    
COPY package*.json ./
COPY .env ./

# Install all dependencies (including dev dependencies for build process)
RUN npm install

# Install PM2 globally to manage the Node.js process
RUN npm install -g pm2

# Stage 2: Build the application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy all application files
COPY . .

# Copy node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Build the application
RUN npm run build

# Stage 3: Runner stage
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder /app/build ./build

# Install production dependencies only
COPY package.json ./    
COPY package*.json ./
RUN npm install --production

# Install PM2 globally in the runner stage as well
RUN npm install -g pm2
RUN npm install -g serve

# Expose the application's port
EXPOSE 3000

# Set environment variables
ENV PORT 3000
# ENV HOSTNAME 0.0.0.0
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV LOG_LEVEL=error
ENV REACT_APP_API_URL=https://apipv1.bapaupipaymentgatewayapi.com/api
ENV PUBLIC_URL=https://payuguru.com
# ENV REDIS_LINK=redis://payuguru:S0O0yz2gmR8KBu8FOV3o@127.0.0.1:6379

# Start the application using PM2 in watch mode
# CMD ["pm2-runtime", "dist/index.js", "--watch"]
CMD ["pm2-runtime", "serve -s build", "--watch"]
# CMD ["pm2-runtime", "dist/index.js", ]
# CMD [ "nodemon", "dist/index.js" ]
