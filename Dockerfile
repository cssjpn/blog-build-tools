FROM node:14.15-buster-slim

RUN apt update && apt install -y curl git ssh tar gzip ca-certificates

RUN mkdir /blog
WORKDIR /blog

ADD entrypoint.sh /
ADD package*.json /blog/
ADD gulpfile.js /blog/
ADD lib/ /blog/lib/

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]
