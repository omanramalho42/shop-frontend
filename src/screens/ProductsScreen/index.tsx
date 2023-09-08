import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { getError } from '../../util/utils'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../context/Store'
import { LoadingBox, MessageBox } from '../../components'
import { Badge, Button } from 'react-bootstrap'
import { Toaster, toast } from 'react-hot-toast'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const ProductsScreen:React.FC = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [useLoading, setUseLoading] = useState(false);

  const handleRemoveProduct = async (id: string) => {
    setUseLoading(true);
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/slug/${id}`, {
      headers: { authorization: `Bearer ${userInfo.token}` }
    })
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((error) => {
        toast.error(`Erro ao remover produto: ${getError(error)} `)
      })
    setUseLoading(false);
  }

  const [{ loading, error, products }, dispatch] = useReducer(reducer , {
    products: {},
    loading: true,
    error: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/listproducts`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        
        dispatch({ type: 'FETCH_SUCCESS', payload: data.products });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo, useLoading])

  return (
    <div>
      <Toaster />
      {loading || useLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>
          { error }
        </MessageBox>
      ) : (
        <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATA</th>
            <th>NAME</th>
            <th className='text-center'>PRECO</th>
            <th className='text-center'>QUANTIDADE EM ESTOQUE</th>
            <th className='text-center'>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={ product._id }>
              <td>{ product._id }</td>
              <td>{ product.createdAt.substring(0, 10) }</td>
              <td>{ product.name }</td>
              <td className='text-center'>
                R$ { product.price.toFixed(2) }
              </td>
              <td className='text-center'>
              {product.countInStock > 0 ? (
                <>
                  <Badge bg="success">
                    Em estoque
                  </Badge>
                  <p>
                    { product.countInStock }
                  </p>
                </>
              ) : (
                <>
                  <Badge bg="danger">
                    Fora de estoque
                  </Badge>
                  <p>
                    0
                  </p>
                </>
              )}
              </td>
              <td className='flex-row'>
                <Button
                  type="button"
                  variant='light'
                  className='m-2'
                  onClick={() => {
                    navigate(`/product/${product.slug}`)
                  }}
                >
                  Detalhes
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  className='m-2'
                  onClick={() => handleRemoveProduct(product._id)}
                >
                  Excluir
                </Button>
                <Button
                  type="button"
                  className='m-2'
                  variant='dark'
                  onClick={() => {
                    navigate(`/admin/product/edit/${product.slug}`)
                  }}
                >
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
    </table>  
    )}
    <div>
      <Button type='button' onClick={() => navigate("/admin/product/create")} variant='success'>
        + Criar novo produto
      </Button>
    </div>
  </div>
  )
}

export default ProductsScreen