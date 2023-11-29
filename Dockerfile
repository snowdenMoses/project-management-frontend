FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Run npm run build
CMD ["npm", "start"]

# FROM nginx


# for multicontainer docker
# EXPOSE 80

# for single container docker
# EXPOSE 80

# for multicontainer docker using nginx routing
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build  /usr/share/nginx/html


