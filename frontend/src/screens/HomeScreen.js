import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import {
  SET_MULTIPLE_PAGES,
  SET_SINGLE_PAGE,
} from '../constants/screenConstants';
import { setItemsPerPage } from '../actions/screenActions';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, erorr, products, pages, page } = productList;

  const { itemsPerPage, singlePage } = useSelector(
    (state) => state.itemsPerPage
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, itemsPerPage));
  }, [dispatch, keyword, pageNumber, itemsPerPage]);

  useEffect(() => {
    if (pages === 1) {
      dispatch({ type: SET_SINGLE_PAGE });
    } else {
      dispatch({ type: SET_MULTIPLE_PAGES });
    }
    if (singlePage && !keyword) {
      navigate('/');
    }
  }, [dispatch, navigate, pages, singlePage, keyword]);

  const onChangeHandler = (e) => {
    dispatch(setItemsPerPage(e.target.value));
  };

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <Row>
        <Col>
          <h1>Latest Products</h1>
        </Col>
        <Col md={4} className='py-3 item-per-page-col'>
          <Form className='float-right item-per-page-form'>
            <Form.Label className='item-per-page-form-label'>
              Items per page
            </Form.Label>
            <Form.Control
              className='items-per-page-form-control'
              as='select'
              value={itemsPerPage}
              onChange={onChangeHandler}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={20}>20</option>
            </Form.Control>
          </Form>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : erorr ? (
        <Message variant='danger'>{erorr}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
