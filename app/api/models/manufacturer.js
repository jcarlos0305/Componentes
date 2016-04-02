// Manufacturer model

'use strict';

let mongoose = require('mongoose'), Schema = mongoose.Schema;

let	ManufacturerSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);
