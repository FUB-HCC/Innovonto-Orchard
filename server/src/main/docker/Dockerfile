FROM openjdk:11-jre-slim
ARG DEPENDENCY=target/dependency
# TODO ARG BUILD_VERSION
# TODO VOLUMES

COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app

#ENV JAVA_OPTS="-Xms3G -Xmx3G"
ENV APP_OPTS="-Djava.security.egd=file:/dev/./urandom"

ENTRYPOINT ["sh","-c", "java $JAVA_OPTS -cp app:app/lib/* $APP_OPTS de.fuberlin.innovonto.orchard.OrchardBackendApplication"]