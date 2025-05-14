# stage 1: build the react app
FROM node:20.9.0 AS build

WORKDIR /app

# copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# copy the rest of the files and build the app
COPY . .

RUN npm run build

# stage 2: serve the app with nginx
FROM nginx:alpine

# copy the built app into the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html


# copy the custom nginx config to handle the base path
COPY default.conf /etc/nginx/conf.d/default.conf


# Expose port 80 for the web server
EXPOSE 80 

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]