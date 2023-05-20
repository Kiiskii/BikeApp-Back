    ## build runner
    FROM node:lts-alpine

    # Move package.json and package-lock.json
    COPY package.json package-lock.json* ./

    # Install dependencies
    RUN npm ci && npm cache clean --force

    # Move rest of the files
    COPY * ./

    #test
    RUN ["npm", "test"]

    # Start bot
    CMD [ "node", "server.js" ]