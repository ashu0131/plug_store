const express = require("express");
const routes = express.Router();

const controller = require("../UserController/Stripe");
const webhook = require("../UserController/Webook");

const connectDB =require('../config/db')

routes.post("/create-checkout-session", controller.user);

routes.get("/validate-session", controller.ashu);

routes.post( "/webhook", webhook.webhook);

connectDB();

module.exports = routes;