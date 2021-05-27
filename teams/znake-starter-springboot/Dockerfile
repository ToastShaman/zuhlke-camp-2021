FROM gradle:7.0.2-jdk11-hotspot AS build
COPY . /src
WORKDIR /src
RUN gradle clean bootJar

FROM adoptopenjdk:11-jre-hotspot
RUN mkdir /app
COPY --from=build /src/teams/znake-starter-springboot/build/libs/*.jar /app/snake.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/snake.jar"]
