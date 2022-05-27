#!/bin/bash

APP_NAME=PDV
APP_VERSION=1.0
APP_FRONTEND=app-client
API_WEB_GATEWAY=api-server

echo
echo "BUILDING $APP_NAME FRONTEND"
echo "================================================"
echo

help() {
    echo "Usage:"
}

if [ "$1" = "--help" ]; then
    help

    exit 0
fi

# Deploy project pm2
    echo
    echo "DEPLOYMENT BACKEND WITH PM2 MODE"
    echo "====================================="
    echo

    # Start backend project

    pm2 delete $API_WEB_GATEWAY

    cd api-server/

    npm install

    echo "STARTING BACKEND"

    pm2 start src/server.ts --name $API_WEB_GATEWAY
   ## pm2 start src/server.ts --name $API_WEB_GATEWAYp

   
    cd ..

    echo APP_FRONTEND: $APP_FRONTEND

# Deploy project pm2
    echo
    echo "DEPLOYMENT FRONTEND WITH PM2 MODE"
    echo "====================================="
    echo
    

    # Install Dependencies
    # yarn install

    echo "REMOVE OS ARQUIVOS DO BUILD FRONTEND"
    # Clear previous build
    rm -rf build/

    echo "GERAR UM NOVO BUILD FRONTEND"
    # Buil frontend project   
    npm run build

    # Start frontend project
    echo "EXCLUIR A API FRONTEND DO PM2"
    pm2 delete $APP_FRONTEND

    cd server/

    echo "INSTALAR AS DEPENDENCIA FRONTEND"
    npm install

    echo "STARTING FRONTEND PM2"

    #npm start

   pm2 start index.js --name $APP_FRONTEND

