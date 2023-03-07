import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CartItem = ({ product }) => {
  return (
    <Row>
      <Col md={5}>
        {`${process.env.REACT_APP_ENV}` === 'development' ? (
          <Image
            src={`${process.env.REACT_APP_IP}${product.image}`}
            thumbnail
            loading='lazy'
          />
        ) : (
          <Image src={`${product.image}`} thumbnail loading='lazy' />
        )}
      </Col>
      <Col>{product.name}</Col>
      <Col>${product.price}</Col>
      <Col>Qty - {product.qty}</Col>
    </Row>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default CartItem;
