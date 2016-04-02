'use strict';

// BASE SETUP
// ==============================================

// call the packages we need
let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/carPartsDB',
		port = process.env.PORT || 8082;

// connect to mongodb
mongoose.connect(dbURI);

// import the models
let carParts = require('./app/api/models/carPart');
let manufacturer = require('./app/api/models/manufacturer');

// DEFINE THE MIDDLEWARE FOR APP
// ==============================================

// configure app to use bodyParser()
// this will let us get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES
// ==============================================

// get an instance of the express router
let apiRouter = express.Router();

// MIDDLEWARE to use for all requests
apiRouter.use((req, res, next) => {
	next();   // don't stop here, go to next route
});

// routes 

// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

// on routes that end in /carParts
apiRouter.route('/carParts')
	// create a carPart (http://localhost:8082/api/carParts)
	.post((req, res) => {
		let carPart = new carParts();
		carPart.category = req.body.category;
		carPart.price = req.body.price;
		carPart.stock = req.body.stock;
		carPart.material = req.body.material;
		carPart.manufacturer = req.body.manufacturer;
    
		carPart.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Car part created!', object: carPart });
		});
	})
	// get all carParts (http://localhost:8082/api/carParts)
	.get((req, res) => {
		carParts.find((err, carParts) => {
			if (err) res.send(err);
			res.json(carParts);
		});
	});

// on routes that end in /carParts/:carPart_id
apiRouter.route('/carParts/:carPart_id')
	// get a carPart by id (http://localhost:8082/api/carParts/:carPart_id)
	.get((req, res) => {
		carParts.findById(req.params.carPart_id, (err, carPart) => {
			if (err) res.send(err);
			res.json(carPart);
		});
	})
	// update a carPart by id (http://localhost:8082/api/carParts/:carPart_id)
	.put((req, res) => {
		carParts.findById(req.params.carPart_id, (err, carPart) => {
			if (err) res.send(err);
			// update info
			carParts.category = req.body.categoría;
            carParts.price = req.body.precio;
            carParts.stock = req.body.existencias;
            carParts.material = req.body.material;
            carParts.manufacturer = req.body.fabricante;
			// save carPart
			carParts.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Car part updated!' });
			});
		});
	})
	// delete a carPart by id (http://localhost:8082/api/carParts/:carPart_id)
	.delete((req, res) => {
		carParts.remove({ _id: req.params.carPart_id }, (err, carPart) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});

    // on routes that end in /carParts/:carPart_id
apiRouter.route('/carParts/fabricante/:carPartfabricante')
	// get a carPart by id (http://localhost:8082/api/carParts/:carPart_id)
	.get((req, res) => {
		carParts.find({manufacturer:req.params.carPartfabricante}, (err, carPart) => {
			if (err) res.send(err);
			res.json(carPart);
		});
	});

apiRouter.route('/carParts/category/:carPartcategory')
	// get a carPart by id (http://localhost:8082/api/carParts/:carPart_id)
	.get((req, res) => {
		carParts.find({category:req.params.carPartcategory}, (err, carPart) => {
			if (err) res.send(err);
			res.json(carPart);
		});
	});

// on routes that end in /manufacturer
apiRouter.route('/manufacturer')
	// create a carPart (http://localhost:8082/api/manufacturer)
	.post((req, res) => {
		let newmanufacturer = new manufacturer();
		newmanufacturer.name = req.body.name;
    
		newmanufacturer.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Manufacturer created!', object: newmanufacturer });
		});
	})
	// get all manufacturer (http://localhost:8082/api/manufacturer)
	.get((req, res) => {
		manufacturer.find((err, manufacturer) => {
			if (err) res.send(err);
			res.json(manufacturer);
		});
	});

// on routes that end in /manufacturer/:manufacturer_id
apiRouter.route('/manufacturer/:manufacturer_id')
	// get a manufacturer by id (http://localhost:8082/api/manufacturer/:manufacturer_id)
	.get((req, res) => {
		manufacturer.findById(req.params.manufacturer_id, (err, manufacturer) => {
			if (err) res.send(err);
			res.json(manufacturer);
		});
	})
	// update a manufacturer by id (http://localhost:8082/api/manufacturer/:manufacturer_id)
	.put((req, res) => {
		manufacturer.findById(req.params.manufacturer_id, (err, manufacturer) => {
			if (err) res.send(err);
			// update info
			manufacturer.category = req.body.categoría;
            manufacturer.price = req.body.precio;
            manufacturer.stock = req.body.existencias;
            manufacturer.material = req.body.material;
            manufacturer.manufacturer = req.body.fabricante;
			// save manufacturer
			manufacturer.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Manufacturer updated!' });
			});
		});
	})
	// delete a manufacturer by id (http://localhost:8082/api/manufacturer/:manufacturer_id)
	.delete((req, res) => {
		manufacturer.remove({ _id: req.params.manufacturer_id }, (err, manufacturer) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});


// all routes will be prefixed with /api
app.use('/api', apiRouter);



// START THE SERVER
// ==============================================
app.listen(port);