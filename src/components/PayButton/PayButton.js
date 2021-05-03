import React, { Component } from 'react';
import './PayButton.css';
import PropTypes from 'prop-types';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PayButtonContent from './PayButtonContent';

class PayButton extends Component {
    render() {
        const {
            stripePublicKey,
            apiName,
            apiEndpoint,

            name,
            description,
            images,
            amount,
            currency,
            quantity,

            success_url,
            cancel_url,
        } = this.props;
        return (
            <StripeProvider apiKey={stripePublicKey}>
                <Elements>
                    <PayButtonContent
                        apiName={apiName}
                        apiEndpoint={apiEndpoint}
                        name={name}
                        description={description}
                        images={images}
                        amount={amount}
                        currency={currency}
                        quantity={quantity}
                        success_url={success_url}
                        cancel_url={cancel_url}
                    />
                </Elements>
            </StripeProvider>
        );
    }
}

PayButton.propTypes = {
    stripePublicKey: PropTypes.string.isRequired,
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

export default PayButton;