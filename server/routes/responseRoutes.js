const express = require('express');
const Response = require('../models/responseModel.js');
const responseRouter = express.Router();

responseRouter.get('/responses', function(req, res){

});

module.exports = responseRouter;