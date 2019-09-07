FROM node:alpine

WORKDIR /code

ENV HUGO_VERSION=0.58.0
ENV FILE_NAME=hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz
ENV HUGO_PACKAGE=https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${FILE_NAME}

RUN apk add --no-cache \
  curl \
  git \
  openssh-client \
  rsync \
  libstdc++

# Install glibc: This is required for HUGO-extended (including SASS) to work.

ENV GLIBC_VERSION 2.28-r0
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
  &&  wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VERSION/glibc-$GLIBC_VERSION.apk" \
  &&  apk --no-cache add "glibc-$GLIBC_VERSION.apk" \
  &&  rm "glibc-$GLIBC_VERSION.apk" \
  &&  wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VERSION/glibc-bin-$GLIBC_VERSION.apk" \
  &&  apk --no-cache add "glibc-bin-$GLIBC_VERSION.apk" \
  &&  rm "glibc-bin-$GLIBC_VERSION.apk" \
  &&  wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VERSION/glibc-i18n-$GLIBC_VERSION.apk" \
  &&  apk --no-cache add "glibc-i18n-$GLIBC_VERSION.apk" \
  &&  rm "glibc-i18n-$GLIBC_VERSION.apk"

ARG HUGO_VERSION

RUN mkdir -p /usr/local/src
RUN cd /usr/local/src
RUN curl -L https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-64bit.tar.gz | tar -xz
RUN apk add build-base
RUN mv hugo /usr/local/bin/hugo
RUN curl -L https://bin.equinox.io/c/dhgbqpS8Bvy/minify-stable-linux-amd64.tgz | tar -xz
RUN mv minify /usr/local/bin
# RUN addgroup -Sg 1000 hugo
# RUN adduser -Sg hugo -u 1000 -h /src hugo

RUN hugo version

# run
COPY . .

RUN npm ci
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "start"]
