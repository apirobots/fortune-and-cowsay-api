# Use the official Deno image as the base image
FROM denoland/deno:alpine-2.1.4

# Set the working directory
WORKDIR /app

# Install fortune and cowsay packages
RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk add --no-cache fortune
RUN apk add --no-cache cowsay

# Copy the project files to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 8080

RUN deno cache main.ts

# Run the Deno application
CMD ["run", "--allow-all", "main.ts"]
