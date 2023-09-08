import React, { useContext, useEffect } from 'react';

import { Badge, Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'; 

import { LinkContainer } from 'react-router-bootstrap';

import { Link } from 'react-router-dom';

import { Store } from '../../context/Store';
import SearchBox from '../SearchBox';

interface HeaderProps {
  setSidebar: (value: any) => any;
}

const Header = ({ setSidebar }: HeaderProps) => {
  const { state, dispatch: ctxDispatch } = useContext<any>(Store);
  const { cart, userInfo } = state;
  
  const handleSignOut = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('payamentMethod');
    window.location.href="/signin";
  }
  return (
    <Navbar bg='dark' variant='dark' expand="lg">
      <Container>
        <Button
          variant="dark"
          onClick={() => setSidebar((value: any) => !value)}
        >
          <i className="fas fa-bars"></i>
        </Button>
        <LinkContainer to="/">
          <Navbar.Brand>
            {/* <h4>
              Amazona
            </h4> */}
            <img src="/assets/logo.png" style={{ margin: '0 20px'}} alt='logo' width={70} height={70} />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          <Nav className='me-auto w-100 justify-content-end' style={{ alignItems: 'center' }}>
            <Link to="/cart">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a:any, c:any) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    Perfil do usuário
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>
                    Histórico de compras
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link 
                  className="d-flex justify-content-center dropdown-items" 
                  to="#signout" 
                  onClick={handleSignOut}
                >
                  SignOut
                </Link>
              </NavDropdown>
            ) : (
              <Link 
              className="nav-link" 
              to="/signin"
              >
                Login
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="admin-nav-dropdown">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Produtos</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Pedidos</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Usuários</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/adsense">
                  <NavDropdown.Item>Anúncios</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/news">
                  <NavDropdown.Item>Noticias</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header