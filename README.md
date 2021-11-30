# Distributed-warehouse-system

## set up dev environment

Install docker

Clone the repositoy

Set up a .env file in project root:
```
REACT_APP_INVENTORY_SERVICE_URL=http://localhost:4000
MONGO_URI=mongodb+srv://USER:PASSWORD@MONGO_DATABASE_URL
```
Start all containers by giving command in repository root:
```
docker-compose up
```
Frontend application is then running at `http://localhost:3000`.

## scaling

by default, 3 inventory-workers are created. To change the number of workers (to for example 10), use the following command:

```
docker-compose up --scale inventory-worker=10
```
