# Distributed-warehouse-system

## set up local dev environment for testing

The service can be run with both a local and a remote MongoDB.
The environment variables and commands are slightly different for each.

### Required dependencies
- docker, docker-compose

### Option 1: Start the service with a local MonboDB server

Set up the following .env file in project root:

```
REACT_APP_INVENTORY_SERVICE_URL=http://localhost:4000
REACT_APP_ORDER_SERVICE_URL=http://localhost:5001
MONGO_URI=mongodb://root:example@mongo
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

### Option 2: Start the service using remote MongoSB (such as Mongo Atlas)

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
