# Use official Node.js LTS image
FROM node:slim

# Create and set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Set environment variables if needed
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "app.js"]
