require("dotenv").config();
const express = require('express');
const cors = require('cors');
 const router =require('./UserRouters/Routers')

const app = express();


app.use(cors());
app.use(
  "/webhook",
  express.raw({ type: "application/json" })
);
app.use(express.json());
app.use(router);
const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`Stripe server listening on port ${port}`)
 
});

