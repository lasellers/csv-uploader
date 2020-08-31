# sudo docker build -t react-csv-image -f Dockerfile .

# prod:
# sudo docker run -p 3001:3000 --name react-csv react-csv-image

# dev:
# Note: is for triggering save and refresh
# sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true --name react-csv react-csv-image

# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent

# add app
COPY . ./

# EXPOSE 3000

# start app
CMD ["npm", "start"]
