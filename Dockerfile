# Use the official Deno image as the base image
FROM --platform=linux/amd64 denoland/deno:alpine-2.0.6

# Set the working directory
WORKDIR /app

# Copy the project files to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 8000

RUN deno cache main.ts

# Run the Deno application
CMD ["run", "--allow-read", "--allow-env", "--allow-net", "main.ts"]
