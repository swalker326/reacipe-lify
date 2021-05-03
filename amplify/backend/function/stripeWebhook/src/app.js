/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB();
const uuid = require("uuid/v4");
// Stripe parameters
var stripe = require("stripe")(
  "sk_test_51IlxItCctdIGJZxzTQI4lwsHhDu6p5glNofqZoOnrapq1jrmdgxlPocRCk1PqJr9bX8DU6dOmTYpd7qO85rFqFcS00b0TdtxBP"
  );
var endpointSecret = "sk_test_51IlxItCctdIGJZxzTQI4lwsHhDu6p5glNofqZoOnrapq1jrmdgxlPocRCk1PqJr9bX8DU6dOmTYpd7qO85rFqFcS00b0TdtxBP";
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// Table parameters
const paymentTable = "Payment-*********-dev";

if (process.env.ENV === "prod") {
  // Set prod env
  console.log("Prod env");
  // Stripe parameters
  stripe = require("stripe")("sk_live_********");
  endpointSecret = "sk_test_51IlxItCctdIGJZxzTQI4lwsHhDu6p5glNofqZoOnrapq1jrmdgxlPocRCk1PqJr9bX8DU6dOmTYpd7qO85rFqFcS00b0TdtxBP";
}

// declare a new express app
var app = express();
// app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (request, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  //intercept the OPTIONS call so we don't double up on calls to the integration
  if ('OPTIONS' === request.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf.toString();
    },
  })
);

 app.post('/webhook', function (request, response) {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    console.log(event);
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('Payment checkout session was successful!')
      break;
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
