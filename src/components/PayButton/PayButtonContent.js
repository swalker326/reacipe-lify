import React, { useState } from "react";
import "./PayButton.css";
import PropTypes from "prop-types";
import { API } from "aws-amplify";
import { useStripe } from "@stripe/react-stripe-js";

const PaybuttonContent = (props) => {
  const [loading, setLoading] = useState(false);
  const {
    name,
    description,
    images,
    amount,
    currency,
    quantity,
    success_url,
    cancel_url,
  } = props;

  const stripe = useStripe();

  const handlePay = async () => {
    setLoading(true);
    const body = {
      name,
      description,
      images,
      amount,
      currency,
      quantity,
      success_url,
      cancel_url,
    };
    const response = await API.post(props.apiName, props.apiEndpoint, { body });
    stripe
      .redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: response.session.id,
      })
      .then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log("result :" + result); //eslint disable line
      });
    setLoading(false);
  };
  return (
    <div>
      <button
        onClick={handlePay}
        disabled={loading}
        variant="contained"
        color="secondary"
      >
        Pay ({parseFloat(Math.round(amount) / 100).toFixed(2)} {currency})
      </button>
      <div />
      {loading ? <h1>Loading</h1> : null}
    </div>
  );
};

PaybuttonContent.propTypes = {
  apiName: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired,

  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,

  success_url: PropTypes.string.isRequired,
  cancel_url: PropTypes.string.isRequired,
};

export default PaybuttonContent;
