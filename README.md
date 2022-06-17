# react-pdv

## Setup react-pdv

### Pré-Requisitos

[node 10x ou superior](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

[docker e docker-compose](https://docs.docker.com/engine/install/ubuntu/)

[mysql-5.7](https://dev.mysql.com/downloads/installer/)


## Ambiente de desenvolvimento 

Clone repository - react-pdv (branch: main)

    $ git clone https://github.com/wswilliams/react-pdv.git



## Executar aplicação react-pdv: Frontend, Backend e MySQL

#### Executar by docker-compose

    $ cd react-pdv

    $ docker-compose up -d --build


#### Vericar log > docker logs

    $ docker-compose up -d

    ou 

    $ docker logs -f --tail 1000 container_name