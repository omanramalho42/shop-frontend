import React, { FC } from 'react';

import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { Container } from './styled';

interface SidebarProps {
  categories: any[];
  show: boolean;
  setShow: (value: any) => any; 
}

const Sidebar: FC<SidebarProps> = ({ categories, show, setShow }) => {
  return (
    <Container
      className={
        show 
        ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column' 
        : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
      }
    >
      <Nav className="flex-column text-white w-100 p-2">
        <Nav.Item>
          <strong>Categorias</strong>
          {categories?.map((category: string) => (
            <Nav.Item key={category}>
              <LinkContainer
                to={{ pathname: '/search', search: `category=${category}` }}
                onClick={() => setShow(
                  (value: any) => !value
                )}
              >
                <Nav.Link className="text-white">
                  { category }
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}
        </Nav.Item>
      </Nav>
    </Container>
  )
}

export default Sidebar