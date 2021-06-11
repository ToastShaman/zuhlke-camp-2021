FROM gradle:7.0.2-jdk11-hotspot AS build
COPY . /src
WORKDIR /src
ENV GRADLE_OPTS "-Dorg.gradle.daemon=false"
RUN gradle clean bootJar

FROM adoptopenjdk/openjdk11:alpine-jre
RUN mkdir /app
COPY --from=build /src/teams/znake-davidd/build/libs/*.jar /app/zsnake-davidd.jar

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 9090
ENTRYPOINT ["java", "-jar", "/app/zsnake-davidd.jar"]
