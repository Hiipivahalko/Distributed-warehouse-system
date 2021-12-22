# Distributed-warehouse-system

Group project for the University of Helsinki course CSM13001 Distributed Systems.

The goal of the project was to build a distributed warehouse management application for ordering products from different warehouses. 

#### Contributors

- [Hiipivahalko](https://github.com/Hiipivahalko)
- [hajame](https://github.com/hajame)
- [Wood101](https://github.com/wood101)

### Overview of distributed features

The system offers good availability for product inventory reads by means of replicable containerized microservices that communicate using RESTful endpoints. The MongoDB Atlas cloud database resources can be scaled elastically with respect to the number of data requests.

The system does its best to ensure sequential processing of orders, so that no double ordering can occur. A double order means that two users can order a product at the same time, even though there is stock left to fulfill only one of the orders. The order requests are also non-blocking, so that users can access other parts of the system while their order is in queue or being processed by the system.

## Installation

### Set up a local development/test environment

The service can be run with both a local and a remote MongoDB.
The environment variables and commands are slightly different for each.

#### Required dependencies
- docker, docker-compose

#### Option 1: Start the service with a local MonboDB server

Set up the following .env file in project root:

```
REACT_APP_INVENTORY_SERVICE_URL=http://localhost:4000
REACT_APP_ORDER_SERVICE_URL=http://localhost:5001
MONGO_URI=mongodb://root:example@mongo
REDIS_HOST=redis-server
REDIS_PORT=6379
```
Here are the terminal commands to 

1. Start the service
2. Scale the worker nodes
3. Stop the service

```
docker-compose -f docker-compose-dev.yaml up
docker-compose -f docker-compose-dev.yaml up --scale inventory-worker=5
docker-compose -f docker-compose-dev.yaml down
```

Frontend application is served at `http://localhost:3000`.
- Go to Products & Orders and click `Init products`
- Play around with orders!

#### Option 2: Start the service using remote MongoSB (such as Mongo Atlas)

Set up the .env file in project root. Replace `MONGO_URI` with your remote MongoDB server URI.

```
REACT_APP_INVENTORY_SERVICE_URL=http://localhost:4000
REACT_APP_ORDER_SERVICE_URL=http://localhost:5001
MONGO_URI=mongodb+srv://USER:PASSWORD@MONGO_DATABASE_URL
```

Here are the terminal commands to 

1. Start the service
2. Scale the worker nodes
3. Stop the service

```
docker-compose up
docker-compose up --scale inventory-worker=5
docker-compose down
```

Frontend application is served at `http://localhost:3000`.
- Go to Products & Orders and click `Init products`
- Play around with orders!
