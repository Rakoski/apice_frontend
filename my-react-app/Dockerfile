# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application source code to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to start a simple web server to serve the React build
CMD ["npm", "start"]
