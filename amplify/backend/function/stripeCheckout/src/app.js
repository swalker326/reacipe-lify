/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_51IlxItCctdIGJZxzTQI4lwsHhDu6p5glNofqZoOnrapq1jrmdgxlPocRCk1PqJr9bX8DU6dOmTYpd7qO85rFqFcS00b0TdtxBP');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

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

app.use(bodyParser.json({
  verify: function (req, res, buf) {
    req.rawBody = buf.toString()
  }
}));

app.post('/checkout', async function (req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
        amount: req.body.amount,
        currency: req.body.currency,
        quantity: req.body.quantity,
      }],
      success_url: req.body.success_url,
      cancel_url: req.body.cancel_url,
    });
    res.json({ err: null, success: 'Create stripe checkout session succeed!', session })
  } catch (err) {
    res.json({ err: err })
  }
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
