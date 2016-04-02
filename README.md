# MEAN Stack RESTful API
MEAN stack project (Mongo - Express - Node - Angular) for building a RESTful API.
For academic use.

## Installation
- Install MongoDB
- Install Node.js
- Clone project
- Install NPM packages
```
$ npm install
```
- Run main entry .js file from with Node
```
$ node server.js
```

##CRUD

CRUD fabricantes

- Create/get all 
```
http://localhost:8082/api/manufacturer
```

- Update/delete/get by id
```
http://localhost:8082/api/manufacturer/:manufacturer_id
```

CRUD parte de carro

- Create/get all
```
http://localhost:8082/api/carParts
```
- Update/delete/get by id
```
http://localhost:8082/api/carParts/:carPart_id
```

##Consultas

- Get by manufacturer
```
http://localhost:8082/api/carParts/category/:carPartcategory
```

- Get by category
```
http://localhost:8082/api/carParts/category/:carPartcategory
```
