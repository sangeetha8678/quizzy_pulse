# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy all project files and configurations
COPY pom.xml .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY types.d.ts .
COPY vite.config.ts .
COPY vite.generated.ts .
COPY .npmrc .

# Copy the actual source code
COPY src ./src
COPY frontend ./frontend

# Build the application using the production profile
RUN mvn clean package -Pproduction

# Stage 2: Run the application
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the compiled JAR file from the build stage
COPY --from=build /app/target/quizzypulse-1.0-SNAPSHOT.jar ./app.jar

# Expose port 8080 for web traffic
EXPOSE 8080

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
