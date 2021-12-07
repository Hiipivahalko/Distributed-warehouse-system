# Distributed-warehouse-system

## set up local dev environment

Install docker

Clone the repositoy

Set up a .env file in project root:
```
REACT_APP_INVENTORY_SERVICE_URL=http://localhost:4000
REACT_APP_ORDER_SERVICE_URL=http://localhost:5001
MONGO_URI=mongodb://root:example@mongo
```
Start all containers by giving command in repository root:
```
docker-compose -f docker-compose-dev.yaml up
```
This will start a local MongoDB server. If you want to use Mongo Atlas, you can point the `MONGO_URI` to your Atlas DB, and run the application with `docker-compose up` instead.

Frontend application is then running at `http://localhost:3000`.

## scaling

by default, 3 inventory-workers are created. To change the number of workers (to for example 10), use the following command:

```
docker-compose up --scale inventory-worker=10
```
