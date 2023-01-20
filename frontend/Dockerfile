FROM node:16 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install
RUN npm install react-scripts@5.0.1 -g

COPY . /app

RUN npm run build


FROM nginx:1.21 AS start_prod
COPY --from=build /app/build /usr/share/nginx/html
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN openssl req -x509 -nodes -newkey rsa:2048 -keyout key.pem -out cert.pem -sha256 -days 365 \
    -subj "/C=GB/ST=London/L=London/O=Alros/OU=IT Department/CN=localhost"
RUN mv cert.pem /etc/nginx/cert.pem
RUN mv key.pem /etc/nginx/key.pem

CMD ["nginx", "-g", "daemon off;"]