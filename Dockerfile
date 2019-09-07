FROM node:alpine

WORKDIR /code

ENV HUGO_VERSION=0.58.0
ENV FILE_NAME=hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz
ENV HUGO_PACKAGE=https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${FILE_NAME}

RUN apk --no-cache add curl
RUN apk --no-cache add indent
RUN echo "DONWLOADING HUGO FROM ${HUGO_PACKAGE}"
RUN curl $HUGO_PACKAGE -L -s -o /code/${FILE_NAME} | indent

RUN echo "UNPACKING HUGO TO /code/${FILE_NAME}"
RUN tar -zxvf /code/$FILE_NAME | indent
RUN mkdir /code/bin
RUN mv /code/hugo /code/bin/hugo

ENV PATH=/code/bin:$PATH
RUN echo "PATH is now ${PATH}"

RUN ls -la /code

RUN hugo version

COPY . .

RUN npm ci
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "start"]
