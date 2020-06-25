# TODO include yarn build
# TODO include path for docs/model
# !!! before docker build run yarn build    !!!
# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]
