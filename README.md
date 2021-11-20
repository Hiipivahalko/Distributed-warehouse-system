# Distributed-warehouse-system

## set up dev environment

### start inventory database for development

`cd inventory-worker`

`npm install`

`npm run server`

Inventory DB is now running at `http://localhost:5000/`, see for example at `http://localhost:5000/warehouses`

### start order database for development

`cd order-service`
`npx json-server --port=5001 --watch dev_db.json`

Order DB is now running at `http://localhost:5001/`, see for example at `http://localhost:5001/orders`

### start order service

`cd order-service`
`npm install`
`npm run dev`

Backend is running at `http://localhost:3001`.

### start inventory service

`cd inventory-service`
`npm install`
`npm run dev`

Backend is running at `http://localhost:4000`.

### start inventory worker

`cd inventory-worker`
`npm install`
`npm run dev`

Backend is running at `http://localhost:4001`.

### start frontend
`cd warehouse-front`
`npm install`
`npm start`

Frontend application is then running at `http://localhost:3000`.
