import React, 
{ 
  SyntheticEvent, 
  useContext, 
  useEffect, 
  useState 
} from 'react'

import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { 
  Container as ContainerScreen
} from '../../styles/SignIn';

import { Store } from '../../context/Store';

import toast, { Toaster } from 'react-hot-toast';
import { getError } from '../../util/utils';

const SignUp:React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e: SyntheticEvent) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer secret'
    }

    e.preventDefault();

    if(password !== confirmPassword) {
      toast.error("As senhas nao se conhecidem");
      return;
    }

    try {
      const { data }: any = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/signup`, 
        {
          name,
          email,
          password
        },
        { headers: headers }
      );

      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success("Sucesso ao criar a conta");
      
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    if(userInfo) {
      navigate(redirect);
    }
  },[navigate, redirect, userInfo]);

  return (
    <ContainerScreen>
      <Helmet>
        <title>Registrar</title>
      </Helmet>
      <Toaster />
      <h1 className='my-3'>
        Registrar
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId='name'>
          <Form.Label>Nome</Form.Label>
          <Form.Control 
            type="name" 
            required 
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            required 
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId='password'>
          <Form.Label>Senha</Form.Label>
          <Form.Control 
            type="password" 
            required
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId='confirmPassword'>
          <Form.Label>Confirmar Senha</Form.Label>
          <Form.Control 
            type="password" 
            required
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </Form.Group>
        <div className='mb-3'>
          <Button type='submit'>Registrar</Button>
        </div>
        <div className='mb-3'>
          Você já tem uma conta{' '}
          <Link to={`/signin?redirect${redirect}`}>
            Logue aqui
          </Link>
        </div>
      </Form>
    </ContainerScreen>
  )
}

export default SignUp;