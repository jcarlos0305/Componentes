// Car Parts model

'use strict';

let mongoose = require('mongoose'), Schema = mongoose.Schema;

let	CarPartSchema = new Schema({
	category: String,
	price: String,
	stock: String,
	material: String,
	manufacturer: String
});

module.exports = mongoose.model('CarPart', CarPartSchema);