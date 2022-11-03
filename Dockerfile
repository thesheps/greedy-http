FROM gcr.io/distroless/nodejs:16

ADD $PWD /app
WORKDIR /app

CMD ["index.js"]