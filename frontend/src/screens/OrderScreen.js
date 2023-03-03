import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { changeOrderStatus, getOrderDetails } from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_STATUS_RESET,
} from '../constants/orderConstants';
import PayPalCheckout from '../components/PayPalCheckout';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Meta from '../components/Meta';

const OrderScreen = () => {
  const statusOptions = [
    'Waiting for payment',
    'In preparation',
    'Sent',
    'Cancelled',
    'Returned',
  ];

  const [status, setStatus] = useState('');

  const initialOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
  };

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [skdReady, setSkdReady] = useState(false);

  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderStatus = useSelector((state) => state.orderStatus);
  const { loading: loadingSend, success: successSend } = orderStatus;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&locale=en_US`;
      script.async = true;
      script.onload = () => {
        setSkdReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      (order && order._id !== orderId) ||
      successPay ||
      successSend
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_STATUS_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSkdReady(true);
      }
    } else {
      setStatus(order.status);
    }
  }, [dispatch, navigate, order, orderId, successPay, successSend, userInfo]);

  const updateStatusHandler = () => {
    dispatch(changeOrderStatus(order._id, status));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Meta title='E-Commerce | Order' />
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              {order.status === 'Sent' ? (
                <Message variant='success'>
                  Sent on {order.sentAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Sent</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          {`${process.env.REACT_APP_ENV}` === 'development' ? (
                            <Image
                              src={`${process.env.REACT_APP_IP}${item.image}`}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          ) : (
                            <Image
                              src={`${item.image}`}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          )}
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>Summary</ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!skdReady ? (
                    <Loader />
                  ) : (
                    <PayPalScriptProvider options={initialOptions}>
                      <PayPalCheckout amout={order.totalPrice} />
                    </PayPalScriptProvider>
                  )}
                </ListGroup.Item>
              )}

              {loadingSend && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isSent && (
                  <ListGroup.Item>
                    <Form.Control
                      as='select'
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className='mb-3'
                    >
                      {statusOptions.map((option, i) => (
                        <option key={i + 1} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={updateStatusHandler}
                    >
                      Update
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
