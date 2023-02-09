import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { payOrder } from '../actions/orderActions';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const PayPalCheckout = (amount) => {
  const dispatch = useDispatch();
  const params = useParams();

  const orderId = params.id;

  const [{ options, isPending }] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: value,
      },
    });
  };

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: Object.values(amount).toString(),
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(payOrder(orderId, details));
    });
  };

  return (
    <div className='checkout'>
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <select value={currency} onChange={onCurrencyChange}>
            <option value='USD'>💵 USD</option>
            <option value='EUR'>💶 Euro</option>
            <option value='GPB'>💷 GPB</option>
          </select>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
};

export default PayPalCheckout;
