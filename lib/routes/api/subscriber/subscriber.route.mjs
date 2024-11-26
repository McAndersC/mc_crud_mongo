import express from "express";
import { read, write } from "../../../handlers/file.handler.mjs";
import { getNewUID } from "../../../misc/helpers.mjs";
import { createSubscriber, deleteSubscriber, getSubscriber, updateSubscriber } from "../../../handlers/subscribers/subscriber.handler.mjs";
import auth from "../../../../middleware/auth.middleware.mjs";

const subscriberRoute = express.Router();

// (C)reate POST  
subscriberRoute.post('/api/subscriber', auth, async (req, res) => {

    const result = await createSubscriber(req.body)
    return res.status(200).send(result);

})

// (R)ead GET  
subscriberRoute.get('/api/subscriber', async (req, res) => {

    let id = req.query.id;
    const result = await getSubscriber(id);
    return res.status(200).send(result);

})

// (U)pdate PUT  
subscriberRoute.put('/api/subscriber', auth, async (req, res) => {

    const result = await updateSubscriber(req.body);
    return res.status(200).send(result);

});

// (D)elete DELETE  
subscriberRoute.delete('/api/subscriber', auth, async (req, res) => {

    console.log('DELETING SUBSCRIBER', req.user)
    const result = await deleteSubscriber(req.body.id);
    return res.status(200).send(result);

})

export default subscriberRoute;