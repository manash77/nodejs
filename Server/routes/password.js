const express = require("express");
const passwordController = require("../controllers/password");
const routes = express.Router();

// Add routes
routes.post('/forgotpassword', passwordController.forgotPassword);

routes.get('/updatepassword/:resetpasswordid', passwordController.updatepassword)

routes.get('/resetpassword/:id', passwordController.resetpassword);

module.exports = routes;
