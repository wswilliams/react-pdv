# API-SERVER

Objetivo: PDV SIMLES

## Setup api-generic

### Pré-Requisitos

[node 10x ou superior](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

[mysql](https://https://www.mysql.com/downloads)


### Ambiente de desenvolvimento 

Clone repository - api-generic (branch: develop)

    git clone -b develop http://192.168.151.85:8087/pmz-hmt/api-generic/tree/develop 


## Executar aplicação 

### Executar mongodb via docker-compose
```
docker-compose up -d
```

### Install dependences mode NPM or YARN
```
npm install or yarn 
```

### Install oracle drive
```
mkdir -p /opt/oracle

cd /opt/oracle

wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basic-linuxx64.zip

unzip instantclient-basic-linuxx64.zip

sudo sh -c "echo /opt/oracle/instantclient_20_x > /etc/ld.so.conf.d/oracle-instantclient.conf"

apt install -y libaio1

sudo ldconfig

export LD_LIBRARY_PATH=/opt/oracle/instantclient_20_x:$LD_LIBRARY_PATH
```


### Run project
```
npm start or yarn start
```

Teste utilizando Postman ou Insomia

    GET http://localhost:3355/api/millenium-pmz/clientsIntegration?codigo=5063900&empresa=2

## Ambiente de Produção 

Clone repository - api-generic (branch: master)

    git clone  http://192.168.151.85:8087/pmz-hmt/api-generic 


## Deploy via Ansible AWX
```
Acessar AWX: http://192.168.151.85:8083/#/login

jobTemplate: 'DEPLOY_BACKEND_INTEGRATION',

```

##### EXTRA VARIABLES DE DESENVOLVIMENTO
```
version: develop
node_env: dev

```

##### EXTRA VARIABLES DE PRODUÇÂO
```
version: master
node_env: production

```