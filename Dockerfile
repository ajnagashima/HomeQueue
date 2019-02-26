FROM node:11.1

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
RUN npm install -g expo-cli@2.3.8
RUN npm install -g babel-cli@6.26.0
RUN npm install -g react-native-git-upgrade@0.2.7

WORKDIR /HomeQueue

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

ENV NAME HomeQueue

CMD ["npm", "start"]
