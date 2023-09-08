import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { getError } from '../../util/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Store } from '../../context/Store'
import { LoadingBox, MessageBox } from '../../components'
import { Button } from 'react-bootstrap'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return {...state, users: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const UsersList:React.FC = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, users }, dispatch] = useReducer(reducer , {
    users: {},
    loading: true,
    error: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/listusers`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        
        dispatch({ type: 'FETCH_SUCCESS', payload: data.users });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo])

  return (
    <div>
      {loading ? (
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.createdAt.substring(0, 10)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    'Yes'
                  ) : (
                    'No'
                  )}
                </td>
                <td>
                  <Button
                    type="button"
                    variant='light'
                    onClick={() => {
                      navigate(`/user/${user._id}`)
                    }}
                  >
                    Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UsersList