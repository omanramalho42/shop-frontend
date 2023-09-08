import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getError } from '../../util/utils'
import { Button, Form, Image } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import { LoadingBox, MessageBox } from '../../components'
import { Store } from '../../context/Store'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true}
    case 'FETCH_SUCCESS':
      return {...state, product: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const CreateProductScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useParams();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';

  const [{ error, product }, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
    error: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/products/slug/create`, 
        {
          name: productName,
          slug: validSlug,
          price: productPrice,
          rating: productRating,
          brand: productBranding,
          category: productCategory,
          description: productDescription,
          numReviews: numReviews,
          image: productImage,
          countInStock: amountInStock
        },
        { headers: { authorization: `Bearer ${userInfo.token}` }  }
      );
      setLoading(false);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setLoading(false);
    }
  }

  const [productName, setProductName] = useState("");
  const [validSlug, setValidSlug] = useState("");
  const [numReviews, setNumReviews] = useState(0);
  const [amountInStock, setAmountInStock] = useState(0);
  const [productImage, setProductImage] = useState("../assets/images/nike_hat.png");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productBranding, setProductBranding] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRating, setProductRating] = useState(0);

  return (
    <>
      <Toaster />
      {  loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">
          { error }
        </MessageBox>
      ) : (
        <Form onSubmit={handleSubmit} className='h-full'>
          <Form.Group className="mb-3" controlId='productImage'>
            <Toaster />
            <div className='mb-5 border text-center'>
              {/* <Form.Label>Imagem do produto</Form.Label> */}
              {/* <Form.Control 
                type="productImage"
                value={productImage}
                required 
                onChange={(e) => setProductImage(e.target.value)}
              /> */}
              <Image src={`/${productImage}` || ""} width={300} height={300} alt={product.name} />
            </div>
            <Form.Label>Nome do produto</Form.Label>
            <Form.Control 
              type="productName"
              value={productName}
              required 
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId='productSlug'>
            <Form.Label>Slug do produto</Form.Label>
            <Form.Control
              type="productSlug" 
              value={validSlug}
              required 
              onChange={(e) => setValidSlug(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId='branding'>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="branding"
              value={productBranding}
              required
              onChange={(e) => setProductBranding(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId='numReviews'>
            <Form.Label>Numero de visualizaçoes</Form.Label>
            <Form.Control
              type="numReviews"
              disabled
              value={numReviews}
              // required
              onChange={(e) => setNumReviews(Number(e.target.value))} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId='price'>
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="price"
              value={productPrice}
              required
              onChange={(e) => setProductPrice(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId='category'>
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="category"
              value={productCategory}
              required
              onChange={(e) => setProductCategory(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId='description'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="description"
              value={productDescription}
              required
              onChange={(e) => setProductDescription(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId='rating'>
            <Form.Label>Avaliacão</Form.Label>
            <Form.Control
              type="rating"
              disabled
              value={productRating}
              // required
              onChange={(e) => setProductRating(Number(e.target.value))} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId='amountInStock'>
            <Form.Label>Quantidade em estoque</Form.Label>
            <Form.Control
              type="amountInStock" 
              disabled
              value={amountInStock}
              // required
              onChange={(e) => setAmountInStock(Number(e.target.value))} 
            />
          </Form.Group>
          <div className='d-flex flex-row mb-5'>
            <div className='m-3'>
              <Button type='button' variant='secondary' onClick={() => navigate("/admin/products")}>Voltar</Button>
            </div>
            <div className='m-3'>
              <Button type='submit'>Criar</Button>
            </div>
          </div>
        </Form>
      )}
    </>
  )
}

export default CreateProductScreen