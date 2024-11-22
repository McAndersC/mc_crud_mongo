import express from "express";
import { read, write } from "../../../handlers/file.handler.mjs";
import { getNewUID } from "../../../misc/helpers.mjs";

const subscriberRoute = express.Router();

// (C)reate POST  
subscriberRoute.post('/api/subscriber', async (req, res) => {

})

// (R)ead GET  
subscriberRoute.get('/api/subscriber', async (req, res) => {

})

// (U)pdate PUT  
subscriberRoute.put('/api/subscriber', async (req, res) => {

});

// (D)elete DELETE  
subscriberRoute.delete('/api/subscriber', async (req, res) => {

})

export default subscriberRoute;