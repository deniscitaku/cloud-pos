FROM openjdk:12-alpine
VOLUME /tmp
ARG JAR_FILE=cloud-pos-1.0.jar
COPY target/${JAR_FILE} app/${JAR_FILE}
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","app/cloud-pos-1.0.jar"]