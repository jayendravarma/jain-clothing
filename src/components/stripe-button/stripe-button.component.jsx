import React from 'react';
import StripeCheckout from 'react-stripe-checkout'


const StripeCheckoutBUtton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_W770iALL4jfSNtWx5d9Eek5h00K24Ubk2R';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    return (
        <StripeCheckout 
        label='Pay Now'
        name='jain-clothing Ltd'
        billingAddress
        shippingAddress
        imgage='https://svgshare.com/i/CUz.svg'
        description={`Your Total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishablekey}
        />
    );
};


export default StripeCheckoutBUtton;