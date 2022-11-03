FROM gcr.io/distroless/nodejs:16

ADD $PWD /app
WORKDIR /app
RUN npm install --production

CMD ["index.js"]