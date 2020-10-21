FROM node:12.17.0-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs

FROM node:12.17.0-alpine

# install and copy
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist ./dist/src

# Required for Time Zone
RUN apk add tzdata

# Set up timezone and locale for proper date format etc.
ENV TZ=Australia/Sydney
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV LANG en_AU.UTF-8
ENV LANGUAGE ${LANG}
ENV LC_ALL ${LANG}

EXPOSE 3000
CMD npm start