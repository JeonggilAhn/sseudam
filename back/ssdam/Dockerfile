FROM openjdk:21-slim
WORKDIR /usr/src/app

ARG JAR_PATH=./build/libs
ARG JAR_NAME=ssdam-0.0.1-SNAPSHOT.jar
COPY build/libs/${JAR_NAME} app.jar

CMD ["java", "-jar", "app.jar"]