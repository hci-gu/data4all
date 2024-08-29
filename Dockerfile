# Use the official Node.js 18.17.0 image as the base image
FROM node:18.17.0

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package*.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the Next.js app
RUN pnpm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]