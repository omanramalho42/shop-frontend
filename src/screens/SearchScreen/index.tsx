import React, { useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { getError } from '../../util/utils'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LoadingBox, MessageBox, Product, Rating } from '../../components'
import { LinkContainer } from 'react-router-bootstrap'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false, 
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts
      }
    case 'FETCH_FAIL':
        return {
          ...state,
          loading: false,
          error: action.payload
        }
    default: 
      return state
  }
}

export const prices = [
  { 
    name: 'R$ 1 A R$ 50',
    value: '1-50'
  },
  { 
    name: 'R$ 51 A R$ 200',
    value: '51-200'
  },
  { 
    name: 'R$ 201 A R$ 1000',
    value: '201-1000'
  },
];

export const ratings = [
  { 
    name: '4 estrelas & acima',
    rating: 4
  },
  { 
    name: '3 estrelas & acima',
    rating: 3
  },
  { 
    name: '2 estrelas & acima',
    rating: 2
  },
  { 
    name: '1 estrelas & acima',
    rating: 1
  },
];

const SearchScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); //search ? category = 'Shirts'

  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'all';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(reducer, {
    loading: false,
    error: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: any = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS',payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    fetchData();
  },[category, error, order, page, query, price, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };

    fetchCategories();
  },[]);

  const getFilterUrl = (filter: any, skipPathname: boolean = false) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? '' : '/search?'
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  }

  return (
    <div>
      <Helmet>
        <title>Procurar produtos</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Departamento</h3>
          <div>
            <ul>
              <li>
                <Link 
                  className={
                    'all' === category 
                    ? 'text-bold' 
                    : ''
                  } 
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any  
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={
                      c === 'category' 
                      ? 'text-bold' 
                      : ''
                    }
                    to={getFilterUrl({ category: c })}
                  >
                    { c }
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Preço</h3>
            <ul>
              <li>
              <Link
                  className={
                    'all' === price 
                    ? 'text-bold' 
                    : ''
                  }
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    className={
                      p.value === price 
                      ? 'text-bold' 
                      : ''
                    }
                    to={getFilterUrl({ price: p.value })}
                  >
                    { p.name }
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings
              .map((r) => (
                <li key={r.name}>
                  <Link
                    className={
                      `${r.rating}` === `${rating}` 
                      ? 'text-bold' 
                      : ''
                    }
                    to={getFilterUrl({ rating: r.rating })}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className={
                    rating === "all" 
                    ? 'text-bold' 
                    : ''
                  }
                  to={getFilterUrl({ rating: "all" })}
                >
                  <Rating caption={' & up'} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant='danger'>
              { error }
            </MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'Nenhum' : countProducts} Resultados
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Preço ' + price}
                    {rating !== 'all' && ' : Avaliação ' + rating + ' & acima'}
                    {
                      query !== 'all' ||
                      category !== 'all' ||
                      rating !== 'all' ||
                      price !== 'all' ? (
                        <Button
                          variant="light"
                          onClick={() => navigate('/search')}
                        >
                          <i className='fas fa-times circle'></i>
                        </Button>
                      ) : null
                    }
                  </div>
                </Col>
                <Col className='text-end'>
                  Ordenado por{' '}
                  <select 
                    value={order} 
                    onChange={(event: any) => {
                      navigate(getFilterUrl(
                        { order: event.target.value }
                      )
                    )}}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col>
                {products?.length === 0 && (
                  <MessageBox>Nenhum produto encontrado</MessageBox>
                )}
                <Row>
                  {products?.map((product: any) => (
                    <Col 
                      key={product._id}
                      md={6} 
                      lg={4} 
                      className="mb-3" 
                    >
                      <Product product={product}/>
                    </Col>
                  ))}
                </Row>
                <div>
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className="mx-1"
                      to={{
                        pathname: '/search',
                        search: getFilterUrl({ page: x + 1 }, true),
                      }}
                    >
                      <Button 
                        variant="light" 
                        className={
                          Number(page) === x + 1 
                          ? 'text-bold' 
                          : ''
                        }
                      >
                        { x + 1}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>

              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default SearchScreen